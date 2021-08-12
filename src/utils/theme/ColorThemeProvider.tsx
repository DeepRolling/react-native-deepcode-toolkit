import React, { createContext, useMemo, useState } from 'react';
import { customThemeStyleSheet, ThemeProfile } from '../theme/theme';

export const ColorThemeContext = createContext<
  | {
      colorTheme: ThemeProfile;
      setColors: any;
    }
  | undefined
>(undefined);

export const ColorThemeProvider = function (props: { children: any }) {
  const [colorTheme, setColors] = useState<ThemeProfile>(
    customThemeStyleSheet.lightNormal
  ); //setting light theme as default

  const value = useMemo(
    () => ({
      colorTheme,
      setColors,
    }),
    [colorTheme, setColors]
  );

  return (
    <ColorThemeContext.Provider value={value}>
      {props.children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => React.useContext(ColorThemeContext)!!;