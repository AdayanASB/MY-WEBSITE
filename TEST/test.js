

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
