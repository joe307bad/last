import { generateStoryTemplate } from '@last/story/gen';
import { promises } from 'fs';
import { parse } from 'yaml';
import { glob } from 'glob';
import * as path from 'path';

const storiesDir = 'stories';

(async () => {
  const [storyNumber] = process.argv.reduce(
    (acc, item) => {
      const [argumentName, value] =
        item.split('=');
      return [
        argumentName === '--storyNo'
          ? value
          : acc[0],
      ];
    },
    ['']
  );
  const storyDir = glob.sync(
    path.resolve(`stories/${storyNumber}-*`)
  );

  const storyStructure = parse(
    (
      await promises.readFile(
        `${storyDir}/structure.yml`
      )
    ).toString()
  );

  const story = await generateStoryTemplate(
    storyStructure
  );

  await promises.writeFile(
    `${storyDir}/story_${Date.now()}.yml`,
    story
  );
})();
