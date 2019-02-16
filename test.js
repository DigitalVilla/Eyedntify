 function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let mid; 
  while (left <= right) {
    mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ~mid;
}

 const swapR = (arr, item) => {
  const copy = arr.slice(0, arr.length);
  const indx = binarySearch(arr, item);
  if (indx > -1) //found >> delete
    copy.splice(indx, 1)
  else // not found >> add
    copy.splice(~indx+1, 0, item)
  return copy;
}

let arr = [1,22,3,5,6,7,8]
console.log( swapR(arr,9));
console.log( swapR(arr,22));
