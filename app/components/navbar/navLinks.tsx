import { TrendingUp, Clapperboard } from 'lucide-react';
import NavItem from './navItem';

const moviesMenu = [
  { title: 'Trending', href: '/trending', icon: <TrendingUp /> },
  { title: 'Most Added', href: '/most-liked', icon: <Clapperboard /> },
];

const NavLinks = () => (
  <div className=" mt-2 flex items-end gap-4 leading-none">
    <NavItem href="/">Home</NavItem>
    {moviesMenu.map((item) => (
      <NavItem key={item.title} href={item.href} icon={item.icon}>
        {item.title}
      </NavItem>
    ))}
  </div>
);

export default NavLinks;
