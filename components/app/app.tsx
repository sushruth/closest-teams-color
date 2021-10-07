import { Flex, Provider, ThemePrepared } from "@fluentui/react-northstar"
import React from "react"
import { useAppContext } from "../../context/app-context"
import { ColorTable } from "../color-table/color-table"
import { Header } from "../header/header"

export const App: React.FC = () => {
  const { theme } = useAppContext()

  return (
    <Provider theme={theme as unknown as ThemePrepared} styles={{ overflow: 'hidden', flex: 1 }}>
      <Flex column styles={{ height: '100%' }}>
        <Header />
        <Flex column styles={{ position: 'relative', overflow: 'auto' }}>
          <ColorTable scheme="default" />
          <ColorTable scheme="brand" />
        </Flex>
      </Flex>
    </Provider>
  )
}