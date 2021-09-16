import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import R from 'ramda';
import { deepcopy } from '../object';

export function transDataToTimeStamp(
  date: string,
  dateFormat: string,
  spilt: string[],
  regex?: RegExp
) {
  let dateSplitArray;
  if (regex !== undefined) {
    dateSplitArray = date.split(new RegExp(regex));
  } else {
    dateSplitArray = splitString(date, [], spilt);
  }
  let dateFormatSplitArray;
  if (regex !== undefined) {
    dateFormatSplitArray = dateFormat.split(new RegExp(regex));
  } else {
    dateFormatSplitArray = splitString(dateFormat, [], spilt);
  }
  //correct mouth value
  let mouthIndex = dateFormatSplitArray.findIndex((value) =>
    value.includes('M')
  );
  let rightMouthValue = (dateSplitArray[mouthIndex] as unknown as number) - 1; //date object's mouth is 0-11
  dateSplitArray[mouthIndex] = rightMouthValue.toString();
  //join valid string used to construct date object
  if (dateSplitArray.length < 7) {
    let notReachSixDigit = true;
    while (notReachSixDigit) {
      dateSplitArray.push('0');
      if (dateSplitArray.length === 7) {
        notReachSixDigit = false;
      }
    }
  }
  //strip fragment start with 0
  let validTimeArray: number[] = dateSplitArray.map((value) => {
    if (value.startsWith('0') && value.length > 1) {
      let lastIndex = value.lastIndexOf('0');
      if (lastIndex === value.length - 1) {
        lastIndex = lastIndex - 1;
      }
      let rightValue = value.substring(lastIndex + 1);
      return rightValue as unknown as number;
    } else {
      return value as unknown as number;
    }
  });
  // @ts-ignore
  return new Date(...validTimeArray).getTime();
}

/**
 * split array by multi separator , best choice is use Regex pass in split function
 * @param targetString
 * @param initialArray
 * @param separator
 */
function splitString(
  targetString: string,
  initialArray: string[],
  separator: string[]
) {
  let firstSeparator = separator.shift();
  if (firstSeparator === undefined) {
    //represent there not have separator
    return initialArray;
  } else {
    initialArray = targetString.split(firstSeparator);
    //pass split array down and clear array
    let copiedArray = deepcopy<string[]>(initialArray);
    // initialArray = [];
    copiedArray.forEach((value, index) => {
      //let each fragment continue split by remains separator
      let separatorCopy = deepcopy<string[]>(separator);
      if (separatorCopy.length > 0) {
        let canBeSpilt = false;
        separatorCopy.forEach((value1) => {
          if (value.split(value1).length > 1) {
            canBeSpilt = true;
            return;
          }
        });
        if (canBeSpilt) {
          //if this fragment can be split
          let tempuuid = nanoid();
          initialArray[index] = tempuuid;
          let childSplitFragments = splitString(value, [], separatorCopy);
          let newestSplitArray: string[] = [];
          initialArray.forEach((oldFragment) => {
            if (oldFragment !== tempuuid) {
              //normal fragment , adddevice to newest split array
              newestSplitArray.push(oldFragment);
            } else {
              //find place holder , replace this holder with child split fragments
              newestSplitArray.push(...childSplitFragments);
            }
          });
          //after newest split array generated ,  refresh current array
          initialArray = newestSplitArray;
        }
      }
    });
    return initialArray;
  }
}

/**
 * transfer date string to month / day
 * @param dateString '2021-08-22' -> '08/22'
 */
export function takeMonthAndDayFromDate(dateString: string) {
  let timeArray = dateString.split('-');
  let monthString = timeArray[1].startsWith('0')
    ? timeArray[1].replace('0', '')
    : timeArray[1];
  let dayString = timeArray[2].startsWith('0')
    ? timeArray[2].replace('0', '')
    : timeArray[2];
  return monthString + '/' + dayString;
}

/**
 * format date to specified format
 * @param fmt specified format
 * @param date date
 */
function dateFormat(fmt: string, date: Date) {
  let ret;
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        // @ts-ignore
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      );
    }
  }
  return fmt;
}

const curriedDateformat =
  R.curry<(fmt: string, date: Date) => string>(dateFormat);

/**
 * format date with YYYY-MM-dd HH:mm
 */
export const dateFormatWithYYYYMMddHHmm = curriedDateformat('YYYY-MM-dd HH:mm');

/**
 * format date with YYYY-MM-dd HH:mm
 */
export const dateFormatWithYYYYMMddHHmmSS = curriedDateformat(
  'YYYY-MM-dd HH:mm:SS'
);
/**
 * format date with YYYY-MM-dd+HH:mm
 */
export const dateFormatWithYYYYMMddPlusHHmm =
  curriedDateformat('YYYY-MM-dd+HH:mm');
/**
 * format date with MM/dd HH:mm
 */
export const dateFormatWithMddPlusHHmm = curriedDateformat('MM/dd HH:mm');

/**
 * 获取当前的时间
 */
export function getCurrentDateString(): String {
  let date = new Date();

  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();
  if (minute === '0') {
    minute = '00';
  }
  let second = date.getSeconds().toString();

  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  );
}

/**
 * if digit is single digit , adddevice a '0' as prefix
 * @param value
 */
export function doubleDigitNumber(value: number) {
  if (value.toString().length === 1) {
    return '0' + value;
  }
  return value;
}

export function sectionToChinese(section: number) {
  const chnNumChar = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
  ];
  const chnUnitChar = ['', '十', '百', '千', '万', '亿', '万亿', '亿亿'];
  let strIns = '',
    chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    const v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

/**
 * 获取当前的时间秒
 */
export function getCurrentSeconds() {
  let time = Date.now() / 1000;
  return String(time).split('.')[0];
}

export function changeDateTimeToDate(dateTime: string) {
  return dateTime.split(' ')[0];
}

/**
 * 时间处理: 2020-08-20T01:04:17Z => [2020-08-20, 01:04]
 * @param {string} timeStr
 */
export function timeDeal(timeStr: string, timeLength?: number) {
  let timeList: string[] = [];
  try {
    timeList = timeStr.split('T');
    timeList[1] = timeList[1].slice(
      0,
      timeLength !== undefined ? timeLength : 5
    );
  } catch {}
  return timeList;
}

/**
 * get the date that have interval days by params date
 * such as : '2021-05-01' -> '2021-05-02'
 * @param dateParameter
 * @param calValue
 * @param disableZeroAppend
 */
export function calculateDate(
  dateParameter: string,
  calValue: number,
  disableZeroAppend?: boolean
) {
  //返回日期的毫秒值
  let newDate: number | Date = new Date(dateParameter).valueOf();
  //加/减天数后的毫秒值
  newDate = newDate + calValue * 24 * 60 * 60 * 1000;
  newDate = new Date(newDate);

  //如果月份长度少于2，则前加 0 补位
  let month: number | string = newDate.getMonth() + 1;
  if (disableZeroAppend !== true) {
    month = month > 9 ? month : '0' + month;
  }

  //如果天数长度少于2，则前加 0 补位
  let date: number | string = newDate.getDate();
  if (disableZeroAppend !== true) {
    date = date > 9 ? date : '0' + date;
  }

  return newDate.getFullYear() + '-' + month + '-' + date;
}

/**
 * get the month that have interval month by params month
 * such as : '2021-05',1 -> '2021-06'
 * lol , it's a piece of shit , don't touch it ....
 * @param monthParameter
 * @param calValue
 */
export function calculateMonth(monthParameter: string, calValue: number) {
  let paramArray = monthParameter.split('-');
  let year: number | string = paramArray[0];
  let mouth: number | string = paramArray[1];
  mouth = mouth.replace('0', '');
  year = Number(year);
  mouth = Number(mouth);

  //calculate reduce how many years
  let plusOp = calValue > 0;
  let yearNumber = Math.abs(mouth + calValue) / 12;
  let howManyYear = parseInt(String(yearNumber), 10);
  if (yearNumber >= 1 && !plusOp) {
    howManyYear += 1;
  }
  if (!String(yearNumber).includes('.') && plusOp) {
    howManyYear -= 1;
  }
  // console.log('shit : howManyYear' + howManyYear);
  let notReachAYear = howManyYear < 1;
  //should reduce year
  year = plusOp
    ? year + (notReachAYear ? 0 : howManyYear)
    : notReachAYear
    ? year - (mouth + calValue <= 0 ? 1 : 0)
    : year - howManyYear;
  //calculate month
  let rightMonth = 0;
  if (mouth + calValue < 0) {
    rightMonth = plusOp
      ? mouth + (Math.abs(calValue) % 12)
      : mouth - (Math.abs(calValue) % 12);
    if (rightMonth < 0) {
      rightMonth = 12 + rightMonth;
    }
  }
  if (mouth + calValue === 0) {
    rightMonth = 12;
  }
  if (mouth + calValue > 0) {
    rightMonth = mouth + calValue;
  }
  mouth = Math.abs(rightMonth) % 12;
  if (mouth === 0) {
    //determine current is plus or reduce
    mouth = 12;
    // if (plusOp) {
    //     mouth = 12;
    // } else {
    //     mouth = 12;
    // }
  }
  return year.toString() + '-' + (mouth < 10 ? '0' + mouth : mouth);
}
