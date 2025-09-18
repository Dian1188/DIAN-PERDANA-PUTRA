
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            RPM Generator
            </h1>
            <p className="text-sm text-slate-500 mt-1">
            Dibuat oleh (Dian Perdana Putra)
            </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
