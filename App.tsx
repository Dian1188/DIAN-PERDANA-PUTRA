
import React, { useState, useCallback } from 'react';
import { RpmFormData } from './types';
import { generateRpm } from './services/geminiService';
import Header from './components/Header';
import RpmForm from './components/RpmForm';
import RpmOutput from './components/RpmOutput';
import Footer from './components/Footer';

function App() {
  const [formData, setFormData] = useState<RpmFormData>({
    namaSatuanPendidikan: '',
    namaGuru: '',
    nipGuru: '',
    namaKepalaSekolah: '',
    nipKepalaSekolah: '',
    jenjang: 'SMA',
    kelas: 'X',
    mapel: 'Geografi',
    capaianPembelajaran: '',
    materi: 'Konsep Dasar Ilmu Geografi',
    jumlahPertemuan: 2,
    durasi: '2 x 45 menit',
    praktikPedagogis: ['Inkuiri', 'Diskusi'],
    dimensiLulusan: ['Penalaran Kritis', 'Kreativitas'],
  });

  const [generatedRpm, setGeneratedRpm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = useCallback((field: keyof RpmFormData, value: any) => {
    setFormData(prev => {
        const newState = { ...prev, [field]: value };
        if (field === 'jumlahPertemuan') {
            const newCount = Number(value) || 0;
            const currentPraktik = newState.praktikPedagogis;
            const newPraktik = Array.from({ length: newCount }, (_, i) => currentPraktik[i] || `Praktik Pertemuan ${i + 1}`);
            newState.praktikPedagogis = newPraktik;
        }
        return newState;
    });
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedRpm('');
    try {
      const result = await generateRpm(formData);
      setGeneratedRpm(result);
    } catch (err) {
      setError(err instanceof Error ? `Terjadi kesalahan: ${err.message}` : 'Terjadi kesalahan tidak diketahui.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <RpmForm 
            formData={formData} 
            onFormChange={handleFormChange} 
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          <RpmOutput 
            rpmContent={generatedRpm}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
