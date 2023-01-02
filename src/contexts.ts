import { createContext, Dispatch, SetStateAction } from 'react';
import { Annotation } from '~/api';

export interface AnnotationContextType {
  annotations: Annotation[];
  setAnnotations: Dispatch<SetStateAction<Annotation[]>>;
}

export const AnnotationsContext = createContext<AnnotationContextType>({} as AnnotationContextType);
export const UserContext = createContext<number | null>(null);
