import { generateStoryTemplate } from '@last/story/gen';
import { promises } from 'fs';
import { parse } from 'yaml';

(async () => {
  const [structure, output] = process.argv.reduce(
    (acc, item) => {
      const [argumentName, value] =
        item.split('=');
      return [
        argumentName === '--structure'
          ? value
          : acc[0],
        argumentName === '--output'
          ? value
          : acc[0],
      ];
    },
    ['', '']
  );

  const storyStructure = parse(
    (
      await promises.readFile(structure)
    ).toString()
  );

  const story = await generateStoryTemplate(
    storyStructure
  );

  await promises.writeFile(output, story);
})();
