import React from 'react';
import Head from 'next/head';
import config from './blog.config';

const DocHead = (props) => (
  <>
    <Head>
      <title>{props.title}</title>
      <link
        rel="icon"
        type="image/x-icon"
        href="/favicon.ico"
      />
      <link rel="canonical" href={props.url} />

      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700;800&display=swap"
        rel="stylesheet"
      />
      <meta
        name="description"
        content={props.description}
      />
      <meta
        property="og:title"
        content={props.title}
      />
      <meta
        property="og:description"
        content={props.description}
      />
      {props.imageUrl && (
        <meta
          property="og:image"
          content={props.imageUrl}
        />
      )}
      {props.imageAlt && (
        <meta
          property="og:image:alt"
          content={props.imageAlt}
        />
      )}
      <meta
        property="og:url"
        content={props.url}
      />
      <meta
        name="twitter:card"
        content={
          props.imageUrl
            ? 'summary_large_image'
            : 'summary'
        }
      />
      <meta
        name="twitter:site"
        content={config.twitter}
      />
      <meta
        name="twitter:creator"
        content={config.twitter}
      />
      <meta
        name="twitter:title"
        content={props.title}
      />
      <meta
        name="twitter:description"
        content={props.description}
      />
      {props.imageUrl && (
        <meta
          property="twitter:image"
          content={props.imageUrl}
        />
      )}
      {props.imageAlt && (
        <meta
          property="twitter:image:alt"
          content={props.imageAlt}
        />
      )}
    </Head>
  </>
);

export default DocHead;
