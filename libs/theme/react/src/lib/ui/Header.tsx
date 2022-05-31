import React from 'react';
import { Box, Input, useThemeUI, useColorMode } from 'theme-ui';
import { Assets } from '~last/shared/assets';

const Header = (props) => {
  const { theme } = useThemeUI();
  const [mode, setMode] = useColorMode()
  const toggleThemeMode = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
  }
  return (
    <Box
      sx={{
        p: 10,
        backgroundColor: theme.colors.primary,
        borderBottom: `2px solid ${theme.colors.secondary}`,
      }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'flex',
        }}
      >
        <Box style={{ flex: 1 }}>
          <img
            height="100%"
            width={40}
            style={{ display: 'block' }}
            src={Assets.logo}
          />
        </Box>
        <i
          style={{
            fontSize: 25,
            alignItems: 'center',
            display: 'flex',
            color: theme.colors.background,
            paddingRight: 10,
            cursor: "pointer"
          }}
          onClick={toggleThemeMode}
          className="fa-solid fa-sun"
        ></i>
        <Input
          sx={{
            width: 200,
            backgroundColor: 'white',
            border: '2px solid #31313114',
          }}
          defaultValue="Search"
        />
      </Box>
    </Box>
  );
};

export default Header;
