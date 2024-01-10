/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
let res=[];
nums.sort((a,b)=>a-b);

 let left;
 let right=nums.length-1;
 if(nums[0]>0 || nums[right]<0 ||nums.length<3)return res;
 //console.log(nums);
for(let i=0; i<nums.length-2;i++){
     left=i+1;

     right=nums.length-1;
    
     while(left<right){
         const sum=nums[i]+nums[left]+nums[right];
    
         if(sum>0){
             right--;
                }
         else if(sum<0){
             left++;
      
             
         }
         else{
    
          res.push([nums[i],nums[left],nums[right]]);
        
              let lastLowOccurrence = nums[left];
              let lastHighOccurrence = nums[right];
              
              while (left < right && nums[left] === lastLowOccurrence) {
                  left++;
              }
              while (left < right && nums[right] === lastHighOccurrence) {
                  right--;
              }            
         }
          
     }
}

return res;
};

console.log( threeSum([-12,-1,4,-14,0,10,7,-7,-6,9,6,-2,7,13,9,-1,4,12,9,4,14,0,-4,0,0,10,2,-7,7,-4,-11,10,2,8,4,-12,-4,-12,-4,-3,12,9,11,4,-1,-3,10,-12,-6,-4,-1,-14,3,2,-7,-11,-3,10,-11,-10,13,-15,7,0,0,-4,-5,11,0,-2,-14,-11,-8,12,1,-1,-14,-12,-6,-5,0,9,-4,-12,-4,4,14,9,-9,10,14,-11,10,6,-3,-4,10,-1,14,-13,13,7,-9,12,4,-1,-4,5,3,6,8,10,0,11,13,11,-7,5,-3,-1,0,-4,-4,-4,10,0]));