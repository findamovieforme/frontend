import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { TrendingUp, Clapperboard } from 'lucide-react';
import NavItem from './navItem';
import DropdownMenu from './dropDownMenu';

const moviesMenu = [
  { title: 'Trending', href: '/trending', icon: <TrendingUp /> },
  { title: 'Most Added', href: '/most-liked', icon: <Clapperboard /> },
];

const NavLinks = () => (
  <div className="flex items-center gap-4 leading-none">
    <NavItem href="/">Home</NavItem>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
          <NavigationMenuContent>
            <DropdownMenu title="Movies" items={moviesMenu} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);

export default NavLinks;
