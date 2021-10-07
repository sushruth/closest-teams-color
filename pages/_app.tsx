import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContextProvider } from '../context/app-context'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
