import { useState, useLayoutEffect, useEffect } from 'react';
import { Image, Anotation, getImages, getAnnotations } from '~/api';
import CrossIcon from '~/assets/icons/cross.svg';
import MouseIcon from '~/assets/icons/mouse.svg';
import { CenteredLayout, AnotationsHeader, ImageCanvas } from '~/components';
import { AnnotationsContext } from '~/contexts';

import './Anotations.scss';

export const Anotations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [_, setImages] = useState<Image[]>([]);
  const [activeImage, setActiveImage] = useState<Image | null>(null);
  const [activeAnnotations, setActiveAnnotations] = useState<Anotation[]>([]);

  useLayoutEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (activeImage) {
      getAnnotations(activeImage.id).then(setActiveAnnotations);
    }
  }, [activeImage]);

  const loadData = async () => {
    const loadedImages = await getImages();
    setImages(loadedImages);

    if (loadedImages.length) {
      setActiveImage(loadedImages[0]);
    }

    setIsLoading(false);
  };

  return (
    <CenteredLayout>
      <div className="anotations">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="anotations__content">
            <AnotationsHeader image={activeImage as Image} />
            <AnnotationsContext.Provider
              value={{ annotations: activeAnnotations, setAnnotations: setActiveAnnotations }}
            >
              <ImageCanvas image={activeImage as Image} />
            </AnnotationsContext.Provider>
            <div className="anotations__footer">
              To leave a comment, mouseover
              <span className="anotations__footer-icon">
                <img src={CrossIcon} alt="cross" />
              </span>
              on an image and double click the left mouse button
              <span className="anotations__footer-icon">
                <img src={MouseIcon} alt="mouse" />
              </span>
            </div>
          </div>
        )}
      </div>
    </CenteredLayout>
  );
};
