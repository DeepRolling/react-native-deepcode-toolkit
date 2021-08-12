// @ts-ignore
import { XUpdate, UpdateArgs } from 'dianvo-native-android-xupdate/src';
import { xupdateInitParamsRef } from './xupdateHook';

/**
 * backend result name of apk file , use this function generate entire url
 * @param downloadUrl
 */
function generateUpdateApplicationDownloadUrl(downloadUrl: string) {
  return (
    xupdateInitParamsRef.current?.updateServiceAddress +
    'update/apk/' +
    downloadUrl
  );
}

/**
 * request this url for fetch application update information
 */
function generateUpdateApplicationUrl() {
  return (
    xupdateInitParamsRef.current?.updateServiceAddress + 'update/checkVersion'
  );
}

export enum UpdateStateType {
  /**
   * no update version
   */
  NO_NEW_VERSION = 0,

  /**
   * have update version but not is force update
   */
  HAVE_NEW_VERSION = 1,
  /**
   * have update version and this version is force update
   */
  HAVE_NEW_VERSION_FORCE_UPDATE = 2,
}

export const customParser = (json: any) => {
  let appInfo = JSON.parse(json);
  console.log(
    'receive application update information : ' + JSON.stringify(appInfo.data)
  );
  if (
    appInfo.data['updateStatus'] === UpdateStateType.NO_NEW_VERSION.valueOf()
  ) {
    return {
      //必填
      hasUpdate: false,
      versionCode: 999,
      versionName: 'fuck the update',
      updateContent:
        'fuck the update , because he force me fill these content.',
      downloadUrl: 'fuck the update apk',
    };
  }
  //if state have version , represent should update
  let hasUpdate =
    appInfo.data['updateStatus'] !== UpdateStateType.NO_NEW_VERSION.valueOf();
  let isForce =
    appInfo.data['updateStatus'] ===
    UpdateStateType.HAVE_NEW_VERSION_FORCE_UPDATE.valueOf();
  //always disable ignore feature , because if ignore the version ,  check update will not trigger window display
  let isIgnorable = false;
  let versionCode = appInfo.data['versionCode'];
  let versionName = appInfo.data['versionName'];
  let updateContent = appInfo.data['modifyContent'].replace(
    '\\\\r\\\\n',
    '\r\n'
  );
  let downloadUrl = appInfo.data['downloadUrl'];
  let apkSize = appInfo.data['apkSize'];
  let apkMd5 = appInfo.data['apkMd5'];

  return {
    //必填
    hasUpdate: hasUpdate,
    versionCode: versionCode,
    versionName: versionName,
    updateContent: updateContent,
    downloadUrl: generateUpdateApplicationDownloadUrl(downloadUrl),
    //选填
    isForce: isForce,
    isIgnorable: isIgnorable,
    apkSize: apkSize,
    apkMd5: apkMd5,
  };
};

export function queryHasUpdate() {
  const params = xupdateInitParamsRef.current;
  if (params === null) {
    throw Error('not initialize xupdate yet!!!!');
  }
  return new Promise<boolean>((resolve, reject) => {
    const details: { [index: string]: any } = {
      appKey: params.applicationId,
      versionCode: Number(params.versionName.split('.').join('')),
    };
    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(details[key])
      )
      .join('&');
    fetch(generateUpdateApplicationUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(customParser(JSON.stringify(responseJson)).hasUpdate);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function checkCurrentApplicationUpdate() {
  const params = xupdateInitParamsRef.current;
  if (params === null) {
    throw Error('not initialize xupdate yet!!!!');
  }
  let args = new UpdateArgs(generateUpdateApplicationUrl());
  args.isCustomParse =
    params.updateArgs?.isCustomParse === undefined
      ? true
      : params.updateArgs.isCustomParse;
  args.themeColor =
    params.updateArgs?.themeColor === undefined
      ? '#0FB4CF'
      : params.updateArgs.themeColor;
  args.buttonTextColor =
    params.updateArgs?.buttonTextColor === undefined
      ? '#FFFFFF'
      : params.updateArgs.buttonTextColor;
  args.topImageRes =
    params.updateArgs?.topImageRes === undefined
      ? 'xupdate_background_top'
      : params.updateArgs.topImageRes;
  args.widthRatio =
    params.updateArgs?.topImageRes === undefined
      ? 0.8
      : params.updateArgs.topImageRes;
  console.log('xupdate request params : ' + JSON.stringify(args));
  XUpdate.update(args);
}
