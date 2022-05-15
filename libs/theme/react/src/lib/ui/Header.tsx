import React from 'react';
import { Box, Input, useThemeUI } from 'theme-ui';
import { Assets } from '~last/shared/assets';

const Header = (props) => {
  const { theme } = useThemeUI();
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
        <Input
          sx={{
            width: 200,
            alignSelf: 'flex-end',
            backgroundColor: "white",
            border: "2px solid #31313114"
          }}
          defaultValue="Search"
        />
      </Box>
    </Box>
  );
};

export default Header;
