import got from 'got';

export const createManyMaps = (
  numberOfMaps: number
) => {
  return got
    .get(
      `http://localhost:3080/api/create-many-maps?height=${920}&width=${1000}&numberOfRegions=${50}&numberOfMaps=${numberOfMaps}`
    )
    .json<{ id: string }[]>();
};
