
let aboutMeTitle=document.querySelector('.about-me-title');
aboutMeTitle.innerHTML=aboutMeTitle.innerHTML.split("").map((charRn,index)=>{
return `<span style="">${charRn}</span>`;
}).join("");
