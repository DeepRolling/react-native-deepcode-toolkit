import R from 'ramda';

/**
 * produce interval array , if you pass interval is 5 and maxNumber is 15 , the result array is [5,10,15]
 * @param interval interval factor
 * @param maxNumber maxNumber of current array
 */
const produceIntervalNumberArray = (interval: number, maxNumber: number) => {
    let status = true;
    let fifteenTimeArray: number[] = [];
    let producedNumber;
    let currentTimes = 1;
    while (status) {
        producedNumber = currentTimes * interval;
        currentTimes++;
        fifteenTimeArray.push(producedNumber);
        if (producedNumber === maxNumber) {
            status = false;
        }
    }
    return fifteenTimeArray;
};

const curriedProduceIntervalNumberArrayFormat = R.curry<(interval: number, maxNumber: number) => number[]>(produceIntervalNumberArray);

export const produceFifteenIntervalArray = curriedProduceIntervalNumberArrayFormat(15);

export const produceFiveIntervalArray = curriedProduceIntervalNumberArrayFormat(5);

/**
 * 将当前的文字添加到数组头部
 * @param array
 * @param text
 */
export function unshitTextToStringArray(array: Array<string>, text: string, hasMaxLength: boolean, maxLength?: number) {
    let newLength = array.unshift(text);
    if (hasMaxLength) {
        // @ts-ignore
        if (newLength > maxLength) {
            array.pop();
        }
    }
}

//判断一个数组是否是另外一个数组的子集
export function isSubset(parentArray: any[], determineArray: any[]) {
    return determineArray.every(function (val) {
        return parentArray.indexOf(val) >= 0;
    });
}

export function sameElementWithoutOrder(parentArray: any[], determineArray: any[]) {
    return isSubset(parentArray, determineArray) && parentArray.length === determineArray.length;
}
