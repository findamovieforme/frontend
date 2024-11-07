'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { TrendingUp, Clapperboard, Sunset } from 'lucide-react';
import Image from 'next/image';
import logo from '../../../assets/images/logo.png';
import Link from 'next/link';
import { useAuthStore } from '@/app/store';
import DropdownMenu from './dropDownMenu';
import NavItem from './navItem';

const moviesMenu = [
  { title: 'Trending', href: '#', icon: <TrendingUp /> },
  { title: 'Most Added', href: '#', icon: <Clapperboard /> },
  { title: 'New Movies', href: '#', icon: <Sunset /> },
];


const MobileMenu = () => {
  const { isAuthenticated, logout } = useAuthStore();
  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={logo} height={64} alt="movierec" />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center gap-2">
                  <Image src={logo} height={64} alt="movierec" />
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="my-8 flex flex-col gap-4">
              <NavItem href="#">Home</NavItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="movies">
                  <AccordionTrigger>Movies</AccordionTrigger>
                  <AccordionContent>
                    <DropdownMenu title="Movies" items={moviesMenu} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="border-t pt-4">
              <div className="mt-2 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <span className="font-semibold">{`Hello, ${name}`}</span>
                    <Button variant="outline" onClick={logout}>Log out</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline">Log in</Button>
                    </Link>
                    <Link href="/signup">
                      <Button>Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileMenu;
