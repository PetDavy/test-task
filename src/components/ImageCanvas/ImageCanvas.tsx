import { Image } from '~/api';
import { ImageComponent } from './ImageComponent';
import './ImageCanvas.scss';

interface ImageCanvasProps {
  image: Image;
}

export const ImageCanvas = ({ image }: ImageCanvasProps) => {
  return (
    <div className="image-canvas">
      <ImageComponent image={image} />
    </div>
  );
};
