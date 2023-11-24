

let r=document.querySelector(':root');
let animationDuration=600;
let animDelay=250;
r.style.setProperty('--anim-duration',`${animationDuration/1000}s`);
r.style.setProperty('--anim-delay',`${animDelay/1000}s`);
let animObj=document.querySelector('.animation-over');

animObj.classList.add('animatedStart');

setTimeout(()=>{
animObj.style.backgroundColor='rgba(0,0,0,0)';
animObj.style.zIndex=-1;
animObj.classList.remove('animatedStart');
animObj.style.transform='scale(1,0)';

},(animationDuration+animDelay+100));

let headerElements=document.querySelectorAll('.a').forEach((buttons)=>{

  buttons.addEventListener("click",()=>{
  
    setTimeout(()=>{
      window.location.href=`./${buttons.dataset.links}`;
    }, animationDuration+animDelay+100);
    animObj.style.transform='scale(1,0)';
    animObj.style.backgroundColor='rgba(0,0,0,1)';
    animObj.style.zIndex=1000;
    animObj.classList.add('animatedSec');
    setTimeout(()=>{
      animObj.style.transform='scale(1,1)';
    
    },animationDuration+animDelay);
  });
  
});


let checkbox=document.querySelector('.fortnicte');
checkbox.addEventListener('change',(event)=>{
  console.log(event.target.value);
  let value=document.querySelector('.show-value').innerHTML=`value:${event.target.value} `;
});
let a='a';

let olxElement=document.querySelector('.olx-display');
let olxPhotoElem=document.querySelector('.img-holder');
let backButton=document.querySelector('.back-button');
backButton.addEventListener('click',()=>{

    hideOlx();
    olxElement.style.zIndex=-1;
  
  
});
let showOlxButton=document.querySelector('.show-olx');
showOlxButton.addEventListener('click',()=>{
    showOlx();
    olxElement.style.zIndex=10000;
});

let nextPhtButt=document.querySelector('.right-arr');
nextPhtButt.addEventListener("click", ()=>{

});

let lastPhtButt=document.querySelector('.left-arr');
nextPhoto.addEventListener("click",()=>{

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
  r.style.setProperty('-display-header','0');

}
function hideOlx(){
  r.style.setProperty('--display-pr-olx','none');
  r.style.setProperty('--lock-scroll','visible');
  r.style.setProperty('--display-header','1');
}
function updateOlxPhoto(photoIndex){
  olxPhotoElem.innerHTML=`<img src="./PHOTOS/PORTFOLIO/1 (${photoIndex+1}).jpg">`;
}
function changePhoto(pozaCurenta){
  
}

