
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
  console.log("ceva randoamsadm");
  for(let i=1; i<=256; i++){
    const radnomNumb=Math.round(Math.random());
    fullHTML+=`${radnomNumb}`;
    console.log(radnomNumb);
    console.log(fullHTML);
  }
  event.target.innerText =fullHTML;
  console.log(fullHTML);
};