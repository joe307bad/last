import React from 'react';
import {ThemeProvider} from "theme-ui"
import Layout from "./Layout"
import Theme from "./Theme"

const Wrapper = (props) => {
  return (
    <ThemeProvider theme={Theme}>
      <Layout {...props} />
    </ThemeProvider>
  )
}

export default Wrapper
