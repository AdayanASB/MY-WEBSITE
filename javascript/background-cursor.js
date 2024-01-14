
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
window.onmousemove=(event)=>{
  let fullHTML='';

  for(let i=1; i<=1000; i++){
    const radnomNumb=Math.round(Math.random());
    fullHTML+=`${radnomNumb}`;
  
  }
  textElement.innerText =fullHTML;

};