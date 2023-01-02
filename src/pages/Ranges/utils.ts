import { addDays, chooseRandomly, formatDate, range } from '~/utils';

const baseDate = new Date('2022-01-01');

export enum Colors {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}

const colors: Colors[] = Object.values(Colors);

export const items: Item[] = range<Item>(40, (index) => ({
  date: formatDate(addDays(baseDate, index)),
  color: chooseRandomly(colors),
}));

export const dataSample: Range = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: Colors.RED,
};

export interface Item {
  date: string;
  color: Colors;
}

export interface Range {
  start: string;
  end: string;
  color: Colors;
}

type ColorClassType = {
  [key in Colors]: `bg-${Colors}-300 text-${Colors}-900`;
};

export const colorToClassName: ColorClassType = {
  [Colors.RED]: 'bg-red-300 text-red-900',
  [Colors.GREEN]: 'bg-green-300 text-green-900',
  [Colors.BLUE]: 'bg-blue-300 text-blue-900',
};
