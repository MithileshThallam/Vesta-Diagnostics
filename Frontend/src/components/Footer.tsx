import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-vesta-orange to-vesta-navy bg-clip-text text-transparent">
                Vesta Diagnostics
              </span>
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Advanced medical testing with accuracy and care in Anantapur, Andhra Pradesh.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-vesta-orange transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-vesta-orange transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-vesta-orange transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-vesta-orange transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-vesta-orange/30 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-vesta-orange transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-vesta-orange rounded-full mr-3"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/tests" className="text-gray-600 hover:text-vesta-orange transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-vesta-orange rounded-full mr-3"></span>
                  Tests
                </a>
              </li>
              <li>
                <a href="/franchise" className="text-gray-600 hover:text-vesta-orange transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-vesta-orange rounded-full mr-3"></span>
                  Franchise
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-vesta-orange transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-vesta-orange rounded-full mr-3"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-vesta-orange/30 pb-2 inline-block">
              Contact Us
            </h3>
            <address className="not-italic text-gray-600 space-y-4">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-vesta-orange mt-1 flex-shrink-0" />
                <p>Door no 12/3/162, 5th Cross Rd, Sai Nagar, Anantapur, Andhra Pradesh 515001</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="text-vesta-orange" />
                <a href="tel:08554310414" className="hover:text-vesta-orange transition-colors duration-300">
                  08554 310414
                </a>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-vesta-orange" />
                <a href="mailto:vestagloballabs@gmail.com" className="hover:text-vesta-orange transition-colors duration-300">
                  vestagloballabs@gmail.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Vesta Diagnostics. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-vesta-orange transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-vesta-orange transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;