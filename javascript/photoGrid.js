
  let currLayout=[];

  let olxElement=document.querySelector('.olx-display');
  let photoGrid=document.querySelector('.main-grid');
  let temporHTML='';

    for(let i=1;i<163;i++){
      temporHTML+=`<img loading="lazy" class="photo-art"  src="./PHOTOS/PORTFOLIO/1 (${i}).jpg" data-tilt data-index="${i-1}" data-tilt-scale="1.3" id="${i-1}">
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
    let elemIndex=element.dataset.index;
    element.addEventListener('click',()=>{
        console.log(elemIndex)
        
      updateOlxPhoto(elemIndex);
      showOlx();

    });
  });
  callingStuff();
  document.onscroll=()=>{
  
      callingStuff();
    
  };
  function callingStuff(){
    let randNumber=Math.random();
    if(randNumber<1){
      document.querySelectorAll('.photo-art').forEach((elem,index)=>{
        fixedUpdate(elem);
      });
    }
  }
  function fixedUpdate(elems){
    //vector3.forward() 
    // == miscarea rectilinie uniforma
    let varXY=  elems.getBoundingClientRect();
    let convertedPercentage=varXY.y*100/(window.innerHeight+varXY.height);
    
    if(convertedPercentage<20){
      convertedPercentage=20;
    }
    if(convertedPercentage>60){
      convertedPercentage=60;
    }
  
    if(varXY.y<window.innerHeight+varXY.height &&varXY.y>-varXY.height){
      elems.animate({objectPosition:`center ${convertedPercentage}%`},{duration:500, fill:'forwards'});

    } 
  }

  //start anim when bottom = -height of element
  //end anim when bottom =height of screen
  //convert (current bottom)*100/(1080px +height of elem )






  //display generated grid
  
  

  
  
  function randomClass(imgObj){
    let randomNumb=Math.random()*20 ;
    if(randomNumb<1){
      imgObj.classList.add('tall');
      currLayout.push('tall');
    }
     else if(randomNumb>=1 && randomNumb<2){
      imgObj.classList.add('wide');
      currLayout.push('wide');
    }
   else  if(randomNumb>=4 && randomNumb<6){
      imgObj.classList.add('wide');
      imgObj.classList.add('tall');
      currLayout.push('tall wide');
    }
    else{
      currLayout.push(' ');
    }
  
  }



  //preview galery on by one 
  
let olxPhotoElem=document.querySelector('.img-holder');
let backButton=document.querySelector('.back-button');
backButton.addEventListener('click',()=>{

    hideOlx();
    olxElement.style.zIndex=-1;
  
  
});

let nextPhtButt=document.querySelector('.right-arr');
nextPhtButt.addEventListener("click", ()=>{
  let indeX=(Number(olxPhotoElem.dataset.index)+1)%162;
  updateOlxPhoto(indeX);
});

let lastPhtButt=document.querySelector('.left-arr');
lastPhtButt.addEventListener("click",()=>{

  let indeX=(Number(olxPhotoElem.dataset.index)-1)%162;
 if(indeX<0){
  indeX=161;
 }
  console.log(indeX);
  console.log(typeof indeX);
  updateOlxPhoto(indeX);

});
/*
r.style.setProperty('--anim-duration',`${animationDuration/1000}s`);*/

/*  --display-pr-olx:flex;
  --lock-scroll:visible;
  --display-header:flex;
  */

function showOlx(){
  r.style.setProperty('--display-pr-olx','flex');
  r.style.setProperty('--lock-scroll','hidden');
  r.style.setProperty('--display-header','0');
  r.style.setProperty('--header-index', '-1');
  photoGrid.style.zIndex=-1;
  olxElement.style.zIndex=100;
}
function hideOlx(){ 
  r.style.setProperty('--display-pr-olx','none');
  r.style.setProperty('--lock-scroll','visible');
  r.style.setProperty('--display-header','1');
  r.style.setProperty('--header-index', '10');
  olxPhotoElem.innerHTML='';
  olxElement.style.zIndex=-1
  photoGrid.style.zIndex=100;
}
function updateOlxPhoto(photoIndex){
  photoIndex =Number(photoIndex);

  olxPhotoElem.innerHTML=`<img src="./PHOTOS/PORTFOLIO/1 (${photoIndex+1}).jpg" class="olx-image" data-index=${photoIndex}>`;
  olxPhotoElem.dataset.index=photoIndex;
}

