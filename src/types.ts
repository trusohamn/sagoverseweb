export type Location = { lat: number; lng: number };
export type Place = {
    value?: string;
    name?: string;
    location: Location;
    hint?: string;
    id?: number;
};