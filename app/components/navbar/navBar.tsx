// NavigationBar.tsx
import Image from "next/image";
import logo from "../../../assets/images/logo.png";
import NavLinks from "./navLinks";
import MobileMenu from "./mobileMenu";
import AuthButtons from "./authButtons";
import Link from "next/link";
import SearchBar from "./SearchPopover"; // Import the new SearchBar component

const NavigationBar: React.FC = () => {
  return (
    <div className="container py-8">
      <nav className="hidden justify-between lg:flex">
        <div className="flex items-center gap-16">
          <Link href="/">
            <Image src={logo} height={54} alt="movierec" />
          </Link>
          <NavLinks />
        </div>

        {/* Use SearchBar Component Here */}
        <div className="relative flex items-center gap-4">
          <SearchBar />
          <AuthButtons />
        </div>
      </nav>
      <MobileMenu />
    </div>
  );
};

export default NavigationBar;
