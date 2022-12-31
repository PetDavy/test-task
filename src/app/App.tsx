import { Outlet, ReactLocation, Route, Router } from '@tanstack/react-location';
import { Welcome, ProtectedRout } from '~/components';
import {
  OptionButtons,
  QnA,
  TodoList,
  Scroller,
  Ranges,
  Anotations,
  NotFound,
  Auth,
} from '~/pages';
import { AuthTypes } from '~/pages/Auth/types';
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
  {
    path: 'anotations',
    element: (
      <ProtectedRout>
        <Anotations />
      </ProtectedRout>
    ),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <Auth authType={AuthTypes.LOGIN} />,
      },
      {
        path: 'register',
        element: <Auth authType={AuthTypes.REGISTER} />,
      },
      {
        path: 'reset',
        element: <Auth authType={AuthTypes.RESET} />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const App = () => (
  <Router location={reactLocation} routes={routes}>
    <Header />
    <Outlet />
  </Router>
);
