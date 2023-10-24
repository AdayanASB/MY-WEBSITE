
backgElement=document.querySelector(".background-gradient");
document.body.onmousemove=(event)=>{
  let userX=event.clientX;
  let userY=event.clientY;
  
  backgElement.animate({
    top:`${userY}px`,
    left:`${userX}px`
  },{duration:3000, fill:'forwards'});

};

textElement=document.querySelector('.random-text-bg');
textElement.onmousemove=(event)=>{
  let fullHTML='';

  for(let i=1; i<=500; i++){
    const radnomNumb=Math.round(Math.random());
    fullHTML+=`${radnomNumb}`;
  
  }
  event.target.innerText =fullHTML;

};


let home=document.getElementById('a');
home.addEventListener("click",()=>{
  setTimeout(()=>{
    window.location.href="./index.html";
  }, 5510);
  animObj.style.transform='scale(1,0)';
  animObj.style.backgroundColor='rgba(255,0,0,1)';
  animObj.style.zIndex=1000;

  animObj.classList.add('animatedSec');
  setTimeout(()=>{
    animObj.style.transform='scale(1,1)';
  

  }, 500);


});

