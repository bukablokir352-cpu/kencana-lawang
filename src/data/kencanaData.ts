import { Dimension, Photo, Village, EwsMessage, OfficialVerificationData, KencanaRegistrationProfile } from '../types/kencana';

export const KENCANA_REGISTRATION_PROFILE: KencanaRegistrationProfile = {
  kecamatan: "KECAMATAN LAWANG",
  nomorRegister: "KENCANA#35-35.07-35.07.25",
  tanggalGerakanKencana: "01/10/2026",
  tanggalKencanaPratama: "15/10/2026",
  email: "kesejahteraansosial352@gmail.com",
  noHp: "085704818780",
  namaPic: "EFFENDI, S.E.",
  alamatKantor: "Jl. MH. Thamrin No. 2 Lawang, Kabupaten Malang, Jawa Timur"
};

export const OFFICIAL_VERIFICATION: OfficialVerificationData = {
  nomorSurat: "000.1.2.3/BA.TIM 2.3/35.07.407/2026",
  nomorSuratPerintah: "000.1.2.3/1917/35.07.407/2026",
  hariVerifikasi: "RABU",
  tanggalVerifikasi: "28 Oktober 2026",
  tanggalSuratPerintah: "26 Oktober 2026",
  tempat: "Pendopo Kantor Kecamatan LAWANG, Kabupaten Malang",
  kecamatan: "LAWANG",
  jadwal: "28 Oktober 2026, 12:27 WIB – selesai",
  penanggungJawab: "Sigit Yuniarto, S.T., M.M.",
  anggotaTim: "Sadono Irawan, S.Sos., M.M.",
  camat: "NUR SOLEH HIDAYAT, S.STP, MM",
  camatPangkat: "Pembina",
  camatNip: "19810701 200012 1 001",
  scores: {
    tataKelola: 16.80,
    mitigasi: 15.29,
    kesiapsiagaan: 20.00,
    respons: 20.00,
    inovasi: 9.55,
    total: 81.64
  },
  catatanEkspor: "Angka di atas disalin dari ekspor sistem tanggal 28 Oktober 2026 pukul 15.37 Dengan Nilai 81.64",
  scanImages: [
    "/assets/aistudio/WhatsApp_Image_2026-11-10_at_11.16.51__1__2a957008.jpeg",
    "/assets/aistudio/WhatsApp_Image_2026-11-10_at_11.16.52_059804b9.jpeg"
  ]
};

export const INITIAL_DIMENSIONS: Dimension[] = [
  {
    id: 'dimensi-1',
    code: 'DIM-01',
    chapterNumber: 'BAB 01',
    category: 'simulasi',
    title: 'TATA KELOLA & KELEMBAGAAN KEBENCANAAN',
    subtitle: 'Struktur Satgas, SOP Terintegrasi, dan Alokasi Anggaran APBD/CSR.',
    weight: 20,
    score: 16.80,
    accentColor: 'text-blue-600',
    bgBadge: 'bg-blue-50 text-blue-700 border-blue-200',
    borderTopColor: 'border-blue-600',
    description: 'Landasan regulasi formal melalui SK Camat Lawang tentang Satuan Tugas Gerakan Kecamatan Tangguh Bencana (KENCANA) 2026, sinergi pentahelix bersama Forkopimcam (Koramil, Polsek, Puskesmas), serta penguatan kelembagaan 12 desa dan kelurahan.',
    legalBasis: 'SK Camat Lawang No. 188.45/14/35.07.24/2026 & Perda Kab. Malang No. 11/2019',
    indicators: [
      'Keputusan Camat Pembentukan Satgas Kencana & SK Forum PRB Kecamatan Lawang',
      'Ketersediaan 3 SOP Baku: Tanggap Darurat, Evakuasi Mandiri, dan Pengelolaan Logistik Bencana',
      'Integrasi Rencana Kontinjensi Bencana Hidrometeorologi ke dalam RKPDes 12 Desa/Kelurahan',
      'Kemitraan CSR Sektor Swasta & Perusahaan Industri di sepanjang koridor Lawang'
    ],
    achievements: [
      'Skor Verifikasi Resmi BPBD: 16.80 (dari bobot 20%)',
      '100% dari 12 Desa/Kelurahan telah memiliki SK Forum Relawan Kebencanaan Terpadu',
      'Rakor Berkala Forkopimcam Lawang setiap bulan mengevaluasi kesiapsiagaan bencana hidrometeorologi',
      'Tersedianya alokasi anggaran belanja tak terduga (BTT) tanggap darurat di tingkat kecamatan'
    ]
  },
  {
    id: 'dimensi-2',
    code: 'DIM-02',
    chapterNumber: 'BAB 02',
    category: 'mitigasi',
    title: 'PENCEGAHAN & MITIGASI RISIKO BENCANA',
    subtitle: 'Pemetaan KRB, Percepatan Destana, dan Mitigasi Fisik Drainase & Lereng.',
    weight: 20,
    score: 15.29,
    accentColor: 'text-emerald-600',
    bgBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderTopColor: 'border-emerald-600',
    description: 'Penyusunan Kajian Risiko Bencana (KRB) tingkat kecamatan berbasis GIS partisipatif, penanaman vegetasi pengikat tanah (akar wangi / vetiver) di tebing lereng Arjuno Desa Srigading & Ketindan, serta normalisasi rutin alur Kali Lawang.',
    legalBasis: 'Kajian Risiko Bencana (KRB) Kabupaten Malang 2022-2026',
    indicators: [
      'Peta Spasial Kawasan Rawan Bencana (KRB) Longsor dan Banjir Luapan Kali Lawang',
      'Cakupan Pembentukan Desa Tangguh Bencana (Destana) di 10 Desa dan 2 Kelurahan',
      'Kegiatan Kerja Bakti Rutin Normalisasi Drainase Pemukiman & Saluran Irigasi',
      'Konservasi Lereng Kritis Kaki Gunung Arjuno melalui Penghijauan dan Sengkedan Alami'
    ],
    achievements: [
      'Skor Verifikasi Resmi BPBD: 15.29 (dari bobot 20%)',
      'Penanaman 4.500 bibit pohon keras & rumput vetiver di tebing rawan longsor Srigading & Ketindan',
      'Pembersihan sedimen 3,2 km aliran sungai Kali Lawang melintasi Kelurahan Lawang & Sidodadi',
      'Pemasangan bronjong kawat penahan tebing di 8 titik kritis pinggir sungai'
    ]
  },
  {
    id: 'dimensi-3',
    code: 'DIM-03',
    chapterNumber: 'BAB 03',
    category: 'posko',
    title: 'KESIAPSIAGAAN & SISTEM PERINGATAN DINI (EWS)',
    subtitle: 'EWS Digital WhatsApp API Real-Time, Rambu Jalur Evakuasi, & Gladi Lapang.',
    weight: 25,
    score: 20.00,
    accentColor: 'text-orange-600',
    bgBadge: 'bg-orange-50 text-orange-700 border-orange-200',
    borderTopColor: 'border-orange-600',
    description: 'Prioritas tertinggi Kencana Lawang dengan pembangunan integrasi EWS sirine manual dan digital WhatsApp Gateway terhubung sensor curah hujan otomatis, pemasangan 32 plang rambu evakuasi, dan gladi simulasi mandiri warga tahunan.',
    legalBasis: 'Standar Teknis Peringatan Dini Bencana BNPB No. 05/2021',
    indicators: [
      'Integrasi sensor pemantau curah hujan otomatis hulu Arjuno ke WhatsApp Blast warga',
      'Pemasangan 32 titik rambu jalur evakuasi dan plang penunjuk Titik Kumpul Aman (Assembly Point)',
      'Pelaksanaan Gladi Evakuasi Mandiri serentak di kawasan rawan bencana lereng tebing',
      'Kesiapan personil relawan terlatih TRC (Tim Reaksi Cepat) Kencana Lawang'
    ],
    achievements: [
      'Skor Verifikasi Resmi BPBD: 20.00 (Maksimal 20.00 poin)',
      'Sistem peringatan dini otomatis menjangkau >1.400 nomor kontak pengurus RT/RW & relawan desa',
      'Tersedianya 14 titik kumpul utama yang aman dari jangkauan material longsor dan genangan',
      'Simulasi evakuasi tahunan telah melibatkan lebih dari 650 warga lereng rawan bencana'
    ]
  },
  {
    id: 'dimensi-4',
    code: 'DIM-04',
    chapterNumber: 'BAB 04',
    category: 'respons',
    title: 'RESPONS & KAPASITAS PENANGANAN DARURAT',
    subtitle: 'Posko Komando 24/7, Armada Ambulans Desa, & Pelayanan Medis Tanggap.',
    weight: 20,
    score: 20.00,
    accentColor: 'text-red-600',
    bgBadge: 'bg-red-50 text-red-700 border-red-200',
    borderTopColor: 'border-red-600',
    description: 'Pusat Pengendali Operasi Posko Komando 24 Jam di Kantor Kecamatan Lawang (Jl. MH. Thamrin No. 2), dukungan radio komunikasi VHF/UHF repeater Gunung Polowijen, kesiapan 12 armada Mobil Siaga / Ambulans Desa, dan posko medis Puskesmas Lawang & Wonosari.',
    legalBasis: 'SOP Penanganan Keadaan Darurat Bencana No. 003/SOP-TRC/LWG/2026',
    indicators: [
      'Aktivasi Posko Komando Induk 24/7 dengan regu piket gabungan TNI, Polri, dan Relawan',
      'Dukungan sarana radio komunikasi darurat VHF handy talkie dan rig repeater kecamatan',
      'Kesiapsiagaan armada Mobil Siaga Desa dan Ambulans Siaga Darurat 24 Jam',
      'Buffer stock logistik sandang, pangan, tenda darurat, genset, dan pompa air portabel'
    ],
    achievements: [
      'Skor Verifikasi Resmi BPBD: 20.00 (Maksimal 20.00 poin)',
      'Waktu tanggap (response time) tim TRC Kecamatan tiba di lokasi bencana rata-rata < 15 menit',
      'Kesiapan penuh 12 armada mobil ambulans dan mobil siaga desa siap mobilisasi evakuasi cepat',
      'Sinergi rujukan darurat 24 jam ke Puskesmas Lawang, Puskesmas Wonosari, dan RSJ Radjiman Lawang'
    ]
  },
  {
    id: 'dimensi-5',
    code: 'DIM-05',
    chapterNumber: 'BAB 05',
    category: 'inovasi',
    title: 'PARTISIPASI & INOVASI UNGGULAN',
    subtitle: 'Pentahelix Digital Platform & Pendataan BNBA Kelompok Rentan Terlindungi.',
    weight: 15,
    score: 9.55,
    accentColor: 'text-purple-600',
    bgBadge: 'bg-purple-50 text-purple-700 border-purple-200',
    borderTopColor: 'border-purple-600',
    description: 'Inovasi digital terpadu Portal Kencana Lawang untuk lapor darurat mandiri warga, direktori kontak 12 desa, serta pendataan presisi By Name By Address (BNBA) lansia, disabilitas, ibu hamil, dan balita agar dievakuasi prioritas pertama saat bencana.',
    legalBasis: 'Inovasi Daerah Kabupaten Malang & Pedoman Perlindungan Kelompok Rentan Bencana',
    indicators: [
      'Database By Name By Address (BNBA) kelompok rentan di zona KRB tinggi',
      'Portal Direktori Kontak Darurat terintegrasi 12 Desa/Kelurahan Kecamatan Lawang',
      'Pelibatan kaum perempuan, karang taruna, dan kader PKK dalam sosialisasi keluarga tangguh',
      'Pemanfaatan platform digital untuk monitoring stok logistik dan koordinasi relawan'
    ],
    achievements: [
      'Skor Verifikasi Resmi BPBD: 9.55 poin',
      'Pendataan terverifikasi 842 jiwa kelompok rentan (lansia & disabilitas) dengan pemetaan posisi GPS',
      'Integrasi kanal aduan WhatsApp bot warga Lawang terhubung ke Posko Komando TRC',
      'Penghargaan Partisipasi Masyarakat Teraktif tingkat Kabupaten Malang'
    ]
  }
];

export const INITIAL_PHOTOS: Photo[] = [
  {
    title: "Koordinasi Pemutakhiran Data Warga Negara di Daerah Rawan Bencana dan Korban Bencana Kecamatan Lawang Tahun 2026",
    category: "mitigasi",
    url: "https://lh3.googleusercontent.com/d/1HfgACjU_WQYpzdj9gf4R2dG6FnHK82vC",
    desc: "Rapat Koordinasi Pemutakhiran Data Warga Negara di Daerah Rawan Bencana dan Korban Bencana Kecamatan Lawang Tahun 2026, sebagai upaya meningkatkan akurasi data kebencanaan, memperkuat koordinasi lintas sektor, serta mendukung kesiapsiagaan dan penanggulangan bencana di wilayah Kecamatan Lawang.",
    date: "12 Oktober 2026",
    location: "Kecamatan Lawang",
    photographer: "Humas Satgas Kencana",
    id: 1794310548592
  },
  {
    title: "🌱 GERAKAN MALANG MELIJAU SUKSES DIGELAR DI SUMBER MLATEN KALIREJO 🌱",
    category: "mitigasi",
    url: "https://lh3.googleusercontent.com/d/14azTwWHnhuVC4t3ns6ELBP0N_GPPVGsj",
    desc: "LAWANG - Pemerintah Kecamatan Lawang bersama 170 peserta dari berbagai unsur sukses menggelar kegiatan Gerakan Bersama Masyarakat Lawang untuk Indonesia Asri dengan tema MALANG MELIJAU (Masyarakat Lawang Menanam, Melindungi & Menghijaukan) pada Sabtu (31/10/2026) Pukul 07.00 WIB di Lapangan Aset Pemprov Jatim, Sumber Mlaten RW 13 Kalirejo.\nKegiatan ini merupakan implementasi dari program KENCANA (Kecamatan Tangguh Bencana) dalam upaya menjaga kelestarian lingkungan dan mitigasi bencana melalui penghijauan.",
    date: "31 Oktober 2026",
    location: "Kelurahan Kalirejo",
    photographer: "Humas Satgas Kencana",
    id: 1794300503375
  },
  {
    title: "GEBER MALANG UNTUK INDONESIA ASRI - Gerakan Bersama Masyarakat Lawang Untuk Indonesia Aman, Sehat, Resik Dan Indah",
    category: "inovasi",
    url: "https://lh3.googleusercontent.com/d/1dcO5OTSGuTxpOo_zwNo_KHPQDjSvja73",
    desc: "Inovasi unggulan Kecamatan Lawang melalui Gerakan Bersama Masyarakat Lawang (GEBER) untuk mewujudkan lingkungan Aman, Sehat, Resik dan Indah. Dilaksanakan bersama Forkopimcam, Pemerintah Desa, relawan dan masyarakat di Dusun Mendek, Desa Srigading, 24 April 2026. Meliputi 5 gerakan: 1. Malang Bersih Bersih, 2. Malang Melijau (Menanam, Melindungi dan Menghijaukan Lingkungan), 3. Malang Berakal (Bersih Bersih Kali), 4. Malang Mamel (Memilah dan Mengolah Sampah), 5. Malang Skuter (Sekolah Ku Terbersih).",
    date: "24 April 2026",
    location: "Desa Srigading",
    photographer: "Humas Satgas Kencana",
    id: 1794299397313
  },
  {
    title: "MOBIL AMBULANCE DESA TURIREJO",
    category: "respons",
    url: "https://lh3.googleusercontent.com/d/1GJKY01VqyYiNuFkCXrpg-LmIo5JSMdUm",
    desc: "Ambulans Desa Turirejo Kecamatan Lawang, siap siaga 24/7 untuk evakuasi dan pelayanan kesehatan darurat. Terintegrasi dengan Posko Komando Utama Kecamatan Lawang - Kencana Award 2026",
    date: "07 Agustus 2026",
    location: "Desa Turirejo - Kecamatan Lawang",
    photographer: "Humas Satgas Kencana",
    id: 1794294301568
  },
  {
    title: "Penyelenggaraan Program DESTANA Tahun 2026 Kecamatan Lawang",
    category: "posko",
    url: "https://lh3.googleusercontent.com/d/18GM6FDNu-LSQ8hGYt8ByYzOCom07r0AE",
    desc: "Penyelenggaraan Program Desa Tangguh Bencana (DESTANA) Tahun 2026 di Kecamatan Lawang, 6 Agustus 2026. Meningkatkan kesadaran, kapasitas dan kesiapsiagaan masyarakat dalam menghadapi potensi bencana - Kencana Award 2026.",
    date: "6 Agustus 2026",
    location: "Kecamatan Lawang",
    photographer: "Humas Satgas Kencana",
    id: 1794292001280
  },
  {
    title: "RAPAT KOORDINASI SATGAS KENCANA",
    category: "simulasi",
    url: "https://lh3.googleusercontent.com/d/1EyNNYZn8jDJxVZ7sjgY5Qx26X9SSvxMR",
    desc: "Rapat Koordinasi Satgas Kencana Kecamatan Lawang dalam rangka menyusun rencana program dan kegiatan menuju Kencana Award 2026.",
    date: "7 Agustus 2026",
    location: "Kecamatan Lawang",
    photographer: "Humas Satgas Kencana",
    id: 1794291003552
  },
  {
    title: "MOBIL AMBULANCE DESA MULYOARJO",
    category: "respons",
    url: "https://lh3.googleusercontent.com/d/1ItDGjy4gy-28-0HV-lGm-pV01jwkG-ip",
    desc: "Ambulans Desa Mulyoarjo Kecamatan Lawang, siap siaga 24/7 untuk evakuasi dan pelayanan kesehatan darurat. Terintegrasi dengan Posko Komando Utama Kecamatan Lawang - Kencana Award 2026",
    date: "07 Agustus 2026",
    location: "Desa Mulyoarjo",
    photographer: "Humas Satgas Kencana",
    id: 1794283209080
  },
  {
    title: "MOBIL AMBULANCE DESA SIDOLUHUR",
    category: "respons",
    url: "https://lh3.googleusercontent.com/d/1gOUUl8g768UcZ8td85yFcw-Zd-qVWB5U",
    desc: "Ambulans Desa Sidoluhur Kecamatan Lawang, siap siaga 24/7 untuk evakuasi dan pelayanan kesehatan darurat. Terintegrasi dengan Posko Komando Utama Kecamatan Lawang - Kencana Award 2026",
    date: "07 Agustus 2026",
    location: "Desa Sidoluhur",
    photographer: "Humas Satgas Kencana",
    id: 1794282864647
  },
  {
    title: "MOBIL AMBULAN DESA SRIGADING",
    category: "respons",
    url: "https://lh3.googleusercontent.com/d/1YOcfqAtwpcNcgM2BLAgvjtJ5WBGptLRs",
    desc: "Ambulans Desa Srigading, siap siaga 24/7 untuk evakuasi dan pelayanan kesehatan darurat. Terintegrasi dengan Posko Komando Utama Kecamatan Lawang - Kencana Award 2026",
    date: "07 Agustus 2026",
    location: "Desa Srigading (Zona Lereng)",
    photographer: "Humas Satgas Kencana",
    id: 1794282655932
  },
  {
    title: "MOBIL AMBULAN PMI KECAMATAN LAWANG",
    category: "respons",
    url: "https://lh3.googleusercontent.com/d/10EWUIpvqbMjDJz0YvjifOLdWjk0QIwcI",
    desc: "Ambulance PMI Kecamatan Lawang, siap siaga 24/7 untuk evakuasi dan pelayanan kesehatan darurat. Terintegrasi dengan Posko Komando Utama Kecamatan Lawang - Kencana Award 2026.",
    date: "07 Agustus 2026",
    location: "Kecamatan Lawang",
    photographer: "Humas Satgas Kencana",
    id: 1794281601280
  },
  {
    id: 1,
    title: "Rapat Koordinasi Satgas Kencana",
    category: "simulasi",
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=900",
    desc: "Pembentukan struktur Satgas lintas sektor melibatkan Forkopimcam dan 12 Desa/Kelurahan guna memperkuat kerangka kerja terpadu penanggulangan bencana di wilayah Kecamatan Lawang.",
    date: "14 Januari 2026",
    location: "Aula Kantor Kecamatan Lawang",
    photographer: "Humas Kecamatan Lawang"
  },
  {
    id: 2,
    title: "Kerja Bakti Mitigasi Sungai & Tebing",
    category: "mitigasi",
    url: "https://lh3.googleusercontent.com/d/11PTjnmmX81rVC6o0lEactvZ9Iw7V66i_",
    desc: "Kegiatan kerja bakti ini menjadi salah satu bentuk kepedulian bersama terhadap kebersihan dan kelestarian lingkungan, khususnya kondisi sungai dan kawasan di sekitarnya.\nDalam pelaksanaannya, kegiatan melibatkan unsur Pemerintah Kecamatan Lawang, Pemerintah Desa Sidodadi, unsur TNI dan Polri, perangkat desa/kelurahan, instansi terkait, organisasi kemasyarakatan, dunia usaha, komunitas, serta masyarakat Desa Sidodadi.\nPembersihan saluran air dan normalisasi alur Kali Surak secara gotong royong bersama relawan dan warga untuk mencegah potensi banjir luapan di kawasan pemukiman padat.",
    date: "11 September 2026",
    location: "Aliran Kali Surak Desa Sidodadi",
    photographer: "Relawan Destana Lawang"
  },
  {
    id: 3,
    title: "Simulasi Evakuasi & Uji EWS Digital",
    category: "posko",
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=900",
    desc: "Gladi kesiapsiagaan warga bersama relawan dan pengujian perangkat EWS digital real-time WhatsApp Gateway yang terhubung langsung dengan sensor pemantau curah hujan hulu Arjuno.",
    date: "08 Februari 2026",
    location: "Dusun Krajan, Desa Srigading (Zona Lereng)",
    photographer: "TRC Kencana Lawang"
  },
  {
    id: 4,
    title: "Posko Komando Utama 24/7 Lawang",
    category: "respons",
    url: "https://lh3.googleusercontent.com/d/1Sj1igBcIZM9aVtnjGwlYO_gX1ua9Fnhw",
    desc: "Kesiapsiagaan Posko Komando fisik di Kantor Kecamatan Lawang (Jl. MH. Thamrin No. 2) lengkap dengan papan piket siaga 24 jam, sarpras darurat, serta armada ambulans desa.",
    date: "6 AGUSTUS 2026",
    location: "Kantor Kecamatan Lawang",
    photographer: "Piket Satgas Kecamatan"
  },
  {
    id: 5,
    title: "Portal Pentahelix & Inovasi BNBA SATGAS / RELAWAN",
    category: "inovasi",
    url: "https://lh3.googleusercontent.com/d/1WstHS9_zz1BxUraNU0K-fQGPQIyB8FPL",
    desc: "Sistem pelaporan mandiri dan direktori darurat terintegrasi untuk layanan cepat warga serta pengelolaan data BNBA (By Name By Address) SATGAS/ RELAWAN",
    date: "28 Oktober 2026",
    location: "Ruang Media Center Kencana Lawang",
    photographer: "Tim IT Kencana Lawang"
  },
  {
    id: 6,
    title: "🌱 Langkah Sederhana, Dampak Besar: Warga Lawang Bersama Menanam untuk Negeri",
    category: "mitigasi",
    url: "https://lh3.googleusercontent.com/d/1wqAGKBD0KLPWBwQC1wSEI9mFjNTz_UaD",
    desc: "Semangat gotong royong kembali terasa di Kecamatan Lawang! Melalui gerakan GEBER MALANG, warga bersama Muspika, TNI-Polri, pemerintah desa/kelurahan, komunitas, hingga dunia usaha bersatu dalam aksi penanaman pohon di Desa Srigading (24/4/2026).\nBukan sekadar menanam pohon 🌳, kegiatan ini adalah wujud nyata kepedulian bersama untuk menjaga lingkungan tetap aman, sehat, resik, dan indah. Mengusung semangat MELIJAU (Merawat, Melindungi, dan Menghijaukan), langkah kecil hari ini menjadi investasi besar untuk masa depan.",
    date: "24 April 2026",
    location: "Gunung Tumpuk Desa Srigading",
    photographer: "Kader Konservasi Destana"
  },
  {
    id: 7,
    title: "Gelar Peralatan SAR & Kesiapan Logistik",
    category: "respons",
    url: "https://lh3.googleusercontent.com/d/1MaOJe5q35kzPUFmlhFzPvH0xfZVg75XT",
    desc: "Pemeriksaan berkala kesiapan gergaji mesin (chainsaw), perahu karet evakuasi, tenda darurat, genset penerangan, dan peralatan P3K darurat di Posko Kecamatan Lawang.",
    date: "28 September 2026",
    location: "Halaman Depan Kecamatan Lawang",
    photographer: "Satpol PP & TRC Lawang"
  }
];

export const VILLAGES_DATA: Village[] = [
  {
    id: 'srigading',
    name: 'Desa Srigading',
    type: 'Desa',
    riskLevel: 'Tinggi',
    primaryRisk: 'Tanah Longsor Lereng Arjuno & Banjir Bandang Alur Sungai',
    poskoContact: '0812-3344-5501',
    kadesName: 'H. Suwandi, S.Pd',
    assemblyPoint: 'Lapangan Desa Srigading & Balai Desa Lama (Zona Aman)',
    destanaStatus: 'Madya',
    vulnerableCount: { elderly: 114, disability: 18, infants: 62, pregnant: 14 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5502'
  },
  {
    id: 'ketindan',
    name: 'Desa Ketindan',
    type: 'Desa',
    riskLevel: 'Tinggi',
    primaryRisk: 'Gerakan Tanah & Longsor Tebing Perkebunan',
    poskoContact: '0812-3344-5503',
    kadesName: 'Dra. Siti Rahayu',
    assemblyPoint: 'Kompleks Balai Desa Ketindan & Halaman Puskesmas Pembantu',
    destanaStatus: 'Madya',
    vulnerableCount: { elderly: 98, disability: 15, infants: 54, pregnant: 11 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5504'
  },
  {
    id: 'sidodadi',
    name: 'Desa Sidodadi',
    type: 'Desa',
    riskLevel: 'Sedang',
    primaryRisk: 'Banjir Luapan Kali Lawang & Genangan Pemukiman',
    poskoContact: '0812-3344-5505',
    kadesName: 'Bambang Supriyanto',
    assemblyPoint: 'Halaman Gedung Serbaguna Sidodadi',
    destanaStatus: 'Pratama',
    vulnerableCount: { elderly: 82, disability: 12, infants: 71, pregnant: 16 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5506'
  },
  {
    id: 'wonorejo',
    name: 'Desa Wonorejo',
    type: 'Desa',
    riskLevel: 'Sedang',
    primaryRisk: 'Angin Puting Beliung & Pohon Tumbang Jalur Arteri',
    poskoContact: '0812-3344-5507',
    kadesName: 'M. Arifin, S.E',
    assemblyPoint: 'Lapangan Wonorejo Depan Balai Desa',
    destanaStatus: 'Pratama',
    vulnerableCount: { elderly: 76, disability: 9, infants: 48, pregnant: 10 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5508'
  },
  {
    id: 'turirejo',
    name: 'Desa Turirejo',
    type: 'Desa',
    riskLevel: 'Sedang',
    primaryRisk: 'Banjir Saluran Drainase & Pohon Tumbang',
    poskoContact: '0812-3344-5509',
    kadesName: 'Drs. H. Kusnadi',
    assemblyPoint: 'Halaman SD Negeri Turirejo 01',
    destanaStatus: 'Pratama',
    vulnerableCount: { elderly: 89, disability: 14, infants: 65, pregnant: 12 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5510'
  },
  {
    id: 'sumberporong',
    name: 'Desa Sumberporong',
    type: 'Desa',
    riskLevel: 'Rendah',
    primaryRisk: 'Genangan Lokal & Angin Kencang',
    poskoContact: '0812-3344-5511',
    kadesName: 'Ir. Ahmad Subagyo',
    assemblyPoint: 'Lapangan Olahraga Sumberporong',
    destanaStatus: 'Utama',
    vulnerableCount: { elderly: 65, disability: 11, infants: 52, pregnant: 9 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5512'
  },
  {
    id: 'mulyoarjo',
    name: 'Desa Mulyoarjo',
    type: 'Desa',
    riskLevel: 'Sedang',
    primaryRisk: 'Sedimentasi Aliran Lahar Sejarah & Erosi Tanah',
    poskoContact: '0812-3344-5513',
    kadesName: 'Heri Susanto, S.Sos',
    assemblyPoint: 'Halaman Kantor Balai Desa Mulyoarjo',
    destanaStatus: 'Pratama',
    vulnerableCount: { elderly: 72, disability: 8, infants: 43, pregnant: 8 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5514'
  },
  {
    id: 'bedali',
    name: 'Desa Bedali',
    type: 'Desa',
    riskLevel: 'Sedang',
    primaryRisk: 'Pohon Tumbang Jalur Utama Provinsi Malang-Surabaya',
    poskoContact: '0812-3344-5515',
    kadesName: 'Tri Wahyudi, S.T',
    assemblyPoint: 'Lapangan Desa Bedali (Pusat Evakuasi Jalur Arteri)',
    destanaStatus: 'Madya',
    vulnerableCount: { elderly: 95, disability: 13, infants: 78, pregnant: 15 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5516'
  },
  {
    id: 'kalirejo_desa',
    name: 'Desa Kalirejo',
    type: 'Desa',
    riskLevel: 'Sedang',
    primaryRisk: 'Banjir Luapan Alur Sungai & Saluran Pemukiman',
    poskoContact: '0812-3344-5517',
    kadesName: 'Agus Sunarto',
    assemblyPoint: 'Lapangan Utama Kalirejo',
    destanaStatus: 'Pratama',
    vulnerableCount: { elderly: 68, disability: 7, infants: 50, pregnant: 11 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5518'
  },
  {
    id: 'sumberngepoh',
    name: 'Desa Sumberngepoh',
    type: 'Desa',
    riskLevel: 'Tinggi',
    primaryRisk: 'Erosi Tebing Bukit & Akses Jalan Terisolasi',
    poskoContact: '0812-3344-5519',
    kadesName: 'Dra. Hj. Nurul Laili',
    assemblyPoint: 'Halaman Wisata Sumber Puyang / Balai Desa',
    destanaStatus: 'Madya',
    vulnerableCount: { elderly: 81, disability: 16, infants: 39, pregnant: 7 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5520'
  },
  {
    id: 'kel_kalirejo',
    name: 'Kelurahan Kalirejo',
    type: 'Kelurahan',
    riskLevel: 'Sedang',
    primaryRisk: 'Genangan Air Pemukiman Padat & Pohon Tumbang',
    poskoContact: '0812-3344-5521',
    kadesName: 'Lurah: Rudi Hartono, S.STP',
    assemblyPoint: 'Pendopo Kelurahan Kalirejo',
    destanaStatus: 'Madya',
    vulnerableCount: { elderly: 92, disability: 10, infants: 60, pregnant: 13 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5522'
  },
  {
    id: 'kel_lawang',
    name: 'Kelurahan Lawang',
    type: 'Kelurahan',
    riskLevel: 'Sedang',
    primaryRisk: 'Banjir Luapan Drainase Perkotaan & Pasar Lawang',
    poskoContact: '0812-3344-5523',
    kadesName: 'Lurah: Hendro Purnomo, S.Sos',
    assemblyPoint: 'Halaman Pujasera Lawang & Alun-Alun Thamrin',
    destanaStatus: 'Utama',
    vulnerableCount: { elderly: 106, disability: 14, infants: 83, pregnant: 17 },
    hasAmbulance: true,
    ambulanceContact: '0812-3344-5524'
  }
];

export const INITIAL_EWS_TEMPLATES: EwsMessage[] = [
  {
    id: 'ews-1',
    level: 'WASPADA',
    hazard: 'Potensi Cuaca Ekstrem & Curah Hujan Tinggi',
    location: 'Kecamatan Lawang (Khususnya Zona Lereng Srigading & Ketindan)',
    timestamp: 'Baru saja',
    message: 'Berdasarkan pantauan Stasiun Radar Cuaca dan telemetri sensor hulu Arjuno, terpantau pertumbuhan awan konvektif pekat dengan potensi hujan sedang hingga lebat disertai kilat dan angin kencang dalam 2-3 jam ke depan.',
    guidance: [
      'Waspadai potensi genangan dan luapan drainase di alur Kali Lawang',
      'Hindari berteduh di bawah pohon rindang atau baliho besar di sepanjang Jalan MH. Thamrin & Bedali',
      'Pengurus RT/RW siaga memantau debit air di pintu air lingkungan masing-masing'
    ]
  },
  {
    id: 'ews-2',
    level: 'SIAGA',
    hazard: 'Peringatan Dini Peningkatan Debit Alur Kali Lawang & Ancaman Longsor',
    location: 'Desa Srigading, Ketindan, dan Desa Sidodadi',
    timestamp: 'Baru saja',
    message: 'Curah hujan akumulasi melampaui ambang batas 60 mm/jam di lereng barat. Debit air permukaan Kali Lawang meningkat tajam dan terdapat laporan retakan tanah mikro di tebing lereng Dusun Krajan Srigading.',
    guidance: [
      'Warga pemukiman bibir tebing agar segera memindahkan lansia, anak-anak, dan surat berharga ke Titik Kumpul Aman (Assembly Point)',
      'Aktifkan sistem kentongan / sirine manual Destana dan pos ronda lingkungan',
      'Koordinator Posko Desa harap berkoordinasi langsung dengan Posko Induk TRC Kecamatan Lawang (0811-3400-247)'
    ]
  },
  {
    id: 'ews-3',
    level: 'AWAS',
    hazard: 'Evakuasi Darurat - Ancaman Longsor & Banjir Luapan Bandang',
    location: 'Kawasan Bantaran Kali Lawang & Tebing Kritis RT 04 RW 02 Srigading',
    timestamp: 'Darurat',
    message: 'SIAGA MERAH: Debit air meluap ke pemukiman dan sensor pergerakan tanah EWS mendeteksi pergeseran aktif. Seluruh warga pada radius 100 meter dari zona retakan WAJIB SEGERA MENGEVAKUASI DIRI.',
    guidance: [
      'Laksanakan protokol evakuasi mandiri SEGERA menuju titik kumpul Balai Desa Srigading / Pujasera',
      'Bantu mobilitas kelompok rentan terdata (BNBA) menggunakan Mobil Siaga Desa',
      'Matikan aliran listrik utama dan kompor sebelum meninggalkan hunian'
    ]
  }
];

export function convertDriveUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.includes('drive.google.com')) {
    const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    const matchId = trimmed.match(/id=([a-zA-Z0-9_-]+)/);
    if (matchId && matchId[1]) {
      return `https://lh3.googleusercontent.com/d/${matchId[1]}`;
    }
  }
  return trimmed;
}
