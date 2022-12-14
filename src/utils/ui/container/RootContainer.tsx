/**
 * 全屏带沉浸式状态栏的页面容器，已经自动处理好状态栏的高度
 * 所以子组件用该容器写页面按照设计图上不要加状态栏高度
 * @param props 当前页面的背景色，该背景色会被用于沉浸式状态栏,是否需要padding
 * @constructor
 */
import { View } from 'react-native';
import React from 'react';
import { STATUSBAR_PADDING_FOR_NEED } from '../commonStyle';

export function RootContainer(props: {
  children: any;
  backgroundColor?: string;
  needAutoPadding?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.backgroundColor,
        //如果需要状态栏padding的话，处理android和ios
        //不需要的话就要自己处理
        // getRealHeight(STATUSBAR_PADDING_FOR_NEED)
        //这里的返回高度已经是像素了，不要再去计算
        paddingTop: props.needAutoPadding ? STATUSBAR_PADDING_FOR_NEED : 0,
      }}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: props.backgroundColor,
        }}
      >
        {props.children}
      </View>
    </View>
  );
}

RootContainer.defaultProps = {
  needAutoPadding: false,
  backgroundColor: '#ffffff',
};
