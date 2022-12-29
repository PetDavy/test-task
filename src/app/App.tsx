import { Outlet, ReactLocation, Route, Router } from '@tanstack/react-location';
import { Welcome } from '~/components';
import { OptionButtons, QnA, TodoList, Scroller, Ranges } from '~/pages';
import { Header } from './Header';

const reactLocation = new ReactLocation();

const routes: Route[] = [
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: 'option-buttons',
    element: <OptionButtons />,
  },
  {
    path: 'qna',
    element: <QnA />,
  },
  {
    path: 'todos',
    element: <TodoList />,
  },
  {
    path: 'scroller',
    element: <Scroller />,
  },
  {
    path: 'ranges',
    element: <Ranges />,
  },
];

export const App = () => (
  <Router location={reactLocation} routes={routes}>
    <Header />
    <Outlet />
  </Router>
);
