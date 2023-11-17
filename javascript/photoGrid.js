  
  let currLayout=[];
  
  let photoGrid=document.querySelector('.main-grid');
  let temporHTML='';
  setTimeout(()=>{
    for(let i=1;i<163;i++){
      temporHTML+=`<img loading="lazy" class="photo-art"  src="./PHOTOS/PORTFOLIO/1 (${i}).jpg" data-tilt data-index="${i-1}" data-tilt-scale="1.2" id="${i-1}">
      `;
    }  
  
    //temporary grid generator
  photoGrid.innerHTML=temporHTML;
  let photoObj=document.querySelectorAll(".photo-art");
  photoObj.forEach((element,index)=>{
    
    randomClass(element);
    for(i=0;i<alwaysSame.length;i++){
      if(index===alwaysSame[i].pos){
        element.classList.remove('tall');
        element.classList.remove('wide');
        if(alwaysSame[i].classes==='tall'){
          element.classList.add('tall');
        }
        else if(alwaysSame[i].classes==='wide'){
          element.classList.add('wide');
        }
        else if(alwaysSame[i].classes==='tall wide'){
          element.classList.add('wide');
          element.classList.add('tall');
        }
      
      }
    }
  });
  
  
  //display generated grid
  
  
  }, 1000);
  
  
  function randomClass(imgObj){
    let randomNumb=Math.random()*19 ;
    if(randomNumb<1){
      imgObj.classList.add('tall');
      currLayout.push('tall');
    }
     else if(randomNumb>=1 && randomNumb<3){
      imgObj.classList.add('wide');
      currLayout.push('wide');
    }
   else  if(randomNumb>=4 && randomNumb<5.5){
      imgObj.classList.add('wide');
      imgObj.classList.add('tall');
      currLayout.push('tall wide');
    }
    else{
      currLayout.push(' ');
    }
  
  }