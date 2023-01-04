import React from 'react'
import Navbar from './Navbar'
import Navigation from './Navigation'
import Footer from './Footer'
import { Box, Container } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'

const LayoutComponent = ({ children, user, handleLogout }) => {

  const theme = createTheme({
    palette: {
      mode: 'light',
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Box className='layout-component'>
      <CssBaseline />
        <Navigation user={user} logoutUser={handleLogout} />
        <Box component='main' className='main-component-wrapper'>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default LayoutComponent