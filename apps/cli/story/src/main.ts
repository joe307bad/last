import { generateStory } from '@last/story/gen';
import { promises } from 'fs';

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
  const story = await generateStory(
    structure,
    output
  );

  await promises.writeFile(output, story);
})();
