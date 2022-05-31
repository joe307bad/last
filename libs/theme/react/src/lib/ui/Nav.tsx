import { useRouter } from 'next/router';
import { Box, useThemeUI } from 'theme-ui';
import Link from 'next/link';
import React from 'react';

const NavItem = ({ i, navItem }) => {
  const { asPath } = useRouter();
  const { theme } = useThemeUI();

  const active = asPath === navItem.link;

  const borderLeftColor = (
    active
      ? theme.colors.primary
      : theme.colors.background
  ) as string;
  const fontWeight = active ? 800 : 0;

  return (
    <li key={i}>
      <Box
        sx={{
          display: 'block',
          paddingLeft: 20,
          marginTop: 20,
          marginBottom: 20,
          borderLeftWidth: 5,
          fontWeight,
          borderLeftColor,
        }}
      >
        <Link href={navItem.link}>
          {navItem.label}
        </Link>
      </Box>
    </li>
  );
};

const Nav = (props) => {
  const {theme} = useThemeUI();
  return (
    <>
      {Object.keys(props.nav).map(
        (navCategory, i) => (
          <div key={i}>
            <h4
              style={{
                textTransform: 'uppercase',
                fontWeight: '900',
                color: theme.colors.primary,
                paddingTop: 20,
              }}
            >
              {navCategory}
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
              {Object.keys(
                props.nav[navCategory]
              ).map((navItem, i) => (
                <NavItem
                  navItem={
                    props.nav[navCategory][
                      navItem
                    ]
                  }
                  key={i}
                  i={i}
                />
              ))}
            </ul>
          </div>
        )
      )}
      <div
        style={{
          display: 'flex',
          gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
        }}
      >
        <a
          href={
            'https://github.com/joe307bad/last'
          }
        >
          <i
            style={{ fontSize: 20 }}
            className="fa-brands fa-github"
          >
          </i>
        </a>
        <a
          href={
            'https://twitter.com/joe307bad'
          }
        >
          <i
            style={{ fontSize: 20 }}
            className="fa-brands fa-twitter"
          >
          </i>
        </a>
      </div>
    </>
  );
};

export default Nav;
