import './AnnotationsHeader.scss';
import { Image } from '~/api';

interface AnnotationsHeaderProps {
  image: Image;
}

export const AnnotationsHeader = ({ image }: AnnotationsHeaderProps) => {
  return (
    <div className="annotations-header">
      <h1 className="annotations-header__image-name">{image.name}</h1>
      <button className="annotations-header__btn" type="button">
        Upload image
      </button>
    </div>
  );
};
