  /*
  console.log('{');
  let photoGrid=document.querySelector('.main-grid');
  let temporHTML='';
  for(let i=1;i<163;i++){
    temporHTML+=`<img loading="lazy" class="photo-art" src="./PHOTOS/PORTFOLIO/1 (${i}).jpg">
    `;
  }  
  photoGrid.innerHTML=temporHTML;

let photoObj=document.querySelectorAll(".photo-art");
photoObj.forEach((element,index)=>{
  randomClass(element);

  
});

function randomClass(imgObj){
  let randomNumb=Math.random()*8;
  if(randomNumb<1){
    imgObj.classList.add('tall');
    console.log("['.tall']");
  }
   else if(randomNumb>=1 && randomNumb<2){
    imgObj.classList.add('wide');
    console.log("['.wide']");
  }
 else  if(randomNumb>=2 && randomNumb<3){
    imgObj.classList.add('wide');
    imgObj.classList.add('tall');
    console.log("['.tall .wide']");
  }
  else{
    console.log('[ ]');
  }

}


console.log('}');*/