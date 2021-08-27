import React, { useEffect, useState } from 'react';
import type { StateHookReturnType } from '../../utils/type';

type IosUpdateDisplayState = {
  show: boolean;
  version?: string;
  releaseNote?: string;
  trackViewUrl?: string;
};

// 检查app更新
const checkIosUpdate = (iosBundleId: string, iosVersion: string) => {
  return new Promise<IosUpdateDisplayState>((resolve, reject) => {
    fetch(`https://itunes.apple.com/lookup?bundleId=${iosBundleId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.results[0].version, '苹果应用商店版本');
        console.log('设备版本:', iosVersion);
        console.log(
          responseJson.results[0].trackViewUrl,
          '苹果应用商店的下载地址'
        );
        // let version1 = '1.0.0';//for test
        let serviceVersion = responseJson.results[0].version;
        let shouldUpdate = isUpdate(iosVersion, serviceVersion);
        console.log('版本对比', isUpdate);
        if (shouldUpdate) {
          //get release note
          const releaseNote = responseJson.results[0].releaseNotes;
          const trackViewUrl = responseJson.results[0].trackViewUrl;
          resolve({
            show: true,
            version: serviceVersion,
            releaseNote: releaseNote,
            trackViewUrl: trackViewUrl,
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// 版本对比进行更新
const isUpdate = (version1: string, version2: string) => {
  let arr1 = version1.split('.');
  let arr2 = version2.split('.');
  for (let i = 0; i < arr1.length; ) {
    if (arr1[i] == arr2[i]) {
      i++;
    } else {
      return arr1[i] < arr2[i];
    }
  }
  return false;
};

export function useIosUpdateChecker(
  isAndroid: boolean,
  iosBundleId: string,
  iosVersion: string
): StateHookReturnType<IosUpdateDisplayState> {
  const [displayIosUpdateWindow, setDisplayIosUpdateWindow] =
    useState<IosUpdateDisplayState>({
      show: false,
    });

  useEffect(() => {
    if (!isAndroid) {
      checkIosUpdate(iosBundleId, iosVersion)
        .then((result) => {
          setDisplayIosUpdateWindow(result);
        })
        .catch((message) => {
          console.log(message);
        });
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return [displayIosUpdateWindow, setDisplayIosUpdateWindow];
}
