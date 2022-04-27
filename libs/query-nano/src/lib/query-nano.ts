const DEFAULT_COMPARISON_MAP: Record<
  string,
  string
  > = {
  or: '$or',
  and: '$and',
  eq: '$eq',
  neq: '$ne',
  gt: '$gt',
  gte: '$gte',
  lt: '$lt',
  lte: '$lte',
  in: '$in',
  notin: '$nin',
  is: '$eq',
  isnot: '$ne',
};

const objectRecursiveKeyMap: any = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => {
    const getValue = v =>
      (typeof v === 'object' && v !== null) ? objectRecursiveKeyMap(v, fn) : v

    return [fn(key), Array.isArray(value)
      ? value.map(val => getValue(val))
      : getValue(value)]
  }))

export function filterToMango(obj) {
  return objectRecursiveKeyMap(obj, (key) => {
    if(DEFAULT_COMPARISON_MAP[key]) {
      return DEFAULT_COMPARISON_MAP[key];
    }
    return key;
  })
}
