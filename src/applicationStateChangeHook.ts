import { AppState, AppStateStatus } from 'react-native';
import { DependencyList, useEffect, useRef, useState } from 'react';

/**
 * hold all listener for application state change listening
 */
export const appStateChangeHookArray: Map<
  string,
  (foreground: boolean) => void
> = new Map<string, (_: boolean) => void>();

/**
 * use this hooks to listen application switch between foreground and background
 * @param reasonKey why you need subscribe the state of application change
 * @param callback the action you want to execute when application state change
 * @param deps extra dependencies
 */
export function useAppForegroundAndBackgroundChangeListener(
  reasonKey: string,
  callback: (foreground: boolean) => void,
  deps?: DependencyList
) {
  useEffect(
    () => {
      appStateChangeHookArray.set(reasonKey, (foreground) => {
        callback(foreground);
      });
      return () => {
        appStateChangeHookArray.delete(reasonKey);
      };
    },
    deps === undefined ? [callback] : deps.concat(callback) //eslint-disable-line react-hooks/exhaustive-deps
  );
}



export function useAppForegroundAndBackgroundChange() {
  const appState = useRef(AppState.currentState);
  useState(appState.current);
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  /**
   * 处理app前后台切换
   * @param nextAppState
   */
  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      //represent app come to foreground
      for (let key of appStateChangeHookArray.keys()) {
        let appStateHook = appStateChangeHookArray.get(key);
        if (appStateHook) {
          console.log(
            `find registered app state listener (${key}) , trigger it with value true(come to foreground)`
          );
          appStateHook(true);
        }
      }
    } else {
      //represent app come to background , at this time application maybe have a chance to be killed
      for (let key of appStateChangeHookArray.keys()) {
        let appStateHook = appStateChangeHookArray.get(key);
        if (appStateHook) {
          console.log(
            `find registered app state listener (${key}) , trigger it with value false(come to background)`
          );
          appStateHook(false);
        }
      }
    }
    appState.current = nextAppState;
  };
}
