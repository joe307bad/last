import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Wrapper } from '~last/theme/react';

function CustomApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <Wrapper description={"Description"} >
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default CustomApp;
