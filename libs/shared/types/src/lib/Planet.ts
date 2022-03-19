export type Planet = {
  id: string;
  name: string;
  enabled: boolean;
  level: number;
  mapId: string;
  created: string;
  updated: string;
  description: string;
  initialAlignment: number;
  colors: { hex: string }[];
  rulingHouse: { name: string };
  houses: { name: string }[];
  planetResources: {
    initialAmount: number;
    resource: {
      id: string;
      name: string;
    };
  }[];
  foci: { name: string }[];
  terrains: { name: string }[];
};
