import type { NextPage } from 'next';
import { App } from "../components/app/app";
import { AppContextProvider } from '../context/app-context';

const Home: NextPage = () => {

  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )
}

export default Home
