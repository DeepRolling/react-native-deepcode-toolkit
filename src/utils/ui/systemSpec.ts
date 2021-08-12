import { ActionSheetIOS, Linking, Platform } from 'react-native';
import Toast from 'react-native-simple-toast';
import AndroidOpenSettings from 'react-native-android-open-settings';
// @ts-ignore
import DeepToastAndroid from 'react-native-deep-toast-android';

export const isAndroid = Platform.OS === 'android';

export function displayIosNativeActionSheet(
  optionTextArray: string[],
  onClickItem: (buttonIndex: number) => void,
  cancelText?: string
) {
  let totalCancelText = cancelText === undefined ? '取消' : cancelText;
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: [totalCancelText, ...optionTextArray],
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      onClickItem(buttonIndex);
    }
  );
}

export function showToast(message: string, durationSecond?: number) {
  if (typeof message !== 'string') {
    //todo send message to my email
    return;
  }
  if (isAndroid) {
    console.log('each showToast : ' + JSON.stringify(message));
    DeepToastAndroid.hide();
    DeepToastAndroid.show({
      message,
      duration: durationSecond === undefined ? 'short' : 'long',
      position: 'center',
    });
  } else {
    Toast.showWithGravity(
      message,
      durationSecond === undefined ? 0.5 : durationSecond,
      Toast.CENTER
    );
  }
}

export function jumpToApplicationSetting() {
  if (isAndroid) {
    AndroidOpenSettings.appDetailsSettings();
  } else {
    Linking.openURL('app-settings:').catch((err) => console.log('error', err));
  }
}
