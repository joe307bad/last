import React from 'react';
import {
  Box,
  Heading,
  useThemeUI,
} from 'theme-ui';
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
        sx={{ maxWidth: 1000, margin: '0 auto' }}
      >
        <img
          height={30}
          width={30}
          style={{ display: 'block' }}
          src={Assets.logo}
        />
      </Box>
    </Box>
  );
};

export default Header;
