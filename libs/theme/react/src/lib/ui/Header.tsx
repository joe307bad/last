import React from 'react';
import config from '../layout/blog.config';
import { MDXProvider } from '@mdx-js/react';
import { Box, Heading } from 'theme-ui';
import Nav from './Nav';
import { Assets } from '~last/shared/assets';

const Header = (props) => (
  <MDXProvider>
    <Box
      as="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        p: 10
      }}
    >
      <img
        height={30}
        width={30}
        src={Assets.logo}
      />
      <Heading
        sx={{
          fontSize: 3,
        }}
        as="h1"
      >
        {config.title}
      </Heading>
      {/*<Nav />*/}
    </Box>
  </MDXProvider>
);

export default Header;
