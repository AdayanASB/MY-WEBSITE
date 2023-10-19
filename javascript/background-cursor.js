
backgElement=document.querySelector(".background-gradient");
document.body.onmousemove=(event)=>{
  let userX=event.clientX;
  let userY=event.clientY;
  console.log(userX);
  console.log(userY);
  backgElement.animate({
    top:`${userY}px`,
    left:`${userX}px`
  },{duration:3000, fill:'forwards'});

};