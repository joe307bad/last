import { AppProps } from 'next/app';
import './styles.css';
import { ThemeProvider } from 'theme-ui';
import { Layout, Theme } from '~last/theme/react';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import nav from '../nav.json';

function getAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}

const H1 = ({ children }) => {
  const anchor = getAnchor(children);
  const link = `#${anchor}`;
  return (
    <h1 id={anchor}>
      <a href={link} className="anchor-link">
        {children}
      </a>
    </h1>
  );
};

const H2 = ({ children }) => {
  const anchor = getAnchor(children);
  const link = `#${anchor}`;
  return (
    <h2
      style={{ paddingTop: 80, marginTop: -80 }}
      id={anchor}
    >
      <a href={link} className="anchor-link">
        {children}
      </a>
    </h2>
  );
};

const components = {
  h1: H1,
  h2: H2,
};

function CustomApp({
  Component,
  pageProps,
}: AppProps) {
  // TODO it would be nice to get the in page nav
  // items here so we can populate the left sidebar
  // nav with the in page nav items
  //
  // TODO it may be easier to start a new next.js
  // site that follows this tutorial https://dawchihliou.github.io/articles/build-better-nextjs-static-sites-with-mdx-and-contentlayer
  // in that tutorial is describes "computed fields" that havbe
  // access to the raw body of the content, which could be
  // used to build a table of contents
  //
  // this also needs more investigation, this seems like great
  // practices for building a blog https://github.com/alexcarpenter/alexcarpenter-next
  return (
    <MDXProvider components={components}>
      <ThemeProvider theme={Theme}>
        <Layout nav={nav} {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </MDXProvider>
  );
}

export default CustomApp;
