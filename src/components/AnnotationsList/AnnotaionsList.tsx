import { useContext } from 'react';
import { AnnotationsContext, AnnotationContextType } from '~/contexts';
import { AnnotationItem } from './AnnotaionItem';
import './AnnotationsList.scss';

interface AnnotationsListProps {
  imageSize: { width: number; height: number };
  toOffsetX: number;
}

const TOOLTIP_WIDTH = 365;
const TOOLTIP_HEIGHT = 200;

export const AnnotationsList = ({ imageSize, toOffsetX }: AnnotationsListProps) => {
  const { annotations }: AnnotationContextType = useContext(AnnotationsContext);

  return (
    <div className="annotations-list">
      {annotations.map((annotation, index) => (
        <AnnotationItem
          key={annotation.id}
          annotation={annotation}
          label={index + 1}
          top={annotation.pos.y * imageSize.height}
          left={annotation.pos.x * imageSize.width}
          isLeft={annotation.pos.x * imageSize.width - TOOLTIP_WIDTH / 2 < toOffsetX}
          isRight={
            imageSize.width - annotation.pos.x * imageSize.width - TOOLTIP_WIDTH / 2 < toOffsetX
          }
          isBottom={imageSize.height - annotation.pos.y * imageSize.height - TOOLTIP_HEIGHT / 2 < 0}
        />
      ))}
    </div>
  );
};
