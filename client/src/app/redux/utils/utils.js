export function isNumber(value) {
  if (typeof value !== "string") return false
  return !isNaN(value) && !isNaN(parseFloat(value))
}

export function isEmpty(obj) {
  if (obj === "" || obj === null || obj === {} || obj === [])
    return true;
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export function capsWord(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export  function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] === target) {
          return mid;
      }
      if (arr[mid] < target) {
          left = mid + 1;
      } else {
          right = mid - 1;
      }
  }
  return -1;
}