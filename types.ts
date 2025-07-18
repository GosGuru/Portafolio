
export interface HeroData {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

export interface Service {
    id: string;
    icon: 'wrench' | 'palette' | 'rocket' | 'headset';
    title: string;
    description: string;
}

export interface Project {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    problem: string;
    solution: string;
    impact: ImpactMetric[];
    techStack: string[];
    liveLink?: string;
    repoLink?: string;
}

export interface ImpactMetric {
    value: string;
    label: string;
}

export interface AboutMeData {
    points: {
        id: string;
        icon: 'code' | 'target' | 'motorcycle';
        text: string;
    }[];
}

export interface ContactData {
    whatsappLink: string;
    emailLink: string;
}
