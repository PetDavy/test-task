import { Link, LinkProps, useMatchRoute } from '@tanstack/react-location';
import clsx from 'clsx';

const NavItem = (props: LinkProps) => {
  const matchRoute = useMatchRoute();
  const active = Boolean(matchRoute({ to: props.to }));
  return (
    <li className="px-1 sm:px-2 md:px-4">
      <Link
        {...props}
        className={clsx(
          'relative flex items-center h-12 px-1',
          'text-slate-200 hover:text-white hover:drop-shadow shadow-white transition-all',
          'after:h-0.5 after:w-full after:bg-white after:absolute after:bottom-px after:left-0',
          'after:shadow after:shadow-white after:transition-all after:origin-center',
          'text-xs sm:text-base',
          active ? 'after:scale-100' : 'after:scale-0',
        )}
      />
    </li>
  );
};

export const Header = () => (
  <header className="sticky top-0 w-full">
    <nav className="bg-gray-600 shadow-lg">
      <ul className="flex items-center">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/option-buttons">Options</NavItem>
        <NavItem to="/qna">QNA</NavItem>
        <NavItem to="/todos">Todos</NavItem>
        <NavItem to="/scroller">Scroller</NavItem>
        <NavItem to="/ranges">Ranges</NavItem>
        <NavItem to="/anotations">Anotations</NavItem>
      </ul>
    </nav>
  </header>
);
