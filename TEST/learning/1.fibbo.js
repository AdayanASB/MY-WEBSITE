//fib series
//normal:
function fibbo2(n){
  if(n<=2){return 1;}
  return fibbo2(n-1)+fibbo2(n-2);
}

//dynamic version:
function fibbo(n, memo={}){
  if(n<=2){return 1;}
  //second base case (if n exists)
  if(n in memo){return memo[n];}

  memo[n]=fibbo(n-1,memo)+fibbo(n-2,memo);
  return memo[n];
}

console.log(fibbo(2));
console.log(fibbo(10));
console.log(fibbo(25));
console.log(fibbo(95));