import {
  XUpdate,
  UpdateArgs,
  InitArgs,
  // @ts-ignore
} from 'dianvo-native-android-xupdate/src';
import React, { useEffect, useState } from 'react';
import { customParser, queryHasUpdate } from './updateParser';

export type XUpdateInitialParams = {
  applicationId: string; //android applicationId config in  build.gradle
  versionName: string; //android versionName(1.0.0) config in  build.gradle
  updateServiceAddress: string; //address of machine deploy xupdate service (such as 'http://192.168.1.197:1111/')
  updateArgs?: UpdateArgs; //see xupdate document , if not supply , use default value
};

export const xupdateInitParamsRef: React.MutableRefObject<XUpdateInitialParams | null> =
  React.createRef<XUpdateInitialParams>();

const xupdateInitSuccessfulRef: React.MutableRefObject<boolean | null> =
  React.createRef<boolean>();

/**
 * determine if xupdate init successful,
 * should always check this tag before call XUpdate.update function
 */
export function isXupdateInitSuccessful() {
  return xupdateInitSuccessfulRef.current === null
    ? false
    : xupdateInitSuccessfulRef.current;
}

const xupdateCheckingManualRef: React.MutableRefObject<boolean | null> =
  React.createRef<boolean>();

/**
 * before click update button manually , should call this function
 * so if there not have available update , you can use notAvailableUpdateCallback to deal with this circumstance
 */
export function beforeClickXupdateButtonManually() {
  xupdateCheckingManualRef.current = true;
}

/**
 * handy hook to determine if have available update
 * @param isAndroid
 */
export function useXupdateAvailableUpdate(
  isAndroid: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (isAndroid) {
      queryHasUpdate()
        .then((serviceHasUpdate) => {
          setHasUpdate(serviceHasUpdate);
        })
        .catch((message) => {
          console.log('query if have update fail');
        });
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  return [hasUpdate, setHasUpdate];
}

/**
 * use this hook to initialize xupdate
 * @param isAndroid only android platform can use xupdate
 * @param params see xupdate document
 * @param notAvailableUpdateCallback trigger when service not have available update and current check-mode is manual check
 * you can open manual-check by beforeClickXupdateButtonManually function
 * @param takeOverInitializeCallback if you pass this callback , you need manager initialize state by your self
 * so you can gain full control of initialize state
 */
export function useXupdateInitializer(
  isAndroid: boolean,
  params: XUpdateInitialParams,
  notAvailableUpdateCallback?: (message: string) => void,
  takeOverInitializeCallback?: (success: boolean) => void
) {
  useEffect(() => {
    function initXUpdate() {
      ///?????????????????????
      let args = new InitArgs();
      ///??????????????????
      args.debug = true;
      //?????????post??????
      args.isPost = true;
      ///post?????????????????????json
      args.isPostJson = false;
      ///????????????wifi?????????????????????
      args.isWifiOnly = false;
      ///????????????????????????
      args.isAutoMode = false;
      ///????????????????????????????????????????????????root??????
      args.supportSilentInstall = false;
      ///??????????????????????????????????????????????????????????????????????????????????????????????????????
      args.enableRetry = true;

      ///?????????SDK
      XUpdate.init(args)
        .then((result: any) => {
          console.log('init successful : ' + JSON.stringify(result));
          if (takeOverInitializeCallback === undefined) {
            xupdateInitSuccessfulRef.current = true;
          } else {
            takeOverInitializeCallback(true);
          }
        })
        .catch((error: any) => {
          console.log('init error' + error);
          if (takeOverInitializeCallback === undefined) {
            xupdateInitSuccessfulRef.current = false;
          } else {
            takeOverInitializeCallback(false);
          }
        });

      //?????????????????????
      XUpdate.setCustomParser({ parseJson: customParser });
      //??????????????????
      XUpdate.addErrorListener((result: any) => {
        console.log('xupdate error : ' + JSON.stringify(result));
        if (
          result.code &&
          result.code === 2004 &&
          xupdateCheckingManualRef.current === true
        ) {
          result.message && notAvailableUpdateCallback?.(result.message);
          xupdateCheckingManualRef.current = false;
        }
      });
    }
    if (isAndroid) {
      //inject params
      xupdateInitParamsRef.current = params;
      //initialize update
      initXUpdate();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
}
