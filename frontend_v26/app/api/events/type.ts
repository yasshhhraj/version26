interface Event {
    id: string;
    title: string;
    tagline:string;
    imageUrl: string;
    eventType: 'technical'| 'non-technical';
    date: string;
    locationType: string;
    participation: 'solo' | 'team';
    teamSize?: number;
    fullDescription: string;
    rules: string[];
    prize: string[];
    venue: string;
    platform: string;
    contact: string;
}