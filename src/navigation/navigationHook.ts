import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { navigationHelper } from './navigationHelper';
import type { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { useNavigation, useRoute } from '@react-navigation/native';

export function useBackAction(action: () => void) {
  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      navigationHelper.backAction
    );
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        navigationHelper.backAction
      );
    };
  }, []);
}

export function useScreenFocus(actions: (() => void)[]) {
  const navigationWithoutWrapper = useStackNavigation();
  useEffect(() => {
    const disposerArray: (() => void)[] = [];
    for (let action of actions) {
      const eachDisposer = navigationWithoutWrapper.addListener(
        'focus',
        action
      );
      disposerArray.push(eachDisposer);
    }
    return () => {
      for (let disposerArrayElement of disposerArray) {
        disposerArrayElement();
      }
    };
  }, [navigationWithoutWrapper]); //eslint-disable-line react-hooks/exhaustive-deps
}

export function useScreenBlur(actions: (() => void)[]) {
  const navigationWithoutWrapper = useStackNavigation();
  useEffect(() => {
    const disposerArray: (() => void)[] = [];
    for (let action of actions) {
      const eachDisposer = navigationWithoutWrapper.addListener(
        'blur',
        action
      );
      disposerArray.push(eachDisposer);
    }
    return () => {
      for (let disposerArrayElement of disposerArray) {
        disposerArrayElement();
      }
    };
  }, [navigationWithoutWrapper]); //eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * this function fix "push is not exist on navigation object "
 * see https://github.com/react-navigation/hooks/issues/42
 * but when you use this hook , don't reference this object to a const (leak memory!)
 */
export const useStackNavigation = () =>
  useNavigation<StackNavigationProp<any>>();

/**
 * the handy function to use route params
 */
export const useRouteParams = () => useRoute<any>().params;
