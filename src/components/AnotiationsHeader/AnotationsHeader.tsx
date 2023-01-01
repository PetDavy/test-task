import './AnotationsHeader.scss';
import { Image } from '~/api';

interface AnotationsHeaderProps {
  image: Image;
}

export const AnotationsHeader = ({ image }: AnotationsHeaderProps) => {
  return (
    <div className="anotations-header">
      <h1 className="anotations-header__image-name">{image.name}</h1>
      <button className="anotations-header__btn" type="button">
        Upload image
      </button>
    </div>
  );
};
