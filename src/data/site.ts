export const contact = {
  name: 'Kapsalon De Hoofdzaak',
  street: 'Torhoutse Steenweg 200',
  city: '8200 Brugge',
  phone: '050 39 20 40',
  phoneHref: 'tel:+3250392040',
  email: 'info@hoofdzaak.be',
  emailHref: 'mailto:info@hoofdzaak.be?subject=Afspraak%20maken',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Torhoutse+Steenweg+200+8200+Brugge',
  mapsEmbed: 'https://www.google.com/maps?q=Torhoutse+Steenweg+200,+8200+Brugge&output=embed',
  // Fill in the salon's real profile URLs; links are hidden while empty.
  facebook: '',
  instagram: '',
}

export const nav = [
  { id: 'concept', label: 'Concept', image: './images/interieur.jpg' },
  { id: 'troeven', label: 'Onze troeven', image: './images/fohnen.jpg' },
  { id: 'producten', label: 'Producten', image: './images/producten.jpg' },
  { id: 'openingsuren', label: 'Openingsuren', image: './images/kleur.jpg' },
  { id: 'ligging', label: 'Ligging', image: './images/wassen.jpg' },
]

export const concept =
  'Kapsalon De Hoofdzaak maakt van uw kappersbeurt een aangenaam moment. U maakt vooraf een afspraak, en wij zorgen dat die stipt wordt nageleefd. Met de nieuwste technieken en uitsluitend hoogwaardige verzorgingsproducten wordt uw haar verwend, in een rustige sfeer waarin u even helemaal tot rust komt.'

export const troeven = [
  {
    title: 'Op afspraak',
    lead: 'U bespaart tijd.',
    body: 'Geen wachtrij, geen haast. Uw moment is gereserveerd en wordt stipt gerespecteerd.',
    image: './images/opsteken.jpg',
  },
  {
    title: 'Nieuwste technieken',
    lead: 'Een trendy kapsel dat bij u past.',
    body: 'We volgen de nieuwste snit- en kleurtechnieken op de voet en vertalen ze naar wat u het best staat.',
    image: './images/krullen.jpg',
  },
  {
    title: 'Ecologisch',
    lead: '100% natuurlijke producten van O Way.',
    body: 'Zorg voor uw haar én voor de natuur: we werken met biologische, plantaardige formules.',
    image: './images/producten-2.jpg',
  },
  {
    title: 'Rustige atmosfeer',
    lead: 'Kom binnen en ontdek het zelf.',
    body: 'Een persoonlijke aanpak, eerlijk advies en de rust om even niets te moeten.',
    image: './images/interieur.jpg',
  },
]

/** Day index follows Date.getDay(): 0 = zondag. Times in minutes since midnight. */
export const hours: { day: number; label: string; slots: [number, number][]; note?: string }[] = [
  { day: 1, label: 'Maandag', slots: [] },
  { day: 2, label: 'Dinsdag', slots: [] },
  { day: 3, label: 'Woensdag', slots: [[9 * 60, 12 * 60], [13 * 60, 19 * 60]] },
  { day: 4, label: 'Donderdag', slots: [[9 * 60, 12 * 60], [13 * 60, 19 * 60]] },
  { day: 5, label: 'Vrijdag', slots: [[8 * 60, 12 * 60], [13 * 60, 19 * 60]] },
  { day: 6, label: 'Zaterdag', slots: [[8 * 60, 17 * 60]], note: 'doorlopend' },
  { day: 0, label: 'Zondag', slots: [] },
]

export const formatTime = (minutes: number) => `${Math.floor(minutes / 60)}u${minutes % 60 ? String(minutes % 60).padStart(2, '0') : ''}`
