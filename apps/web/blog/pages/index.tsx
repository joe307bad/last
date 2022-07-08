import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allPosts } from '../.contentlayer/generated';
import { pick } from "@contentlayer/client";

export function getStaticProps() {
  const posts =  allPosts
    .map((post) => pick(post, ['slug', 'title', 'summary', 'date']))
    .sort(
      (a, b) =>
        Number(new Date(b.date)) - Number(new Date(a.date))
    );

  return { props: { posts } };
}

function PostCard(post) {
  return (
    <div>
      <time dateTime={post.date} >
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2>
        <Link href={`/blog/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
    </div>
  )
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      <h1>Contentlayer Blog Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
