
var isPalindrome = function(s) {
  function isLetter(a){
       if(a >= "A" && a <= "z"){
           console.log(`is ${a} letter?: ${true}`);
         return true;
      }
      console.log(`${a} is not a letter!!`);
      return false;
  }

  let leftPos=0;

  let rightPos= s.length-1;
  
  while(leftPos<rightPos){
    let left=  s[leftPos].toLowerCase();
    let right= s[rightPos].toLowerCase();
      if(!(isLetter(left))){
         leftPos++;
      }
     
       if(!(isLetter(right))){
          rightPos--;
      }
    
      if(isLetter(left) && isLetter(right)){
          
       if(left!==right){
              return false;
          }
       rightPos--;
       leftPos++;
      }
  }

  return true;
};

console.log(isPalindrome("0p"));