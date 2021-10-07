import { Flex, ICSSInJSStyle, Input, InputProps, Ref } from "@fluentui/react-northstar";
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppContext } from "../../context/app-context";
import { parseColor } from "./parse-color";


export const ColorInput: React.FC = () => {

  const { setColor, theme } = useAppContext()
  const boxRef = useRef<HTMLDivElement>();
  const [boxHeight, setBoxHeight] = useState(1);

  const inputStyle = useMemo((): ICSSInJSStyle => {
    return {
      padding: '1.5rem 3rem',
      borderRadius: '0.5rem',
      '& input': {
        fontSize: theme.siteVariables.fontSizes.large,
        padding: '1.5rem 3rem'
      }
    }
  }, [theme.siteVariables.fontSizes.large])

  const colorDisplayBoxStyle = useMemo((): ICSSInJSStyle => {
    return {
      width: `${boxHeight}px`,
      margin: '1.5rem 3rem',
      border: `3px solid ${theme.siteVariables.colorScheme.default.foreground}`,
      borderRadius: '0.5rem',
    }
  }, [boxHeight, theme.siteVariables.colorScheme.default.foreground])

  useEffect(() => {
    if (boxRef.current) {
      setBoxHeight(boxRef.current.clientHeight)
    }
  }, [])

  const onChange = useCallback((_, data?: InputProps) => {
    if (boxRef.current) {
      setColor(parseColor(boxRef.current, data?.value?.toString()))
    }
  }, [setColor])

  return (
    <Flex hAlign="center" vAlign="stretch" styles={{ padding: '1.5rem 3rem', borderRadius: '0.5rem', }}>
      <Input styles={inputStyle} placeholder="color here" autoComplete="off" onChange={onChange} />
      <Ref innerRef={boxRef as RefObject<HTMLDivElement>}>
        <Flex styles={colorDisplayBoxStyle} />
      </Ref>
    </Flex>
  )
}