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
