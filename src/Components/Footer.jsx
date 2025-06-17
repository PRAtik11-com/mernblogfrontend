import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 text-white shadow-inner pt-5">
      <div className="max-w-7xl mx-auto  py-5 grid grid-cols-1 md:grid-cols-3 gap-50 text-sm">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-2">About Us</h3>
          <p className="text-white">
            We are a team of passionate developers building modern web
            applications. Follow us on social media to stay updated.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="/about"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-bold mb-2">Contact</h3>
          <p>Email: support@example.com</p>
          <p>Phone: +91 12345 67890</p>

          <div className="flex space-x-4 mt-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 text-center py-4 text-gray-800 text-sm border-t-2">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
