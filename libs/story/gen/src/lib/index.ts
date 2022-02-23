import { CartesianProduct } from 'js-combinatorics';
import { stringify } from 'json-to-pretty-yaml';
import { random } from 'rambdax';

export const generateStoryTemplate =
  async (inputStoryStructure: {
    title: string;
    foci: any;
    planets: any;
    characters: {
      [key: string]: {
        possible_traits: string[];
        house: string;
      };
    };
    possible_outcomes: any;
  }) => {
    const {
      title,
      foci,
      planets,
      characters,
      possible_outcomes,
    } = inputStoryStructure;

    const outcomesStack = [...possible_outcomes];

    const characterPossibilities = Object.keys(
      characters
    ).map((characterKey) => {
      const cp = new CartesianProduct(
        [characterKey],
        characters[characterKey].possible_traits
      );
      return Array.from(cp);
    });

    const [permutations, possible_results] =
      Array.from(
        new CartesianProduct(
          ...characterPossibilities
        )
      )
        .map((cp) =>
          cp.map(
            (cf) =>
              `${cf.join('_')}_${
                characters[cf[0]].house
              }`
          )
        )
        .map((cf) => cf.join('___'))
        .reduce(
          (acc: [object, number], item) => {
            const possibleOutcome = () => {
              if (outcomesStack.length > 0) {
                return outcomesStack.pop();
              } else {
                return possible_outcomes[
                  random(
                    0,
                    possible_outcomes.length - 1
                  )
                ];
              }
            };
            const possibleResults = acc[1] + 3;
            const yaml = {
              ...acc[0],
              [item]: {
                text: '',
                choice_1: {
                  text: '',
                  [possibleOutcome()]: {
                    text: '',
                  },
                },
                choice_2: {
                  text: '',
                  [possibleOutcome()]: {
                    text: '',
                  },
                },
                choice_3: {
                  text: '',
                  [possibleOutcome()]: {
                    text: '',
                  },
                },
              },
            };

            return [yaml, possibleResults];
          },
          [{}, 0]
        );

    const permutationKeys =
      Object.keys(permutations);

    return stringify({
      title,
      possible_results,
      planets: planets.reduce((acc, item) => {
        return {
          ...acc,
          [item]: permutationKeys.length,
        };
      }, {}),
      foci,
      openings: permutationKeys.map((_) => ''),
      character_possibilities: permutations,
    });
  };
