const hotels = [
    {
      src: '/img/hoteles/NOVOTEL.webp',
      name: 'Novotel Mexico City Toreo',
      address: 'Av. Primero de Mayo 120 Torre 2, San Andrés Atoto 53500 Naucalpan de Juárez  México',
      rate_es: '',
      rate_en: '',
      phone_international: '',
      phone_mexico: '',
      celular: '',
      email: '',
      cc:'',
      code: 'HANNOVER',
      time_walk: '48 min',
      time_car: '10 min',
      start: 4,
      link: 'https://all.accor.com/hotel/B5Q7/index.es.shtml?utm_campaign=seo+maps&utm_medium=seo+maps&utm_source=google+Maps',
      flyer_esp: '/files/flyer-novotel-esp.pdf',
      flyer_eng: '/files/flyer-novotel-eng.pdf'
    },
    {
      src: '/img/hoteles/camino_real_polanco.webp',
      name: 'Camino Real Polanco',
      address: 'Mariano Escobedo No. 700 Col. Anzures, México D.F. C.P. 11590',
      rate_es: '',
      rate_en: '',
      phone_international: '',
      phone_mexico: '',
      celular: '',
      email: '',
      cc:'',
      code: 'HANNOVER',
      time_walk: '1h 20min',
      time_car: '20 min',
      start: 5,
      link: 'https://www.caminoreal.com/caminoreal/camino-real-polanco-mexico',
      flyer_esp: '/files/flyer_camino_real_esp.pdf',
      flyer_eng: '/files/flyer_camino_real_eng.pdf'
    },
    {
      src: '/img/hoteles/BARCELO_REFORMA.webp',
      name: 'Barceló México Reforma',
      address: 'Av. Paseo de la Reforma No. 1 C.P. 06030 Col. Tabacalera Ciudad de México.',
      rate_es: '',
      rate_en: '',
      phone_international: '',
      phone_mexico: '',
      celular: ' ',
      email: '',
      cc:'',
      code: 'HANNOVER',
      time_walk: '1h 54min',
      time_car: '31 min',
      start: 5,
      link: 'https://www.barcelo.com/es-mx/barcelo-mexico-reforma/',
      flyer_esp: '/files/flyer_barcelo_eng.png',
      flyer_eng: '/files/flyer_barcelo_esp.png'
    },
    /*        
    {
      src: '/img/hoteles/KIMPTON_VIRGILIO.webp',
      name: 'Kimpton Virgilio Polanco',
      address: 'Anatole France 79 Polanco, Mexico City 11540',
      rate_es: '',
      rate_en: '',
      phone_international: '',
      phone_mexico: '',
      celular: '',
      email: '',
      cc:'',
      code: 'HANNOVER',
      time_walk: '50 min',
      time_car: '12 min',
      start: 4,
      link: 'https://www.kimptonvirgilio.com/us/en/'
    },
    {
      src: '/img/hoteles/FIESTA_AMERICANA_TOREO.webp',
      name: 'Fiesta Americana Mexico Toreo',
      address: 'Blvd. Adolfo López Mateos 1308, Los Gavilanes, 37270 León, Gto.',
      rate_es: '',
      rate_en: '',
      phone_international: '',
      phone_mexico: '',
      celular: '',
      email: '',
      cc:'',
      code: 'HANNOVER',
      time_walk: '28 min',
      time_car: '8 min',
      start: 5,
      link: 'https://www.fiestamericanatravelty.com/fiesta-americana/hoteles/fiesta-americana-mexico-toreo'
    },
    {
      src: '/img/hoteles/HYATT_TOREO.webp',
      name: 'Hyatt Regency Mexico City',
      address: 'Campos Elíseos 204, Polanco Chapultepec, Ciudad de México 11560',
      rate_es: '',
      rate_en: '',
      phone_international: '',
      phone_mexico: '',
      celular: '',
      email: '',
      cc:'',
      code: 'HANNOVER',
      time_walk: '59 min',
      time_car: '14 min',
      start: 5,
      link: 'https://www.guestreservations.com/es/hyatt-regency-mexico-city/booking?msclkid=41bcf879b3041a05f64e904ede3ec903'
    },*/
    
  ]
  
export function Start(numberStart) {
    let startIcon = ''
    for (let i = 0; i < numberStart; i++) {
      startIcon += `<svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
          `
    }

    return startIcon
  }

  export  {hotels} 