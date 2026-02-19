import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold text-blue-600">Tasky</span>
            <p className="mt-4 text-gray-500 text-sm">
              Simplifying project management for teams who want to build faster.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Deadlines
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tasky Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
