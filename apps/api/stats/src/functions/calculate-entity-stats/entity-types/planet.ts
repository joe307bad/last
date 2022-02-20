import got from 'got';
// nx serve api-stats --data="[\"59698166-27c0-492f-9c0a-85a27113939f\", \"planet\"]"
export const createPlanetStoryEvent = async (
  planetId: string
) => {
  console.log(planetId)
  return got
    .post('http://localhost:3333/graphql', {
      json: {
        query: `{ planet(id: "${planetId}") { name }}`,
      },
    })
    .json();
};
