import clsx from 'clsx';
import { useContext } from 'react';
import { Annotation, deletAnnotation } from '~/api';
import BucketIcon from '~/assets/icons/bucket.svg';
import { UserContext, AnnotationsContext } from '~/contexts';

interface AnnotationItemProps {
  annotation: Annotation;
  label: number;
  top: number;
  left: number;
  isLeft: boolean;
  isRight: boolean;
  isBottom: boolean;
}

const getAvatarName = (name: string) => {
  const [firstName, lastName] = name.split(' ');
  const firstLetter = firstName.charAt(0);
  const secondLetter = lastName.charAt(0);

  return `${firstLetter.toLocaleUpperCase()}${secondLetter.toLocaleUpperCase()}`;
};

export const AnnotationItem = ({
  annotation,
  label,
  top,
  left,
  isLeft,
  isRight,
  isBottom,
}: AnnotationItemProps) => {
  const userId = useContext(UserContext);
  const { setAnnotations } = useContext(AnnotationsContext);

  const handleDelete = async () => {
    try {
      const res = await deletAnnotation(annotation.id);

      if (res) {
        setAnnotations((prev) => prev.filter((item) => item.id !== annotation.id));
      }
    } catch (error) {
      alert('Could not delete annotation');
    }
  };

  return (
    <div className="annotation-item" style={{ top, left }}>
      {label}
      <div
        className={clsx('annotation-item__info', {
          'annotation-item__info--left': isLeft,
          'annotation-item__info--right': isRight,
          'annotation-item__info--bottom': isBottom,
        })}
      >
        <div className="annotation-item__avatar">{getAvatarName(annotation.author)}</div>
        <div className="annotation-item__text">
          <div className="annotation-item__author">{annotation.author}</div>
          <div className="annotation-item__comment">{annotation.comment}</div>
        </div>
        {annotation.userId === userId && (
          <div className="annotation-item__delete" onClick={handleDelete}>
            <img src={BucketIcon} alt="bucket" />
          </div>
        )}
      </div>
    </div>
  );
};
