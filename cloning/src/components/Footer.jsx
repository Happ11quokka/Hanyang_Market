import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* 브랜드 정보 */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Hanyang Market</h2>
          <p className="text-sm">© 2024 HYUMRKT. All rights reserved.</p>
        </div>

        {/* 네비게이션 링크 */}
        <div className="flex flex-col md:flex-row gap-x-6 text-sm text-center">
          <a
            href="https://www.example.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="https://www.example.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.example.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>

        {/* 소셜 미디어 링크 */}
        <div className="flex gap-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-orange-400 transition-colors duration-200"
          >
            <i className="fab fa-facebook-f"></i> {/* FontAwesome 사용 시 */}
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-orange-400 transition-colors duration-200"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-orange-400 transition-colors duration-200"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;