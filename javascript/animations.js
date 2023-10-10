
let letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let rFromArt=document.querySelector('.rFromArt');

let aboutMeTitle=document.querySelector('.about-me-title');
aboutMeTitle.innerHTML=aboutMeTitle.innerHTML.split("").map((charRn,index)=>{
return `<span style="">${charRn}</span>`;
}).join("");

let devText= document.querySelector('.js-dev-text');
devText.onmouseover=function(event){
  let iterration=0;

    let interval=setInterval(()=>{
      $('#1').contents()[0].nodeValue=$('#1').contents()[0].nodeValue.split("").map((letter, index)=>
      {
        if(iterration>=index){
        
          return devText.dataset.textMain[index];
        }

      return letters[Math.floor(Math.random()*26)]; 
      }).join(""); 
    
      if(iterration>9){clearInterval(interval);}
      iterration+=1/3;
      rFromArt.classList.remove("show");
      rFromArt.classList.add("hidden");
    },30);
    setTimeout(()=>{

      rFromArt.classList.add("show");
      rFromArt.classList.remove("hidden");
    },900);
};

