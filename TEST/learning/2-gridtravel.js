//alone attempt after explication

function gridTraveller(x,y,memo={}){
  if(x===1||y===1){
    return 1;
  }
  if(x===0||y===0){
    return 0;
  }
  if(`${x},${y}` in memo){
    return memo[`${x},${y}`];
  }
  if(`${y},${x}` in memo){
    return memo[`${y},${x}`];
  }

  memo[`${x},${y}`]=gridTraveller(x-1,y,memo)+gridTraveller(x,y-1,memo);
  return memo[`${x},${y}`];

}

console.log(gridTraveller(1,1));
console.log(gridTraveller(2,3));
console.log(gridTraveller(2,3));
console.log(gridTraveller(3,3));
console.log(gridTraveller(25,18));

//USE TREEESS

//steps for memo:
//1. visualise the problem, try to use trees?
//2. get something to work 
//3.watch where it bottlenecks
//4. try to see if anything repeats
//5. ADD A MEMO OBJ
//6. make sure it is passed betwween calls
// ADD A NEW BASE CASE (if args in memo)
// 7. MOMORISE THE SOLUTION AND RETURN AFTER
//leaves of the trees are the basecase


