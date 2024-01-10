function canSum(n,arr=[],memo={},resArr=[]){
  if(n===0){return resArr;}
  if(n in memo) return memo[n];
  for(let num of arr){
    if(n>=num){
      let currNum=n-num;
      if(canSum(currNum,arr,memo,resArr)!==null){
        resArr.push(num);
        memo[num]=resArr;
        return memo[num];
      }
    }
  }
  memo[n]=null;
  return memo[n];
}
console.log(canSum(7, [2,3]));
console.log(canSum(7, [2,4]));
console.log(canSum(7, [5,4,7,3]));
console.log(canSum(300, [7,14,5,21]));
console.log(canSum(501, [7,14,2,21]));