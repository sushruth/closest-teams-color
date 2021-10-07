import { teamsDarkV2Theme, teamsHighContrastTheme, teamsV2Theme } from "@fluentui/react-northstar";
import { diff, RGBColor, rgb_to_lab } from "color-diff";
import { useEffect, useState } from "react";
import { ThemePreparedTyped } from "../components/helpers/fluent-theme-type";
import { createPassThroughContext } from "./helpers/create-passthrough-context";

function useAppContextHook() {
  const [color, setColor] = useState<RGBColor>()
  const [sensitivity, setSensitivity] = useState(4);

  const [theme, setTheme] = useState<ThemePreparedTyped>(teamsDarkV2Theme as unknown as ThemePreparedTyped);

  useEffect(() => {
    const highContrastMode = matchMedia('(forced-colors: active)');
    const darkMode = matchMedia('(prefers-color-scheme: dark)')
    if (highContrastMode.matches) {
      setTheme(teamsHighContrastTheme as unknown as ThemePreparedTyped)
    } else if (darkMode.matches) {
      setTheme(teamsDarkV2Theme as unknown as ThemePreparedTyped)
    } else {
      setTheme(teamsV2Theme as unknown as ThemePreparedTyped)
    }
  }, [])

  return {
    color,
    sensitivity,
    theme,
    setColor,
    setSensitivity,
    setTheme,
  }
}

export const [AppContextProvider, useAppContext] = createPassThroughContext(useAppContextHook)