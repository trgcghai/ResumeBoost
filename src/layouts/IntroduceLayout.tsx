import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const IntroduceLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const navItems = [
    { label: "Trang chủ", path: "/introduce/landing" },
    { label: "Về chúng tôi", path: "/introduce/about" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-md py-2`}
      >
        <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="ResumeBoost"
              className="w-10 h-10 rounded"
            />
            <span className={`text-xl font-bold text-main`}>ResumeBoost</span>
          </Link>

          <nav className="hidden md:flex justify-center items-center gap-6">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => {
                  const baseClasses =
                    "font-medium hover:text-main transition-colors  ";
                  return (
                    baseClasses + (isActive ? " text-main" : "text-textNormal")
                  );
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-end">
            <Button
              variant="outline"
              className="md:hidden text-2xl border-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="text-textNormal" />
              ) : (
                <Menu className="text-textNormal" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col gap-3">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="py-2 text-textNormal hover:text-main"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default IntroduceLayout;
