
import React from 'react';

interface RpmOutputProps {
  rpmContent: string;
  isLoading: boolean;
  error: string | null;
}

const RpmOutput: React.FC<RpmOutputProps> = ({ rpmContent, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="flex justify-center items-center">
          <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="mt-4 text-slate-600 font-medium">AI sedang menyusun RPM untuk Anda. Mohon tunggu sejenak...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-red-800">Terjadi Kesalahan</h3>
        <p className="mt-2 text-red-700">{error}</p>
      </div>
    );
  }

  if (!rpmContent) {
    return (
        <div className="mt-8 p-8 bg-white/50 border-2 border-dashed border-slate-300 rounded-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-800">Hasil RPM akan ditampilkan di sini</h3>
          <p className="mt-1 text-sm text-slate-500">Isi formulir di atas dan klik tombol untuk memulai.</p>
        </div>
    );
  }
  
  // A simple markdown to HTML-like renderer
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold text-slate-800 mt-6 mb-3 border-b-2 border-indigo-200 pb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('**')) {
          const parts = line.split('**');
          return <p key={index} className="my-1 text-slate-700"><span className="font-bold">{parts[1]}</span>{parts[2]}</p>
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-6 list-disc text-slate-600">{line.substring(2)}</li>;
        }
        if (line.trim() === '---') {
            return <hr key={index} className="my-6 border-slate-300" />
        }
        return <p key={index} className="my-1 text-slate-700">{line}</p>;
      });
  };

  return (
    <div className="mt-8 p-6 md:p-8 bg-white rounded-lg shadow-lg prose max-w-none">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Hasil Rencana Pembelajaran Mendalam (RPM)</h2>
      <div className="text-base leading-relaxed">
        {renderContent(rpmContent)}
      </div>
    </div>
  );
};

export default RpmOutput;
