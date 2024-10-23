import Image from "next/image";
import logo from '../../../assets/images/logo.png';
import NavLinks from "./navLinks";
// import MobileMenu from "./mobileMenu";
import AuthButtons from "./authButtons";

const NavigationBar = () => {
  return (
    <section className="py-8">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-16">
            <div className="flex items-center gap-2">
              <Image src={logo} height={54} alt="movierec" />
            </div>
            <NavLinks />
          </div>
          <AuthButtons />
        </nav>
        {/* <MobileMenu /> */}
      </div>
    </section>
  );
};

export default NavigationBar;
