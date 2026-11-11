export type PhotoCategory = 'simulasi' | 'mitigasi' | 'posko' | 'respons' | 'inovasi';

export interface Photo {
  id: string | number;
  title: string;
  category: PhotoCategory;
  url: string;
  desc: string;
  date?: string;
  location?: string;
  photographer?: string;
}

export interface Dimension {
  id: string;
  code: string;
  chapterNumber: string;
  category: PhotoCategory;
  title: string;
  subtitle: string;
  weight: number;
  score?: number;
  accentColor: string;
  bgBadge: string;
  borderTopColor: string;
  description: string;
  indicators: string[];
  achievements: string[];
  legalBasis: string;
}

export interface Village {
  id: string;
  name: string;
  type: 'Desa' | 'Kelurahan';
  riskLevel: 'Tinggi' | 'Sedang' | 'Rendah';
  primaryRisk: string;
  poskoContact: string;
  kadesName: string;
  assemblyPoint: string;
  destanaStatus: 'Madya' | 'Pratama' | 'Utama';
  vulnerableCount: {
    elderly: number;
    disability: number;
    infants: number;
    pregnant: number;
  };
  hasAmbulance: boolean;
  ambulanceContact: string;
}

export interface EwsMessage {
  id: string;
  level: 'WASPADA' | 'SIAGA' | 'AWAS';
  hazard: string;
  location: string;
  timestamp: string;
  message: string;
  guidance: string[];
}

export interface OfficialVerificationData {
  nomorSurat: string;
  nomorSuratPerintah: string;
  tanggalVerifikasi: string;
  hariVerifikasi: string;
  tanggalSuratPerintah: string;
  tempat: string;
  kecamatan: string;
  jadwal: string;
  penanggungJawab: string;
  anggotaTim: string;
  camat: string;
  camatPangkat: string;
  camatNip: string;
  scores: {
    tataKelola: number;
    mitigasi: number;
    kesiapsiagaan: number;
    respons: number;
    inovasi: number;
    total: number;
  };
  catatanEkspor: string;
  scanImages: string[];
}

export interface KencanaRegistrationProfile {
  kecamatan: string;
  nomorRegister: string;
  tanggalGerakanKencana: string;
  tanggalKencanaPratama: string;
  email: string;
  noHp: string;
  namaPic: string;
  alamatKantor: string;
}

