import { Dimensions, PixelRatio } from 'react-native';

// 设备宽度，单位 dp
let deviceWidthDp = Dimensions.get('window').width;
let deviceHeightDp = Dimensions.get('window').height;

//calculateWrapItemWidth(4, getRealWidth(20), getRealWidth(76) * 2)
export function calculateWrapItemWidth(
  countOfEachRow: number,
  itemMargin: number,
  paddingHorizontal: number
) {
  return (
    deviceWidthDp -
    paddingHorizontal -
    ((countOfEachRow - 1) * itemMargin) / countOfEachRow
  );
}

export function calculateDeviceWidthAndHeight() {
  console.log(
    'screen Dimensions(calculateDeviceWidthAndHeight) : ' +
      Dimensions.get('window').width +
      ' : ' +
      Dimensions.get('window').height
  );
  deviceWidthDp = Dimensions.get('window').width;
  deviceHeightDp = Dimensions.get('window').height;
}

export function changeToPortrait() {
  console.log('screen Dimensions(changeToPortrait) : ' + '750 : 1334');
  uiWidthPx = 750;
  uiHeightPx = 1334;
}

export function changeToLandscape() {
  console.log('screen Dimensions(changeToLandscape) : ' + '1334 : 750');
  uiWidthPx = 1334;
  uiHeightPx = 750;
}

// 设计稿宽/高度，单位 px
//@ts-ignore
export let uiWidthPx = 750;
//@ts-ignore
export let uiHeightPx = 1334;

// let uiHeightPx =  1334 - STATUSBAR_HEIGHT;

// px 转 dp（设计稿中的 px 转 rn 中的 dp）
function getRealWidth(uiElePx: any) {
  return (uiElePx * deviceWidthDp) / uiWidthPx;
}

// px 转 dp（设计稿中的 px 转 rn 中的 dp）
function getRealHeight(uiElePx: any) {
  return (uiElePx * deviceHeightDp) / uiHeightPx;
}

function getRealDP(designPx: any) {
  return (designPx * deviceWidthDp) / uiWidthPx;
}

/*字体大小适配，例如我的设计稿字体大小是17px，那么使用就是：utils.fontsize(17)*/
function getRealFontsize(number: any) {
  number = Math.round(
    ((number *
      Math.min(deviceHeightDp / uiHeightPx, deviceWidthDp / uiWidthPx) +
      0.5) *
      PixelRatio.get()) /
      PixelRatio.getFontScale()
  );
  return number / PixelRatio.get();
}

export {
  getRealWidth,
  getRealHeight,
  getRealFontsize,
  deviceWidthDp,
  deviceHeightDp,
};
