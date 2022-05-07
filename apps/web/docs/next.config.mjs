import remarkGfm from 'remark-gfm'
import nextMDX from '@next/mdx'


const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});
export default withMDX({
  // Append the default value with md extensions
  pageExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'md',
    'mdx',
  ],
});
