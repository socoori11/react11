import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './NavBar.css';

export default function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // 아래로 스크롤하면 숨김
        setShowNav(false);
      } else {
        // 위로 스크롤하면 다시 보임
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${showNav ? 'show' : 'hide'}`}>
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/scrolltext">Scroll Text</Link>
      <Link to="/guestbook">Guestbook</Link>
    </nav>
  );
}
