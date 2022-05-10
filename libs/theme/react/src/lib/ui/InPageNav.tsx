import React from 'react';
import Theme from '../layout/Theme';
import { useThemeUI } from 'theme-ui';

const Navigation = [
  'Project Overview',
  'Development',
  'Assets',
  'Tables',
];

const NavItem = ({ navItem, i }) => {
  const { theme } = useThemeUI();

  const fontWeight = (
    i === 0
      ? 700
      : 0
  ) ;
  const borderBottomColor = (
    i === 0
      ? theme.colors.primary
      : theme.colors.secondary
  ) as string;
  const borderBottomWidth = (
    i === 0
      ? 5
      : 2
  );
  return (
    <li
      style={{
        fontWeight,
        borderBottomColor,
        borderBottomWidth,
        paddingBottom: 5,
      }}
    >
      {navItem}
    </li>
  );
};

const InPageNav = () => {
  const { theme } = useThemeUI();
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colors
          ?.background as string,
      }}
    >
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'inline-flex',
          gap: 20,
          width: '100%',
          borderBottomColor: theme.colors
            .secondary as string,
          paddingBottom: 10,
          paddingTop: 20,
          marginBottom: 10,
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
    </div>
  );
};

export default InPageNav;
