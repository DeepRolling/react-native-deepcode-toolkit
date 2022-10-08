import { getRealFontsize, getRealWidth } from '../ui/BaseFit';

export const customThemeStyleSheet: { [x: string]: ThemeProfile } = {
  lightNormal: {
    ui: {
      roundness: getRealWidth(10),
      primary: '#46aafd',
      buttonGradient: '#1172C3',
      waring: '#EA504E',
      offline: '#F8BF00',
      backgroundColor: '#F0F3F5',
      cardBackgroundColor: '#FFFFFF',
      dividerLineColor: '#E8E9EA',
    },
    text: {
      title: '#333333',
      content: '#525252',
      assist: '#7a7a7a',
      notice: '#98999a',
    },
    chart: {
      green: '#54CD87',
      blue: '#5FAAED',
    },
    fonts: {
      hugeTitle: getRealFontsize(36), //设备管理页面中的模块标题
      bigTitle: getRealFontsize(34), //大标题
      smallTitle: getRealFontsize(32), //部分标题:常见问题列表标题，选择房间的标题
      listTitle: getRealFontsize(26), //列表标题
      inputTitle: getRealFontsize(22), //输入框标题
      contextOrListText: getRealFontsize(30), //正文文字或列表文字
      bigAssistText: getRealFontsize(26), //大的辅助性文字
      assistText: getRealFontsize(24), //辅助性文字
      other: getRealFontsize(20), //其他
    },
  },
  darkNormal: {
    ui: {
      roundness: getRealWidth(10),
      primary: '#46AAFD',
      buttonGradient: '#1172C3',
      waring: '#EA504E',
      offline: '#F8BF00',
      backgroundColor: '#F0F3F5',
      cardBackgroundColor: '#FFFFFF',
      dividerLineColor: '#E8E9EA',
    },
    text: {
      title: '#333333',
      content: '#525252',
      assist: '#7a7a7a',
      notice: '#98999a',
    },
    chart: {
      green: '#54CD87',
      blue: '#5FAAED',
    },
    fonts: {
      hugeTitle: getRealFontsize(36), //设备管理页面中的模块标题
      bigTitle: getRealFontsize(34), //大标题
      smallTitle: getRealFontsize(32), //部分标题:常见问题列表标题，选择房间的标题
      listTitle: getRealFontsize(26), //列表标题
      inputTitle: getRealFontsize(22), //输入框标题
      contextOrListText: getRealFontsize(30), //正文文字或列表文字
      bigAssistText: getRealFontsize(26), //大的辅助性文字
      assistText: getRealFontsize(24), //辅助性文字
      other: getRealFontsize(20), //其他
    },
  },
};

export type ThemeProfile = {
  ui: ThemProfileUISpecification;
  text: ThemProfileTextColorSpecification;
  chart: ThemProfileChartColorSpecification;
  fonts: ThemProfileFontSizeSpecification;
};

export type ThemProfileUISpecification = {
  roundness: number; //roundness of common elements, such as buttons.
  primary: string; //primaryColor
  buttonGradient: string; //used in display gradient color with primary color in button
  waring: string; //used notice user waring or something urgency
  offline: string; //used notice user some deivce offline
  backgroundColor: string; //background color,used in most page
  cardBackgroundColor: string; //card background color,used in most card
  dividerLineColor: string; //the color display in divider line
};

export type ThemProfileTextColorSpecification = {
  title: string; //color used in title color
  content: string; //color used in most content
  assist: string; //color used in assist text
  notice: string; //color used in notice text
};

export type ThemProfileChartColorSpecification = {
  green: string; //used for one type of chart data or normal state
  blue: string; //used for one type of chart data
};

export type ThemProfileFontSizeSpecification = {
  hugeTitle: number; //设备管理页面中的模块标题
  bigTitle: number; //大标题
  smallTitle: number; //部分标题:常见问题列表标题，选择房间的标题
  listTitle: number; //列表标题
  inputTitle: number; //输入框标题
  contextOrListText: number; //正文文字或者列表文字
  assistText: number; //辅助性文字
  bigAssistText: number; //大的辅助性文字
  other: number; //其他
};
