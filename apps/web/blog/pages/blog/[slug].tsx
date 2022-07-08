import { allBlogs } from '~last/blog/contentlayer';

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.date}</div>

      <div
        dangerouslySetInnerHTML={{
          __html: post.body.html,
        }}
      />
    </article>
  );
}

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

// Statically fetch post by slug
export async function getStaticProps({ params }) {
  const post = allBlogs.find(
    (post) => post.slug === params?.slug
  );

  return { props: { post } };
}
