import '@/styles/globals.css'
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('colorScheme') as ColorScheme || 'dark'
    }
    return 'dark';
  })
  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
  }, [colorScheme])
  const toggleColorScheme =  (value?: ColorScheme) => {
    const newColorScheme = value || (colorScheme === 'dark' ? 'light':'dark')
    setColorScheme(newColorScheme);
    localStorage.setItem('colorScheme', colorScheme)
  };
  return (
  <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider theme={{ colorScheme, primaryColor:"green" }}  withNormalizeCSS withGlobalStyles>
    <Notifications position='top-right' zIndex={2077}></Notifications>
    <Component {...pageProps} />
    </MantineProvider>
  </ColorSchemeProvider>
  );
  
  
}
