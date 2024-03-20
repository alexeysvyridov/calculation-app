function mergeArrays(arr1, arr2) {
  const mergedArray = [];
  for (let i = 0; i < Math.min(arr1?.length, arr2?.length); i++) {
    if (arr1[i] !== '') {
      mergedArray.push({ title: arr1[i], price: arr2[i] || '' });
    }
  }
  return mergedArray;
}

export {mergeArrays}