import { readFile } from 'fs/promises';

export const getMapSvg = async (mapSvg: string) =>
  JSON.parse(await readFile(mapSvg, 'utf-8'));
