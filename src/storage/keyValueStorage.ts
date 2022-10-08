// @ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import R, { map, filter, pipe, startsWith } from 'ramda';

export function persistToLocal(purpose: string, data: string) {
  console.log(`persist data ${data} with purpose ${purpose}`);
  return AsyncStorage.setItem(purpose, data);
}

export function takeoutDataFromLocal(purpose: string) {
  console.log(`take out data with purpose ${purpose}`);
  return new Promise<string>((resolve, reject) => {
    AsyncStorage.getItem(purpose)
      .then((data) => {
        if (data !== null) {
          resolve(data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function clearPersistenceData(purpose: string) {
  console.log(`remove persistence data with purpose ${purpose}`);
  return AsyncStorage.removeItem(purpose);
}

export function clearPersistenceDataWithPrefix(prefix: string) {
  console.log(`remove persistence data with prefix ${prefix}`);
  return new Promise((resolve, reject) => {
    AsyncStorage.getAllKeys()
      .then((keys) => {
        const getAllPromise = pipe<string, Promise<any>[]>(
          filter<any>(startsWith(prefix)),
          map(AsyncStorage.removeItem)
        );
        Promise.all(getAllPromise(keys)).then(resolve).catch(reject);
      })
      .catch(reject);
  });
}

type DataWithKeyFilled = {
  key: string;
  value: string;
};

function getItemWithKeyFilled(key: string) {
  return new Promise<DataWithKeyFilled>((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((data) => {
        if (data !== null) {
          resolve({
            key: key,
            value: data,
          });
        } else {
          reject();
        }
      })
      .catch(reject);
  });
}

export function takeoutDataFromLocalWithPrefix(prefix: string) {
  console.log(`takeout data from local with prefix ${prefix}`);
  return new Promise((resolve, reject) => {
    AsyncStorage.getAllKeys()
      .then((keys) => {
        const getAllPromise = pipe<string, Promise<DataWithKeyFilled>[]>(
          filter<any>(startsWith(prefix)),
          map(getItemWithKeyFilled)
        );
        Promise.all(getAllPromise(keys)).then(resolve).catch(reject);
      })
      .catch(reject);
  });
}

export enum LocalDataOperateType {
  UPDATE,
  FETCH,
  FETCH_WITH_PREFIX,//if want to fetch all storage data from local , pass '' for purpose parameter
  CLEAR,
  CLEAR_WITH_PREFIX,
}

export function operateLocalData(
  purpose: string,
  operate: LocalDataOperateType,
  data?: string
) {
  switch (operate) {
    case LocalDataOperateType.UPDATE:
      if (data === undefined) {
        throw Error('you need supply data to storage');
      }
      return persistToLocal(purpose, data);
    case LocalDataOperateType.FETCH:
      return takeoutDataFromLocal(purpose);
    case LocalDataOperateType.FETCH_WITH_PREFIX:
      return takeoutDataFromLocalWithPrefix(purpose);
    case LocalDataOperateType.CLEAR:
      return clearPersistenceData(purpose);
    case LocalDataOperateType.CLEAR_WITH_PREFIX:
      return clearPersistenceDataWithPrefix(purpose);
  }
}
