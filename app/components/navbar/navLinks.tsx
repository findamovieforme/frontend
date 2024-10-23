import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { TrendingUp, Clapperboard, Sunset } from 'lucide-react';
import NavItem from './navItem';
import DropdownMenu from './dropDownMenu';

const moviesMenu = [
  { title: 'Trending', href: '#', icon: <TrendingUp /> },
  { title: 'Most Added', href: '#', icon: <Clapperboard /> },
  { title: 'New Movies', href: '#', icon: <Sunset /> },
];

const showsMenu = [
  { title: 'Trending', href: '#', icon: <TrendingUp /> },
  { title: 'Most Added', href: '#', icon: <Clapperboard /> },
  { title: 'New Shows', href: '#', icon: <Sunset /> },
];

const NavLinks = () => (
  <div className="flex items-center gap-4">
    <NavItem href="#">Home</NavItem>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
          <NavigationMenuContent>
            <DropdownMenu title="Movies" items={moviesMenu} />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shows</NavigationMenuTrigger>
          <NavigationMenuContent>
            <DropdownMenu title="Shows" items={showsMenu} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);

export default NavLinks;
