import { useState, useLayoutEffect, useEffect } from 'react';
import { Image, Anotation, getImages, getAnnotations } from '~/api';
import { CenteredLayout, AnotationsHeader, ImageCanvas } from '~/components';

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
            <ImageCanvas image={activeImage as Image} annotations={activeAnnotations} />
          </div>
        )}
      </div>
    </CenteredLayout>
  );
};
