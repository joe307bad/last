import React from 'react';
import { useEffect } from 'react';
import { Box, useThemeUI } from 'theme-ui';
import Head from './Head';
import Style from './Style';
import Main from '../ui/Main';
import { useColorMode } from 'theme-ui';
import Header from '../ui/Header';
import Nav from '../ui/Nav';

const Layout = (props) => {
  const [color, setColorMode] = useColorMode();
  const { theme } = useThemeUI();
  useEffect(() => {
    // the theme styles will be applied by theme ui after hydration, so remove the inline style we injected on page load
    document.body.removeAttribute('style');
    setColorMode('lite');
  }, []);

  return (
    <>
      <Head {...props} />
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            width: 1000,
            maxWidth: "100%",
            margin: '0 auto',
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Nav nav={props.nav} />
          </Box>
          <Box
            sx={{
              flex: 1,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                boxShadow:
                  '0px -11px 32px #31313114',
                border: '2px solid #31313114',
                //padding: 60,
                //paddingTop: 50,
                margin: 30,
              }}
            >
              <Main>{props.children}</Main>
            </Box>
          </Box>
        </Box>

        <Style />
      </Box>
    </>
  );
};

export default Layout;
