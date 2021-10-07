import { teamsHighContrastTheme, teamsDarkV2Theme, teamsV2Theme } from "@fluentui/react-northstar";
import { Reducer, ReducerAction, useReducer, useState } from "react";
import { createPassThroughContext } from "./helpers/create-passthrough-context";

function useAppContextHook() {
  const [color, setColor] = useState('')
  const [sensitivity, setSensitivity] = useState(0.5);
  const [theme, setTheme] = useState(() => {
    const highContrastMode = matchMedia('(forced-colors: active)');
    const darkMode = matchMedia('(prefers-color-scheme: dark)')
    if (highContrastMode.matches) {
      return teamsHighContrastTheme
    }
    if (darkMode.matches) {
      return teamsDarkV2Theme
    }
    return teamsV2Theme
  })

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