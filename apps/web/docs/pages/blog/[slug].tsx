import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { serialize } from 'next-mdx-remote/serialize';
import {getAllPosts, getPost, PostFrontMatter} from "../../utils/posts";

interface ContextProps extends ParsedUrlQuery {
  slug: string;
}

type PostProps = PostFrontMatter & {
  mdx: any;
};

const Post: React.FC<PostProps> = ({ slug, date, title, mdx }) => {
  return (
    <>
      <h1>Slug rgerg</h1>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((file) => {
      return {
        params: { slug: file.slug },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as ContextProps;
  //const { frontMatter, content } = getPost(`${slug}.mdx`);
  // const mdxContent = await serialize(content, {
  //   mdxOptions: {
  //     remarkPlugins: [],
  //     rehypePlugins: [],
  //   },
  //   scope: frontMatter,
  // });
  return {
    props: {
      // ...frontMatter,
      // mdx: mdxContent,
    },
  };
};

export default Post;
