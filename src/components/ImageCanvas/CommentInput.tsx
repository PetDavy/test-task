import clsx from 'clsx';
import { useState, useContext, FormEvent } from 'react';
import { creatAnnotation } from '~/api';
import SendIcon from '~/assets/icons/send.svg';
import { AnnotationsContext, UserContext } from '~/contexts';
import { CommentPosition } from './types';

interface CommentInputProps {
  commentPosition: CommentPosition | null;
  imageId: number;
  left: number;
  top: number;
  isLeft: boolean;
  isRight: boolean;
  isBottom: boolean;
  setCommentPosition: (commentPosition: CommentPosition | null) => void;
}

export const CommentInput = ({
  commentPosition,
  imageId,
  left,
  top,
  isLeft,
  isRight,
  isBottom,
  setCommentPosition,
}: CommentInputProps) => {
  const [commentValue, setCommentValue] = useState<string>('');
  const { annotations, setAnnotations } = useContext(AnnotationsContext);
  const userId = useContext(UserContext);

  const handleCreateAnnotation = async (event: FormEvent) => {
    event.preventDefault();

    if (!commentPosition || !commentValue || !userId) {
      return;
    }

    try {
      const newAnnotarionResponse = await creatAnnotation({
        authorId: userId,
        comment: commentValue,
        imageId: imageId,
        pos: commentPosition,
      });

      setAnnotations([...annotations, newAnnotarionResponse]);
      setCommentValue('');
      setCommentPosition(null);
    } catch (error) {
      alert('Could not create annotation');
    }
  };

  return (
    <>
      <div className="comment-input" style={{ top, left }}>
        {annotations.length + 1}
        <form
          className={clsx('comment-input__input-container', {
            'comment-input__input-container--left': isLeft,
            'comment-input__input-container--right': isRight,
            'comment-input__input-container--bottom': isBottom,
          })}
          onSubmit={handleCreateAnnotation}
        >
          <input
            className="comment-input__input"
            placeholder="Leave a comment"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <button type="submit" className="comment-input__send-icon">
            <img src={SendIcon} alt="send" />
          </button>
        </form>
      </div>
      <div className="comment-input__overlay" onClick={() => setCommentPosition(null)} />
    </>
  );
};
