const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

const { join } = require('path');
console.log("tailwind dir", join(__dirname, "app"))
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
