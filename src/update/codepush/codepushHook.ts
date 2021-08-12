import codePush from 'react-native-code-push';
import { useEffect } from 'react';

/**
 * 配置codepush 为手动检查更新
 * @type {{checkFrequency: CodePush.CheckFrequency.MANUAL}}
 */
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

export function registerCodePushWrapperWith(component: any) {
  return codePush(codePushOptions)(component);
}

export function useCodePushUpdate(open: boolean) {
  useEffect(() => {
    if (open) {
      codePush
        .sync({
          installMode: codePush.InstallMode.ON_NEXT_RESTART,
        })
        .then((value) => {
          console.log('code push sync state : ' + value.valueOf());
        });
    }
  }, []);//eslint-disable-line react-hooks/exhaustive-deps
}
