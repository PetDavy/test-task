import { useState, useEffect, useRef, WheelEvent, SyntheticEvent } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { Image } from '~/api';
import { AnnotationsList } from '~/components';
import { CommentInput } from './CommentInput';
import { ImageSize, CommentPosition } from './types';

interface ImageProps {
  image: Image;
}

const ZOOM_STEP = 15;
const FRAME_WIDTH = 1000;
const TOOLTIP_WIDTH = 365;
const TOOLTIP_HEIGHT = 200;

export const ImageComponent = ({ image }: ImageProps) => {
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(0);
  const [zoomX, setZoomX] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [commentPosition, setCommentPosition] = useState<CommentPosition | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const getInitialSize = (event: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = event.currentTarget;
    setImageSize({ width, height });
  };

  const calculateImageSize = () => {
    if (imageRef.current) {
      const { clientWidth: width, clientHeight: height } = imageRef.current;

      setImageSize({ width, height });
    }
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

  const handleClick = (event: { nativeEvent: { offsetX: number; offsetY: number } }) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const x = 1 / (imageSize.width / offsetX);
    const y = 1 / (imageSize.height / offsetY);

    setCommentPosition({
      x: parseFloat(x.toFixed(4)),
      y: parseFloat(y.toFixed(4)),
    });
  };

  useEffect(() => {
    window.addEventListener('resize', calculateImageSize);

    return () => {
      window.removeEventListener('resize', calculateImageSize);
    };
  }, []);

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

    calculateImageSize();
  }, [zoom, dragY, zoomX, dragX]);

  return (
    <div
      className="image__container"
      style={{ top: zoom, bottom: zoom, left: zoomX, right: zoomX }}
    >
      <Draggable
        bounds={{ top: zoom, bottom: -zoom, left: zoomX / 2, right: -zoomX / 2 }}
        onDrag={handleDrag}
        defaultClassNameDragging="image--dragging"
        position={{ x: dragX, y: dragY }}
      >
        <div className="image" onWheel={handleZoom} onDoubleClick={handleClick}>
          <img
            className="image__image"
            src={image.url}
            alt={image.name}
            onLoad={getInitialSize}
            ref={imageRef}
          />
          {commentPosition && (
            <CommentInput
              commentPosition={commentPosition}
              imageId={image.id}
              left={commentPosition.x * imageSize.width}
              top={commentPosition.y * imageSize.height}
              isLeft={
                commentPosition.x * imageSize.width - TOOLTIP_WIDTH / 2 <
                (imageSize.width - FRAME_WIDTH) / 2
              }
              isRight={
                imageSize.width - commentPosition.x * imageSize.width - TOOLTIP_WIDTH / 2 <
                (imageSize.width - FRAME_WIDTH) / 2
              }
              isBottom={
                imageSize.height - commentPosition.y * imageSize.height - TOOLTIP_HEIGHT / 2 < 0
              }
              setCommentPosition={setCommentPosition}
            />
          )}
          <AnnotationsList imageSize={imageSize} toOffsetX={(imageSize.width - FRAME_WIDTH) / 2} />
        </div>
      </Draggable>
    </div>
  );
};
