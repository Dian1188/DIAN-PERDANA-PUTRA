
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="container mx-auto py-4 px-4 md:px-8">
        <p className="text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} RPM Generator oleh Dian Perdana Putra. Diberdayakan oleh Teknologi AI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
