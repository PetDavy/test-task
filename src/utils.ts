import { useRef } from 'react';

export const useRenderHighlight = (className: string) => {
  const ref = useRef<HTMLLIElement>(null);

  if (ref.current) {
    ref.current.classList.add(className);
    setTimeout(() => {
      if (ref.current) {
        ref.current.classList.remove(className);
      }
    }, 200);
  }

  return ref;
};

export const range = <Type>(n: number, fn: (n: number) => Type) => {
  const result: Type[] = [];
  for (let i = 0; i < n; i++) {
    result.push(fn(i + 1));
  }
  return result;
};

export const chooseRandomly = <Type>(items: Type[]): Type => {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};

export const addDays = (date: Date, amount: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
};

export const formatDate = (date: Date): string => date.toISOString().split('T')[0];
