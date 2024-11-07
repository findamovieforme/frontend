// components/navigation/DropdownMenu.tsx
import { ReactNode } from 'react';
import NavItem from './navItem';

interface DropdownMenuProps {
  title: string;
  items: { title: string; href: string; icon: ReactNode }[];
}

const DropdownMenu = ({ items }: DropdownMenuProps) => {
  return (
    <div>
      <ul className="w-48 p-3">
        {items.map((item, idx) => (
          <li key={idx}>
            <NavItem href={item.href} icon={item.icon}>
              {item.title}
            </NavItem>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default DropdownMenu;
