import { useRouter } from 'next/router';
import { Box, useThemeUI } from 'theme-ui';
import React from 'react';

const Technical = [
  'Overview',
  'Dev Log',
  'Documentation',
  'Architecture',
];

const Game = ['Concepts'];

const NavItem = ({
  i,
  navItem,
  noActive = false,
}) => {
  const { theme } = useThemeUI();
  const borderLeftColor = (
    i === 0 && !noActive
      ? theme.colors.primary
      : theme.colors.background
  ) as string;
  const fontWeight =
    i === 0 && !noActive ? 800 : 0;
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
    <>
      <h4
        style={{
          textTransform: 'uppercase',
          fontWeight: '900',
          color: '#a0a0ca',
          paddingTop: 20,
        }}
      >
        Technical
      </h4>
      <ul
        style={{
          maxWidth: 200,
          listStyle: 'none',
          padding: 0,
          margin: 0,
          marginRight: 20,
        }}
      >
        {Technical.map((navItem, i) => (
          <NavItem
            navItem={navItem}
            key={i}
            i={i}
          />
        ))}
      </ul>
      <h4
        style={{
          textTransform: 'uppercase',
          fontWeight: '900',
          color: '#a0a0ca',
          paddingTop: 20,
        }}
      >
        Game
      </h4>
      <ul
        style={{
          maxWidth: 200,
          listStyle: 'none',
          padding: 0,
          margin: 0,
          marginRight: 20,
        }}
      >
        {Game.map((navItem, i) => (
          <NavItem
            noActive={true}
            navItem={navItem}
            key={i}
            i={i}
          />
        ))}
      </ul>
      <div
        style={{
          display: 'flex',
          gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50
        }}
      >
        <i
          style={{ fontSize: 20 }}
          className="fa-brands fa-github"
        ></i>
        <i
          style={{ fontSize: 20 }}
          className="fa-brands fa-twitter"
        ></i>
      </div>
    </>
  );
};

export default Nav;
