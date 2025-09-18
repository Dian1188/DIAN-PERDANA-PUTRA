
import React from 'react';
import type { RpmFormData } from '../types';
import { KELAS_OPTIONS, MATERI_PELAJARAN_OPTIONS, DIMENSI_LULUSAN_OPTIONS } from '../constants';

interface RpmFormProps {
  formData: RpmFormData;
  onFormChange: (field: keyof RpmFormData, value: any) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{ label: string; id: keyof RpmFormData; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string, type?: string, required?: boolean }> = ({ label, id, value, onChange, placeholder, type = 'text', required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

const SelectField: React.FC<{ label: string; id: keyof RpmFormData; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }> = ({ label, id, value, onChange, options }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
      >
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
);


const RpmForm: React.FC<RpmFormProps> = ({ formData, onFormChange, onSubmit, isLoading }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormChange(name as keyof RpmFormData, value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentDimensi = formData.dimensiLulusan;
    if (checked) {
      onFormChange('dimensiLulusan', [...currentDimensi, value]);
    } else {
      onFormChange('dimensiLulusan', currentDimensi.filter(d => d !== value));
    }
  };

  const handlePraktikChange = (index: number, value: string) => {
    const newPraktik = [...formData.praktikPedagogis];
    newPraktik[index] = value;
    onFormChange('praktikPedagogis', newPraktik);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-slate-800 border-b pb-3">Data Pokok</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Nama Satuan Pendidikan" id="namaSatuanPendidikan" value={formData.namaSatuanPendidikan} onChange={handleInputChange} placeholder="Contoh: SMAN 1 Jakarta" required />
        <InputField label="Nama Guru" id="namaGuru" value={formData.namaGuru} onChange={handleInputChange} placeholder="Contoh: Dian Perdana Putra" required />
        <InputField label="NIP Guru" id="nipGuru" value={formData.nipGuru} onChange={handleInputChange} placeholder="Diisi jika ada" />
        <InputField label="Nama Kepala Sekolah" id="namaKepalaSekolah" value={formData.namaKepalaSekolah} onChange={handleInputChange} placeholder="Contoh: Dr. Budi Santoso, M.Pd." required />
        <InputField label="NIP Kepala Sekolah" id="nipKepalaSekolah" value={formData.nipKepalaSekolah} onChange={handleInputChange} placeholder="Diisi jika ada" />
      </div>

      <h2 className="text-xl font-bold text-slate-800 border-b pb-3 pt-4">Detail Pembelajaran</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Jenjang Pendidikan" id="jenjang" value={formData.jenjang} onChange={handleInputChange} options={['SMA']} />
        <SelectField label="Kelas" id="kelas" value={formData.kelas} onChange={handleInputChange} options={KELAS_OPTIONS} />
        <InputField label="Mata Pelajaran" id="mapel" value={formData.mapel} onChange={handleInputChange} placeholder="Contoh: Geografi" required />
        <div className="md:col-span-2">
            <label htmlFor="capaianPembelajaran" className="block text-sm font-medium text-slate-700 mb-1">Capaian Pembelajaran (CP)</label>
            <textarea id="capaianPembelajaran" name="capaianPembelajaran" value={formData.capaianPembelajaran} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Masukkan Capaian Pembelajaran dari kurikulum..." required></textarea>
        </div>
         <div className="md:col-span-2">
            <SelectField label="Materi Pelajaran" id="materi" value={formData.materi} onChange={handleInputChange} options={MATERI_PELAJARAN_OPTIONS} />
        </div>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label htmlFor="jumlahPertemuan" className="block text-sm font-medium text-slate-700 mb-1">Jumlah Pertemuan</label>
            <input type="number" id="jumlahPertemuan" name="jumlahPertemuan" value={formData.jumlahPertemuan} onChange={(e) => onFormChange('jumlahPertemuan', parseInt(e.target.value, 10))} min="1" max="10" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <InputField label="Durasi Setiap Pertemuan" id="durasi" value={formData.durasi} onChange={handleInputChange} placeholder="Contoh: 2 x 45 menit" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Praktik Pedagogis per Pertemuan</label>
        <div className="space-y-2">
          {Array.from({ length: formData.jumlahPertemuan }).map((_, index) => (
            <div key={index} className="flex items-center">
              <span className="text-sm font-medium text-slate-600 mr-3 w-28">Pertemuan {index + 1}:</span>
              <input 
                type="text" 
                value={formData.praktikPedagogis[index] || ''}
                onChange={(e) => handlePraktikChange(index, e.target.value)}
                placeholder="Contoh: PjBL, Inkuiri, Diskusi"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Dimensi Lulusan (Profil Pelajar Pancasila)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {DIMENSI_LULUSAN_OPTIONS.map(dimensi => (
            <div key={dimensi.id} className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={dimensi.id}
                  name="dimensiLulusan"
                  type="checkbox"
                  value={dimensi.label}
                  checked={formData.dimensiLulusan.includes(dimensi.label)}
                  onChange={handleCheckboxChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={dimensi.id} className="font-medium text-slate-700">{dimensi.label}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-5">
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sedang Memproses...
            </>
          ) : 'Buat Rencana Pembelajaran (RPM)'}
        </button>
      </div>
    </form>
  );
};

export default RpmForm;
