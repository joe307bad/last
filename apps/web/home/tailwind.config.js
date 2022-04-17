const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

const { join } = require('path');
module.exports = {
  content: [
    join(__dirname, 'app/**/!(*.stories|*.spec).{tsx,ts,html}'),
    // ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
