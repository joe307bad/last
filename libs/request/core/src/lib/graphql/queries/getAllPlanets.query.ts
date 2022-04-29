import gql from 'graphql-tag';
const getAllPlanets = gql`
  {
    planets(paging: { first: 100 }) {
      edges {
        node {
          id
          name
          description
          enabled
          created
          updated
          initialAlignment
          population
          level
          mapId
          planetarySystem {
            name
          }
          rulingHouse {
            name
          }
          houses {
            name
          }
          foci {
            name
          }
          colors {
            hex
          }
          terrains {
            name
          }
          planetResources {
            initialAmount
            resource {
              name
            }
          }
        }
      }
    }
  }
`;

export default getAllPlanets;
