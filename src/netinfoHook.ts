import { DependencyList, EffectCallback, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export function useConfigNetReachableUrl(url?: string) {
  useEffect(() => {
    NetInfo.configure({
      reachabilityUrl: url === undefined ? 'https://www.baidu.com/' : url,
    });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
}

export function useNetChangeListener(
  callback: (state: NetInfoState) => void,
  deps?: DependencyList
) {
  useEffect(
    () => {
      let unsubscribe: any;
      unsubscribe = NetInfo.addEventListener((state) => {
        callback(state);
      });
      return () => {
        unsubscribe();
      };
    },
    deps === undefined ? [callback] : deps.concat(callback) //eslint-disable-line react-hooks/exhaustive-deps
  );
}
