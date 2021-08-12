//some handy define for typescript
import type { ReactElement } from 'react';

/**
 * 为了适配 typescript 传递null子元素造成的报红
 * 声明children的时候可以声明如下:
 * interface Props{
 *      children: ReactElementWithNull[]
 * }
 */
export type ReactElementWithNull = ReactElement | null;
