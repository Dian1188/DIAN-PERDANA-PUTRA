import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RpmFormData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function buildPrompt(formData: RpmFormData): string {
  const praktikPedagogisText = formData.praktikPedagogis.map((praktik, index) => `Pertemuan ${index + 1}: ${praktik}`).join('\n');

  return `
Anda adalah seorang ahli dalam desain kurikulum dan pedagogi di Indonesia, dengan spesialisasi dalam pembuatan Rencana Pembelajaran Mendalam (RPM). 
Tugas Anda adalah menghasilkan RPM yang lengkap, terstruktur, dan berkualitas tinggi dalam Bahasa Indonesia berdasarkan data yang diberikan.

Gunakan format Markdown untuk output. Pastikan setiap bagian terdefinisi dengan jelas.

Berikut adalah data untuk RPM yang akan dibuat:

**DATA INPUT:**
- **Nama Satuan Pendidikan:** ${formData.namaSatuanPendidikan}
- **Nama Guru:** ${formData.namaGuru}
- **NIP Guru:** ${formData.nipGuru}
- **Nama Kepala Sekolah:** ${formData.namaKepalaSekolah}
- **NIP Kepala Sekolah:** ${formData.nipKepalaSekolah}
- **Jenjang Pendidikan:** ${formData.jenjang}
- **Kelas:** ${formData.kelas}
- **Mata Pelajaran:** ${formData.mapel}
- **Capaian Pembelajaran (CP):** ${formData.capaianPembelajaran}
- **Materi Pelajaran:** ${formData.materi}
- **Jumlah Pertemuan:** ${formData.jumlahPertemuan}
- **Durasi Setiap Pertemuan:** ${formData.durasi}
- **Dimensi Lulusan yang Diharapkan (Profil Pelajar Pancasila):** ${formData.dimensiLulusan.join(', ')}
- **Rencana Praktik Pedagogis per Pertemuan:**
${praktikPedagogisText}

**STRUKTUR OUTPUT RPM (WAJIB DIIKUTI):**
Hasil harus berupa dokumen RPM yang lengkap dengan bagian-bagian berikut:

---

### **RENCANA PEMBELAJARAN MENDALAM (RPM)**

**A. INFORMASI UMUM**
- **Satuan Pendidikan:** [Isi dengan data]
- **Mata Pelajaran:** [Isi dengan data]
- **Kelas/Fase:** [Isi dengan data]
- **Materi Pokok:** [Isi dengan data]
- **Alokasi Waktu:** [Hitung total alokasi waktu dari jumlah dan durasi pertemuan]

**B. KOMPONEN INTI**
1.  **Capaian Pembelajaran (CP):**
    [Salin verbatim dari data input]

2.  **Tujuan Pembelajaran (TP):**
    [Rumuskan 2-3 tujuan pembelajaran yang spesifik, terukur, dapat dicapai, relevan, dan berbatas waktu (SMART) berdasarkan CP dan materi. Gunakan kata kerja operasional.]

3.  **Pemahaman Bermakna:**
    [Jelaskan relevansi materi ini dengan kehidupan nyata siswa. Contoh: "Dengan memahami konsep peta, siswa dapat menavigasi lingkungan sekitar dan memahami distribusi sumber daya."]

4.  **Pertanyaan Pemantik:**
    [Buat 2-3 pertanyaan yang memancing rasa ingin tahu dan pemikiran kritis siswa terkait materi. Contoh: "Mengapa kita membutuhkan peta di era digital?"]

5.  **Profil Pelajar Pancasila:**
    [Sebutkan dimensi yang dipilih dari data input dan jelaskan bagaimana setiap dimensi tersebut akan dikembangkan selama proses pembelajaran. Contoh: "Penalaran Kritis: Siswa menganalisis data geosfer untuk menarik kesimpulan."]

**C. KEGIATAN PEMBELAJARAN**
[Buat rincian langkah-langkah kegiatan untuk SETIAP pertemuan. Setiap pertemuan harus memiliki 3 tahap: Pendahuluan, Kegiatan Inti, dan Penutup. Integrasikan praktik pedagogis yang telah ditentukan untuk setiap pertemuan ke dalam Kegiatan Inti.]

**Pertemuan 1 (Praktik: ${formData.praktikPedagogis[0] || 'Sesuai Rencana'})**
- **Pendahuluan (15 Menit):**
  - Guru membuka pelajaran dengan salam dan doa.
  - Apersepsi: Mengaitkan materi sebelumnya dengan materi yang akan dipelajari.
  - Motivasi: Menyampaikan tujuan dan manfaat pembelajaran.
- **Kegiatan Inti (60 Menit):**
  - [Rincikan langkah-langkah pembelajaran sesuai model/praktik pedagogis yang dipilih. Misalnya, jika inkuiri, jelaskan tahap orientasi, merumuskan masalah, hipotesis, dst.]
- **Penutup (15 Menit):**
  - Siswa dan guru menyimpulkan materi.
  - Refleksi: Mengajukan pertanyaan tentang apa yang telah dipelajari.
  - Guru memberikan tugas atau informasi untuk pertemuan berikutnya.

**(Lanjutkan untuk Pertemuan 2, 3, dst. sesuai jumlah pertemuan yang diinput)**

**D. ASESMEN / PENILAIAN**
1.  **Asesmen Diagnostik:** [Jelaskan asesmen awal, misal: kuis singkat di awal untuk mengetahui pemahaman awal siswa.]
2.  **Asesmen Formatif:** [Jelaskan asesmen selama proses pembelajaran, misal: observasi keaktifan diskusi, penilaian presentasi, lembar kerja.]
3.  **Asesmen Sumatif:** [Jelaskan asesmen di akhir unit pembelajaran, misal: tes tulis, proyek akhir, atau portofolio.]

**E. PENGAYAAN DAN REMEDIAL**
- **Pengayaan:** [Aktivitas untuk siswa dengan pemahaman lebih cepat, misal: studi kasus lanjutan.]
- **Remedial:** [Aktivitas untuk siswa yang membutuhkan bimbingan, misal: tutor sebaya atau tugas terstruktur.]

**F. LAMPIRAN**
1.  **Lembar Kerja Peserta Didik (LKPD):** [Sebutkan judul atau deskripsi LKPD yang akan digunakan.]
2.  **Bahan Bacaan Guru & Peserta Didik:** [Sebutkan sumber belajar, misal: buku paket, artikel, video.]
3.  **Glosarium:** [Daftar istilah penting dan definisinya.]

---
**PENGESAHAN**

[Tempat], [Tanggal]

Mengetahui,
Kepala Sekolah,

**${formData.namaKepalaSekolah}**
**NIP. ${formData.nipKepalaSekolah}**

Guru Mata Pelajaran,

**${formData.namaGuru}**
**NIP. ${formData.nipGuru}**
---

Pastikan output yang dihasilkan profesional dan siap digunakan oleh guru.
`;
}

export const generateRpm = async (formData: RpmFormData): Promise<string> => {
  try {
    const prompt = buildPrompt(formData);
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating RPM:", error);
    throw new Error("Gagal berkomunikasi dengan AI. Pastikan koneksi dan API Key Anda benar.");
  }
};