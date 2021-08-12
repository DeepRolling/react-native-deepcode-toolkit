import { useEffect } from 'react';
// @ts-ignore
import Orientation from 'react-native-orientation';
// import {
//   calculateDeviceWidthAndHeight,
//   changeToLandscape,
//   changeToPortrait,
// } from './BaseFit';
//
// /***
//  * 用于当屏幕方向改变之后baseFit重新计算之后的callback
//  */
// type AfterScreenChangeCallback = (isPortrait: boolean) => void;
//
// /**
//  * 屏幕方向改变之后的回调集合，每次屏幕改变都会遍历该集合按顺序回调并销毁一次性callback
//  */
// export const afterScreenChangeHookArrayDisposable: Map<
//   string,
//   AfterScreenChangeCallback
// > = new Map<string, AfterScreenChangeCallback>();
//
// /**
//  * 屏幕方向改变之后的回调集合，非一次性
//  */
// export const afterScreenChangeHookArray: Map<
//   string,
//   AfterScreenChangeCallback
// > = new Map<string, AfterScreenChangeCallback>();
//
// const _onScreenChange = (orientation: string) => {
//   console.log('screen orientation change : ' + orientation);
//   if (orientation === 'LANDSCAPE') {
//     calculateDeviceWidthAndHeight();
//     changeToLandscape();
//   } else {
//     calculateDeviceWidthAndHeight();
//     changeToPortrait();
//   }
//   //traversal each single use hook and remove from array
//   for (let key of afterScreenChangeHookArrayDisposable.keys()) {
//     let singleUseHook = afterScreenChangeHookArrayDisposable.get(key);
//     singleUseHook?.(orientation !== 'LANDSCAPE');
//     afterScreenChangeHookArrayDisposable.delete(key);
//   }
//   for (let key of afterScreenChangeHookArray.keys()) {
//     let singleUseHook = afterScreenChangeHookArray.get(key);
//     singleUseHook?.(orientation !== 'LANDSCAPE');
//   }
// };
//
// export function useScreenOrientationChange() {
//   useEffect(() => {
//     const initializeOrientationListener = () => {
//       Orientation.addOrientationListener(_onScreenChange);
//     };
//     const removeOrientationListener = () => {
//       // Remember to remove listener
//       Orientation.removeOrientationListener(_onScreenChange);
//     };
//     initializeOrientationListener();
//     return () => {
//       removeOrientationListener();
//     };
//   }, []);
// }

export function useScreenLocker(portrait: boolean, afterLock?: () => void) {
  useEffect(() => {
    // this locks the view to Portrait Mode
    if (portrait) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    afterLock?.();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
}
