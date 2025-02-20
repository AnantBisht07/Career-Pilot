import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className=" text-white from-white to-purple-50 relative top-10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                CareerPilot
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Empowering careers, connecting talents with opportunities. Your journey to success starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 ">
            <h4 className="text-orange-600 font-semibold">Explore</h4>
            <ul className="space-y-2 text-white">
              {['Find Jobs', 'Post a Job', 'Browse Categories', 'Career Advice'].map((item) => (
                <li key={item} className="group flex items-center space-x-1">
                  <ArrowRight className="w-3 h-3 text-white group-hover:text-orange-600 transition-colors" />
                  <a className="text-sm text-white group-hover:text-orange-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-orange-600">Get in Touch</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 group">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                  <MapPin className="w-3 h-3 text-green-800" />
                </div>
                <span className="text-sm text-white">123 Job Street, Career City</span>
              </li>
              <li className="flex items-center space-x-2 group">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                  <Phone className="w-3 h-3 text-green-800" />
                </div>
                <span className="text-sm text-white">+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-2 group">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                  <Mail className="w-3 h-3 text-green-800" />
                </div>
                <span className="text-sm text-white">contact@careerpilot.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-orange-600">Stay Updated</h4>
            <p className="text-sm text-white">Get the latest opportunities delivered to your inbox</p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
              <button className="w-full px-3 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg transform hover:-translate-y-0.5 transition-all duration-200 shadow hover:shadow-lg">
                Subscribe Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-6 pt-4 border-t border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex space-x-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors "
                >
                  <Icon className="w-4 h-4 text-orange-600 group-hover:text-orange-700" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} CareerPilot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;