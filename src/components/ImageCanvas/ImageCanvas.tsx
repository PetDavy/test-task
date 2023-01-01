import { Image, Anotation } from '~/api';
import { ImageComponent } from './ImageComponent';
import './ImageCanvas.scss';

interface ImageCanvasProps {
  image: Image;
  annotations: Anotation[];
}

export const ImageCanvas = ({ image, annotations }: ImageCanvasProps) => {
  return (
    <div className="image-canvas">
      <ImageComponent image={image} annotations={annotations} />
    </div>
  );
};
