import { Flex, Slider, SliderProps } from "@fluentui/react-northstar"
import React, { useCallback } from "react"
import { useAppContext } from "../../context/app-context"
import { ColorInput } from "./color-input"

export const Header = () => {

  const { setSensitivity, sensitivity } = useAppContext()

  const onChange = useCallback((_, data?: SliderProps) => {
    const value = Number(data?.value)
    if (!isNaN(value)) {
      setSensitivity(value)
    }
  }, [setSensitivity])

  return (
    <Flex vAlign="center" hAlign="center">
      <ColorInput />
      <Slider defaultValue={sensitivity} min={1} max={10} onChange={onChange} />
    </Flex>
  )
}