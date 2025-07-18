
import { HeroData, Service, Project, AboutMeData, ContactData } from './types';

export const INITIAL_HERO_DATA: HeroData = {
    titleLine1: 'Desarrollo Web a Medida',
    titleLine2: 'UX/UI',
    subtitle: 'Transformo ideas en sitios web funcionales y rápidos, con un diseño centrado en el usuario.',
    ctaText: 'Ver Proyectos',
    ctaLink: '#projects'
};

export const INITIAL_SERVICES_DATA: Service[] = [
    { id: 's1', icon: 'wrench', title: 'Diseño y Desarrollo Web a Medida', description: 'Creo soluciones web únicas, desde el concepto inicial hasta el lanzamiento, totalmente adaptadas a tus necesidades.' },
    { id: 's2', icon: 'palette', title: 'UX/UI con Enfoque en Experiencia Real', description: 'Diseño interfaces intuitivas y atractivas, priorizando siempre una experiencia de usuario fluida y satisfactoria.' },
    { id: 's3', icon: 'rocket', title: 'Webs Rápidas y Fáciles de Usar', description: 'Desarrollo sitios optimizados para la velocidad y la usabilidad, asegurando que tu mensaje llegue claro y rápido.' },
    { id: 's4', icon: 'headset', title: 'Acompañamiento Post-Lanzamiento', description: 'Ofrezco soporte y mantenimiento para que tu web siga funcionando de manera óptima y crezca contigo.' }
];

export const INITIAL_PROJECTS_DATA: Project[] = [
    {
        id: 'p1',
        title: 'Rolumodas.UY',
        category: 'E-commerce Femenino',
        imageUrl: 'https://i.imgur.com/uR1GXBv.png',
        problem: 'Una boutique local de moda femenina carecía de presencia online, lo que limitaba su alcance de clientes y su potencial de ventas a su ubicación física.',
        solution: 'Desarrollé una tienda e-commerce completa con un diseño moderno y femenino, un carrito de compras intuitivo y un panel de administración para gestionar productos y pedidos. La plataforma se construyó con React y Node.js para un rendimiento óptimo.',
        impact: [
            { value: '+200%', label: 'Aumento de Ventas' },
            { value: '-40%', label: 'Tiempo de Carga' },
            { value: '95/100', label: 'Puntuación Lighthouse' }
        ],
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        liveLink: '#',
        repoLink: '#'
    },
    {
        id: 'p2',
        title: 'GrowShopDurazno.com',
        category: 'E-commerce de Nicho',
        imageUrl: 'https://i.imgur.com/vH2kknx.png',
        problem: 'Un growshop local necesitaba una plataforma de e-commerce que no solo vendiera productos, sino que también educara a la comunidad. El desafío era crear un diseño atractivo y optimizado para SEO en un nicho competitivo.',
        solution: 'Construí un e-commerce robusto enfocado en la experiencia del usuario y el SEO. Implementé un blog integrado para marketing de contenidos y optimicé las fichas de producto con información detallada para mejorar el ranking en buscadores.',
        impact: [
            { value: '+30%', label: 'Tráfico Orgánico' },
            { value: '#1', label: 'Ranking para Keywords Locales' },
            { value: '+150%', label: 'Interacción de Usuarios' }
        ],
        techStack: ['Next.js', 'Vercel', 'Stripe', 'GraphQL', 'Tailwind CSS'],
        liveLink: '#',
        repoLink: '#'
    },
    {
        id: 'p3',
        title: 'Actitud Fitness',
        category: 'Landing Page para Gimnasio',
        imageUrl: 'https://i.imgur.com/Y3v12dC.png',
        problem: 'Un nuevo gimnasio necesitaba una landing page de alto impacto para su campaña de lanzamiento, con el objetivo de captar leads y generar inscripciones antes de la apertura.',
        solution: 'Diseñé y desarrollé una landing page visualmente atractiva y funcional, con animaciones suaves para guiar al usuario. Se integró un formulario de contacto directo a su CRM y se optimizó la velocidad de carga para dispositivos móviles.',
        impact: [
            { value: '+500', label: 'Leads Capturados' },
            { value: '25%', label: 'Tasa de Conversión' },
            { value: '<1.5s', label: 'Tiempo de Carga' }
        ],
        techStack: ['React', 'Framer Motion', 'Netlify', 'CSS Modules'],
        liveLink: '#',
        repoLink: '#'
    }
];

export const INITIAL_ABOUT_ME_DATA: AboutMeData = {
    points: [
        { id: 'am1', icon: 'code', text: 'Empecé en la informática a los 14 y me enamoré del desarrollo web con Java y HTML/CSS.' },
        { id: 'am2', icon: 'target', text: 'Hoy creo sitios funcionales y personalizados para negocios reales, enfocándome en la calidad y la experiencia del usuario.' },
        { id: 'am3', icon: 'motorcycle', text: 'Desde chico sueño con una Yamaha MT-03. Es mi motivación personal que impulsa cada proyecto.' }
    ]
};

export const INITIAL_CONTACT_DATA: ContactData = {
    whatsappLink: '#',
    emailLink: 'mailto:example@example.com'
};
