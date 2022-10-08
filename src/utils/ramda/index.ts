// @ts-nocheck
import { map, pick, prop } from "ramda";
export const mapToSinglePropValue: (specifiedProp: string) => (data: any[]) => any[] = (specifiedProp: string) => map(prop(specifiedProp));
