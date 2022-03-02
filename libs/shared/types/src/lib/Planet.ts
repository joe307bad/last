export type Planet = {
  id: string;
  name: string;
  enabled: boolean;
  level: number;
  created: string;
  updated: string;
  description: string;
  initialAlignment: number;
  colors: { hex: string }[];
  rulingHouse: { name: string }[];
  houses: { name: string }[];
  planetResources: { name: string }[];
  foci: { name: string }[];
  terrains: { name: string }[];
};