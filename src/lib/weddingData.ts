export const couple = {
  bride: { firstName: "Büşra", lastName: "Karcı" },
  groom: { firstName: "İlhan", lastName: "Köse" },
  displayName: "Büşra & İlhan",
  instagram: "@busra_karciii",
  tagline: "Hayatımın güneşi ol, hep ☀️",
  taglineAlt: "Always be the sunshine in my life ☀️",
};

export const families = {
  bride: "Sıddıka & Mehmet Karcı",
  groom: "Fatma & Azat Köse",
};

export interface WeddingEvent {
  id: string;
  name: string;
  city: string;
  date: string;
  dayOfWeek: string;
  time: string;
  venue: string;
  address: string;
  isMainEvent?: boolean;
  badge?: string;
  optional?: boolean;
  mapQuery: string;
}

export const events: WeddingEvent[] = [
  {
    id: "kina",
    name: "Kına Gecesi",
    city: "Afyonkarahisar",
    date: "25 Temmuz 2026",
    dayOfWeek: "Cumartesi",
    time: "19:30",
    venue: "Alyans Wedding Kır Bahçesi Düğün Salonu",
    address: "Dörtyol Mah. 3206. Sk. No:18, Afyonkarahisar",
    mapQuery: "Dörtyol+Mahallesi+3206+Sokak+No:18+Afyonkarahisar",
  },
  {
    id: "gelin-alma",
    name: "Gelin Alma",
    city: "Ankara",
    date: "1 Ağustos 2026",
    dayOfWeek: "Cumartesi",
    time: "11:00",
    venue: "[Adres eklenecek]",
    address: "[Adres eklenecek]",
    optional: true,
    mapQuery: "",
  },
  {
    id: "nikah",
    name: "Nikah & Kokteyl",
    city: "Ankara",
    date: "1 Ağustos 2026",
    dayOfWeek: "Cumartesi",
    time: "18:00 – 20:30",
    venue: "Eymoria Garden",
    address: "Yeşilkent, 555. Cad. No:7/2, Eymir Gölü, Çankaya / Ankara",
    isMainEvent: true,
    badge: "★ Ana Tören",
    mapQuery: "Eymoria+Garden+Yeşilkent+555+Cadde+Eymir+Gölü+Çankaya+Ankara",
  },
];

export const nikahDate = new Date("2026-08-01T18:00:00+03:00");

export const config = {
  showGelinAlma: false,
  memoryModeOverride: false,
};
