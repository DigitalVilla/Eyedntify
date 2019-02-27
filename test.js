let arr = []



const bFilter = (array, test) => {
  const len = array.length;
  let passed = [];
  for (let i = 0, j = len - 1; i <= j && j >= i; i++ , j--) {
    if (test(array[i])) passed.push(array[i]);
    if (test(array[j])) passed.push(array[j]);
  }
  return passed;
}


console.log(bFilter(arr, el => el == 66));


// mongoose CRUD
// https://coursework.vschool.io/mongoose-crud/