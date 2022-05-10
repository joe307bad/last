import { useRouter } from 'next/router';
import { Box, useThemeUI } from 'theme-ui';
import NavLink from './NavLink';
import React from 'react';

const Navigation = [
  'Overview',
  'Dev Log',
  'Development setup',
  'Documentation',
  'Game Rules',
];

const NavItem = ({ i, navItem }) => {
  const { theme } = useThemeUI();
  const borderLeftColor = (
    i === 0
      ? theme.colors.primary
      : theme.colors.background
  ) as string;
  const fontWeight = i === 0 ? 800 : 0;
  return (
    <li
      key={i}
      style={{
        padding: 5,
        paddingLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        borderLeftWidth: 5,
        fontWeight,
        borderLeftColor,
      }}
    >
      {navItem}
    </li>
  );
};

const Nav = (props) => {
  const router = useRouter();
  return (
    <ul
      style={{
        maxWidth: 200,
        listStyle: 'none',
        padding: 0,
        margin: 0,
        marginRight: 20,
      }}
    >
      {Navigation.map((navItem, i) => (
        <NavItem
          navItem={navItem}
          key={i}
          i={i}
        />
      ))}
    </ul>
  );
};

export default Nav;
