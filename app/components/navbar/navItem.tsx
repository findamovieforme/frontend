// components/navigation/NavItem.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}

const NavItem = ({ href, children, icon }: NavItemProps) => (
  <a
    href={href}
    className={cn(
      'flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
    )}
  >
    {icon && <span className="size-5 shrink-0">{icon}</span>}
    <span className="text-sm font-semibold">{children}</span>
  </a>
);

export default NavItem;
