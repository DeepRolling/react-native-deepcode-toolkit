import { DependencyList, MutableRefObject, useEffect, useRef } from 'react';
import { autorun } from 'mobx';

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

export function useAutoRunWithFirstTimeRef(
  action: (ref: MutableRefObject<boolean>) => void,
  deps?: DependencyList
) {
  let firstTimeRef = useRef<boolean>(true);
  useEffect(
    () => {
      let persistenceDataDisposer = autorun(() => {
        action(firstTimeRef);
      });
      return () => {
        persistenceDataDisposer();
      };
    },
    deps === undefined ? [] : deps //eslint-disable-line react-hooks/exhaustive-deps
  );
}
