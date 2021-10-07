import { Flex, Header, ICSSInJSStyle, Ref, ShorthandCollection, Table, TableProps, TableRowProps, teamsDarkV2Theme, teamsHighContrastTheme, teamsV2Theme } from "@fluentui/react-northstar"
import React, { useEffect, useMemo, useRef } from "react"
import { useAppContext } from "../../context/app-context"
import { ColorDisplay } from "../color-display/color-display"
import { ThemePreparedTyped } from "../helpers/fluent-theme-type"

type ColorTableProps = {
  scheme: keyof ThemePreparedTyped['siteVariables']['colorScheme']
}

export const ColorTable: React.FC<ColorTableProps> = ({ scheme }) => {

  const themeHeaderRef = useRef<HTMLHeadingElement>(null)
  const [headerTop, setHeaderTop] = React.useState(0);

  const header = useMemo(() => ({
    items: [
      { key: 'name', content: 'Color name' },
      { key: 'light', content: 'Light theme' },
      { key: 'dark', content: 'Dark theme' },
      { key: 'hc', content: 'High contrast theme' },
    ],
    styles: {
      position: 'sticky',
      top: `${headerTop - 1}px`,
      zIndex: 3
    }
  }), [headerTop]);

  useEffect(() => {
    if (themeHeaderRef.current) {
      setHeaderTop(themeHeaderRef.current.clientHeight)
    }
  }, [])

  const rows = useMemo(() => {

    const result: ShorthandCollection<TableRowProps> = []

    for (const color of Object.keys(teamsV2Theme.siteVariables.colorScheme[scheme])) {
      result.push({
        key: color,
        items: [
          {
            key: 'name',
            content: color,
            styles: {
              flexDirection: 'column'
            }
          },
          {
            key: 'light',
            content: <ColorDisplay colorString={teamsV2Theme.siteVariables.colorScheme[scheme][color]} />,
            styles: {
              flexDirection: 'column'
            }
          },
          {
            key: 'dark',
            content: <ColorDisplay colorString={teamsDarkV2Theme.siteVariables.colorScheme[scheme][color]} />,
            styles: {
              flexDirection: 'column'
            }
          },
          {
            key: 'hc',
            content: <ColorDisplay colorString={teamsHighContrastTheme.siteVariables.colorScheme[scheme][color]} />,
            styles: {
              flexDirection: 'column'
            }
          },
        ]
      })
    }

    return result
  }, [scheme]);

  const { theme } = useAppContext()

  const headerStyle = useMemo((): ICSSInJSStyle => {
    return {
      position: 'sticky',
      top: '-1px',
      margin: 0,
      padding: '1rem',
      zIndex: 2,
      backgroundColor: theme.siteVariables.colorScheme.default.background,
    }
  }, [theme.siteVariables.colorScheme.default.background])

  return (
    <Flex column styles={{ padding: '1.5rem 3rem' }}>
      <Ref innerRef={themeHeaderRef as React.RefObject<HTMLHeadingElement>}>
        <Header as="h2" content={`Scheme - ${scheme}`} styles={headerStyle} />
      </Ref>
      <Table header={header} rows={rows} />
    </Flex>
  )
}