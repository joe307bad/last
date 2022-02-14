import { parse } from 'yaml';
import { promises } from 'fs';
import { CartesianProduct } from 'js-combinatorics';
import { stringify } from 'json-to-pretty-yaml';

export const generateStory = async (
  inputStoryStructure: string,
  outputFile: string
) => {
  const storyStructure = parse(
    (
      await promises.readFile(inputStoryStructure)
    ).toString()
  );

  const { characters, resources } =
    storyStructure.conditions;

  const characterPossibilities = Object.keys(
    characters
  ).map((characterKey) => {
    const cp = new CartesianProduct(
      [characterKey],
      characters[characterKey]
    );
    return Array.from(cp);
  });

  const [permutations, possible_results] =
    Array.from(
      new CartesianProduct(
        ...characterPossibilities
      )
    )
      .map((cp) => cp.map((cf) => cf.join('_')))
      .map((cf) => cf.join('___'))
      .reduce(
        (acc: [object, number], item) => {
          const choiceResults = {
            text: '',
            character_relationship_created: '',
            population_change: '',
            resource_change: '',
            character_deaths: '',
            character_births: '',
          };
          const possibleResults = acc[1] + 3;
          const yaml = {
            ...acc[0],
            [item]: {
              text: '',
              choice_1: choiceResults,
              choice_2: choiceResults,
              choice_3: choiceResults,
            },
          };

          return [yaml, possibleResults];
        },
        [{}, 0]
      );

  return stringify({
    setup: '',
    possible_results,
    character_possibilities: permutations,
  });
};
