import { createContext, Dispatch, SetStateAction } from 'react';
import { Anotation } from '~/api';

export interface AnnotationContextType {
  annotations: Anotation[];
  setAnnotations: Dispatch<SetStateAction<Anotation[]>>;
}

export const AnnotationsContext = createContext<AnnotationContextType>({} as AnnotationContextType);
export const UserContext = createContext<number | null>(null);
