import { Flex, Text } from "@fluentui/react-northstar";
import { diff, RGBColor, rgb_to_lab } from "color-diff";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useAppContext } from "../../context/app-context";
import { getBackgroundColorRgb } from "../header/parse-color";

export const ColorDisplay: React.FC<{ colorString: string }> = ({ colorString }) => {
  const ref = useRef<HTMLDivElement>();
  const { color, sensitivity } = useAppContext();
  const [currentColor, setCurrentColor] = useState<RGBColor | undefined>()

  useEffect(() => {
    if (ref.current) {
      const currentColorValue = getBackgroundColorRgb(ref.current);
      setCurrentColor(currentColorValue)
    }
  }, [])

  const diffValue = useMemo(() => {
    if (color && currentColor) {
      const normalizedDiff = diff(
        rgb_to_lab(color),
        rgb_to_lab(currentColor)
      ) / 100

      const value = (
        Math.pow(
          1 - normalizedDiff,
          sensitivity * 10
        )
      )

      return value
    }

    return 0
  }, [color, currentColor, sensitivity])

  return (
    <Flex vAlign="center" styles={{ flex: 1, borderWidth: '3px', borderStyle: 'solid', minWidth: '10rem' }} style={{ borderColor: `rgba(0,255,0,${diffValue})` }} gap="gap.small" padding="padding.medium">
      <div ref={ref as RefObject<HTMLDivElement>} style={{ width: '1.5rem', height: '1.5rem', borderRadius: '0.25rem', backgroundColor: colorString }}>&nbsp;</div>
      <Text content={colorString} styles={{ fontFamily: 'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;' }} />
    </Flex>
  );
}