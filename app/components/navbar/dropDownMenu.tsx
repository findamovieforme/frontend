// components/navigation/DropdownMenu.tsx
import { ReactNode } from 'react';
import NavItem from './navItem';

interface DropdownMenuProps {
  title: string;
  items: { title: string; href: string; icon: ReactNode }[];
}

const DropdownMenu = ({ title, items }: DropdownMenuProps) => (
  <div>
    <h3 className="text-sm font-bold mb-2">{title}</h3>
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
);

export default DropdownMenu;
