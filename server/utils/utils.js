
function biSearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let mid;
  while (left <= right) {
    mid = left + Math.floor((right - left) / 2);
    if (arr[mid] == target) {
      return mid; //found item
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ~mid; //aprox location
}

//function adds/deletes an element from an array
function swapR(array, item, cloned = true) {
  const copy = cloned ? array.slice(0, array.length) : array;
  const indx = biSearch(copy.sort(), item);
  if (indx > -1) //found >> delete
    copy.splice(indx, 1)
  else // not found >> add
    copy.splice(~indx, 0, item)
  return copy.sort();
}


module.exports = {};
module.exports.biSearch = biSearch;
module.exports.swapR = swapR;
