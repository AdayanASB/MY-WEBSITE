function bestSum(n, arr){
  if(n===0){return [];}
  if(n<0){return null;}

  let minCombo=null;

  for(let num of arr){
    let remainder =n-num;
    const remainderCombo =bestSum(remainder,arr);
    if(remainderCombo!==null){
      let combinations = [ ...remainderCombo, num];
      if(minCombo === null ||combinations.length < minCombo.length){
        minCombo=combinations;
      }
    }
      
  }
  return minCombo;
}

console.log(bestSum(7, [2,3]));
console.log(bestSum(7, [2,4]));
console.log(bestSum(8, [5,4,7,3]));
console.log(bestSum(8, [5,3,2,4,8]));
console.log(bestSum(100, [1,2,7,14,5,25]));