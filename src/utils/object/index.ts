export function notNull(something: any) {
    return something !== undefined && something !== null;
}

/**
 * 带泛型的深拷贝
 * @param value 需要拷贝的值
 */
export function deepcopy<T>(value: any) {
    return JSON.parse(JSON.stringify(value)) as T;
}
