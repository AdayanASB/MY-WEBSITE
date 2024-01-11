document.body.style.zoom="100%"
let musicNote='./PHOTOS/SVG/music-solid2.svg';
let vinylIcon='./PHOTOS/SVG/compact-disc-solid.svg'
let audioPlayer= document.querySelector('.main-audio');

let r=document.querySelector(':root');
let buttonElementMusic=document.querySelector('.js-button-music');
let isPlaying=false;
let anim=gsap.to(".music-icon",{rotate:360, duration:5, repeat:-1, ease:"none", paused:true});
let secAnim=gsap.to(".ac-music",{rotate:'15',duration:2,repeat:-1, ease:"none", yoyo:true, paused:true});

//music player functions
let thirdAnim=gsap.from(".ac-music",{ opacity:0, paused:true, duration:0.7});
buttonElementMusic.addEventListener("click",()=>{
  console.log('YOU PRESSED THE MUSIC');

  if(!isPlaying){
    playAudio();
    isPlaying=true;
    r.style.setProperty('--visible-or-not','inline');
    setTimeout(()=>{
      thirdAnim.play();
      secAnim.play();
    },500);
  
    anim.play();
  
  }
  else{
    audioPlayer.pause();
    audioPlayer.currentTime=0;
    isPlaying=false;  
    secAnim.restart();
    secAnim.pause();
    thirdAnim.reverse();
    anim.restart();
    anim.pause();
    setTimeout(()=>{
      r.style.setProperty('--visible-or-not','none');
    },2000);
  
  }

});

function playAudio(){
  audioPlayer.load();
  audioPlayer.volume=1;
  audioPlayer.currentTime=0;
  audioPlayer.play();
  audioPlayer.controls=false;
  console.log('you payed the button');
}

//main transition between pages
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

//function for all nav elements (tech/artist/contact/home) 
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


//object with tech used (svgs) and their description

const techUsed=[
{
src:'./PHOTOS/SVG/techUsed/androidstudioFIN.svg',
description:'Android Studio'
},
{
src:'./PHOTOS/SVG/techUsed/arduinoFIN.svg',
description:'Arduino'
},
{
src:'./PHOTOS/SVG/techUsed/htmlFIN.svg',
description:'HTML'
},
{
src:'./PHOTOS/SVG/techUsed/javaFIN.svg',
description:'Java'
},
{
src:'./PHOTOS/SVG/techUsed/javascriptFIN.svg',
description:'Javascript'
},
{
src:'./PHOTOS/SVG/techUsed/cssFIN.svg',
description:'CSS'
},
{
src:'./PHOTOS/SVG/techUsed/pythonFIN.svg',
description:'Python'
},
{
src:'./PHOTOS/SVG/techUsed/unityFIN.svg',
description:'Unity'
},
{
src:'./PHOTOS/SVG/techUsed/vscodeFIN.svg',
description:'VSCode'
},
{
src:'./PHOTOS/SVG/techUsed/githubFIN.svg',
description:'GitHub'
}];
