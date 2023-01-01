import { useState, useEffect, useRef, WheelEvent, SyntheticEvent } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { Image, Anotation } from '~/api';

interface ImageSize {
  width: number;
  height: number;
}

interface ImageProps {
  image: Image;
  annotations: Anotation[];
}

const ZOOM_STEP = 15;
const FRAME_WIDTH = 1000;

export const ImageComponent = ({ image, annotations }: ImageProps) => {
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(0);
  const [zoomX, setZoomX] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const zoomAbs = Math.abs(zoom);
    const zoomXAbs = Math.abs(zoomX);

    if (zoomAbs < Math.abs(dragY)) {
      setDragY(dragY > 0 ? zoomAbs : -zoomAbs);
    }

    if (zoomXAbs === 0) {
      setDragX(0);
    } else if (zoomXAbs / 2 < Math.abs(dragX)) {
      setDragX(dragX > 0 ? zoomXAbs / 2 : -zoomXAbs / 2);
    }

    if (imageRef.current) {
      const { clientWidth: width, clientHeight: height } = imageRef.current;

      setImageSize({ width, height });
    }
  }, [zoom, dragY, zoomX, dragX]);

  const getInitialSize = (event: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = event.currentTarget;
    setImageSize({ width, height });
  };

  const handleZoom = (event: WheelEvent<HTMLDivElement>) => {
    const { deltaY } = event;
    setZoom((prevZoom) => {
      if (deltaY < 0) {
        return prevZoom - ZOOM_STEP;
      }

      return prevZoom + ZOOM_STEP > 0 ? 0 : prevZoom + ZOOM_STEP;
    });

    setZoomX((prevZoomX) => {
      if (deltaY < 0 && imageSize.width + ZOOM_STEP > FRAME_WIDTH) {
        return prevZoomX - ZOOM_STEP;
      }

      return prevZoomX + ZOOM_STEP > 0 ? 0 : prevZoomX + ZOOM_STEP;
    });
  };

  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    const { x, y } = data;
    setDragY(y);

    if (zoomX < 0) {
      setDragX(x);
    }
  };

  return (
    <div
      className="image__container"
      style={{ top: zoom, bottom: zoom, left: zoomX, right: zoomX }}
    >
      <Draggable
        bounds={{ top: zoom, bottom: -zoom, left: zoomX / 2, right: -zoomX / 2 }}
        axis="y"
        onDrag={handleDrag}
        defaultClassNameDragging="image--dragging"
        position={{ x: dragX, y: dragY }}
      >
        <div className="image" onWheel={handleZoom}>
          <img
            className="image__image"
            src={image.url}
            alt={image.name}
            onLoad={getInitialSize}
            ref={imageRef}
          />
          <div className="image__anotations">
            {JSON.stringify(imageSize)} zoom: {zoom}
          </div>
        </div>
      </Draggable>
    </div>
  );
};
