import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import { fromHtml } from 'hast-util-from-html';

import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

const computedFields: ComputedFields = {
  headings: {
    type: 'json',
    resolve: (doc) => {
      debugger;
      const tree = fromHtml(doc.body.html, {
        fragment: true,
      });
      // TODO from here we should probably use
      // https://github.com/syntax-tree/hast-util-heading to
      // to check which nodes are headings and
      // organize them as a hierarchical json object
      return { 'hey there': 123 };
    },
  },
  readingTime: {
    type: 'json',
    resolve: (doc) => readingTime(doc.body.raw),
  },
  wordCount: {
    type: 'number',
    resolve: (doc) =>
      doc.body.raw.split(/\s+/gu).length,
  },
  tweetIds: {
    type: 'json',
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(
        /<StaticTweet\sid="[0-9]+"\s\/>/g
      );
      const tweetIDs = tweetMatches?.map(
        (tweet) => tweet.match(/[0-9]+/g)[0]
      );
      return tweetIDs ?? [];
    },
  },
  slug: {
    type: 'string',
    resolve: (doc) =>
      doc._raw.sourceFileName.replace(
        /\.mdx$/,
        ''
      ),
  },
};

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/*.mdx',
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: {
      type: 'string',
      required: true,
    },
    summary: { type: 'string', required: true },
    image: { type: 'string', required: true },
  },
  computedFields,
}));

const Newsletter = defineDocumentType(() => ({
  name: 'Newsletter',
  filePathPattern: 'newsletter/*.mdx',
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: {
      type: 'string',
      required: true,
    },
    summary: { type: 'string', required: true },
    image: { type: 'string', required: true },
  },
  computedFields,
}));

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: {
      type: 'string',
      required: true,
    },
    logo: { type: 'string', required: true },
  },
  computedFields,
}));

const OtherPage = defineDocumentType(() => ({
  name: 'OtherPage',
  filePathPattern: '*.mdx',
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
  },
  computedFields,
}));

const contentLayerConfig = makeSource({
  contentDirPath: 'data',
  documentTypes: [
    Blog,
    Newsletter,
    Snippet,
    OtherPage,
  ],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});

export default contentLayerConfig;
