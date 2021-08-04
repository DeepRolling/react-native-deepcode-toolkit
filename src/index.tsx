import { NativeModules } from 'react-native';

type DeepcodeToolkitType = {
  multiply(a: number, b: number): Promise<number>;
};

const { DeepcodeToolkit } = NativeModules;

export default DeepcodeToolkit as DeepcodeToolkitType;
