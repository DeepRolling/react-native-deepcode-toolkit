import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import React from 'react';
// @ts-ignore
import customIconConfig from '@assets/selection.json';
const Icon: any = createIconSetFromIcoMoon(customIconConfig);



export default Icon;

export const Button = Icon.Button;
export const TabBarItem = Icon.TabBarItem;
export const TabBarItemIOS = Icon.TabBarItemIOS;
export const ToolbarAndroid = Icon.ToolbarAndroid;
export const getImageSource = Icon.getImageSource;

