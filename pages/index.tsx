import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Provider } from "@fluentui/react-northstar";
import { useAppContext } from '../context/app-context';
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const { theme } = useAppContext()

  return (
    <Provider theme={theme} styles={{ overflow: 'hidden' }}>
      <Flex column styles={{ overflow: 'auto' }}>
        Hello
      </Flex>
    </Provider>
  )
}

export default Home
