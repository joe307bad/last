import remarkGfm from 'remark-gfm'
import nextMDX from '@next/mdx'
import remarkDirective from 'remark-directive';
import {toc} from '@joe307bad/rehype-toc';

import {visit} from 'unist-util-visit'
import {h} from 'hastscript'

// This plugin is an example to turn `::note` into divs, passing arbitrary
// attributes.
/** @type {import('unified').Plugin<[], import('mdast').Root>} */
function callOuts() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (node.name !== 'note') return

        const data = node.data || (node.data = {})
        const tagName = node.type === 'textDirective' ? 'span' : 'div'

        data.hName = tagName
        data.hProperties = h(tagName, node.attributes).properties
      }
    })
  }
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkDirective, callOuts],
    rehypePlugins: [[toc, {placeholder: "TABLE_OF_CONTENTS"}]],
    providerImportSource: '@mdx-js/react'
  },
});
export default withMDX({
  pageExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'md',
    'mdx',
  ],
});
