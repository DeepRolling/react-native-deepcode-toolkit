import { DependencyList, useEffect } from 'react';
import {autorun} from 'mobx';

export function useAutoRun(action: () => void, deps?: DependencyList) {
  useEffect(
    () => {
      let persistenceDataDisposer = autorun(() => {
        action();
      });
      return () => {
        persistenceDataDisposer();
      };
    },
    deps === undefined ? [] : deps //eslint-disable-line react-hooks/exhaustive-deps
  );
}
