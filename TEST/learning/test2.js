/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let total=0;
    if(height.length<3)return total;
    let tempArr=[];
    let foundValue=false;
    for(let i=0;i<height.length;i++){
        let left=i;
        let right=i+1;
        if(height[i]!==0){
            foundValue=true;
        }
        if(foundValue){
            if(!(tempArr.includes(left))){

            
                while(height[left]>height[right]){
                    total+=height[left]-height[right];
                    tempArr.push(right);
                    if(right===height.length-1){
                        for(let j=left+1;j<=right;j++){
                            total=total-(height[left]-height[j]);
                            tempArr.pop();
                        }
                        
                        break;
                    }
                    else{
                        right++;
                    }
                
                }
            }
        }
    }
    return total;
};

console.log(trap([4,2,3]));