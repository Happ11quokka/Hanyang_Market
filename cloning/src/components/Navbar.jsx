import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const NavBar = () => {
  const [user, setUser] = useState(null); // 로그인된 사용자 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 모바일 메뉴 상태
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("Logged out successfully.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const navLinkStyles = ({ isActive }) =>
    `text-white hover:bg-blue-300 hover:text-blue-900 px-3 py-2 rounded-lg transition duration-300 ${
      isActive ? "bg-blue-400 text-blue-900 font-semibold" : ""
    }`;

  return (
    <header className="bg-blue-500 shadow-md">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* 로고 섹션 */}
          <Link
            to="/"
            className="text-white font-extrabold text-xl tracking-wide hover:text-blue-200 transition duration-300"
          >
            Hanyang Market
          </Link>

          {/* 데스크탑 네비게이션 */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/products" className={navLinkStyles}>
              Marketplace
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              About Me
            </NavLink>
            <NavLink to="/cart" className={navLinkStyles}>
              Cart
            </NavLink>
            {user ? (
              <>
                <div
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-blue-700"
                  title={user.email}
                >
                  {user.email[0].toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={navLinkStyles}>
                Login
              </NavLink>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden text-white hover:text-blue-300 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* 모바일 네비게이션 */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-start space-y-4 mt-4">
            <NavLink
              to="/products"
              className={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              About Me
            </NavLink>
            <NavLink
              to="/cart"
              className={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </NavLink>
            {user ? (
              <>
                <div
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-blue-700"
                  title={user.email}
                >
                  {user.email[0].toUpperCase()}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;