//import { languages } from "./language";

//languages.forEach(()=>{

//});
let musicNote='./PHOTOS/SVG/music-solid2.svg';
let vinylIcon='./PHOTOS/SVG/compact-disc-solid.svg'
let audioPlayer= document.querySelector('.main-audio');

let r=document.querySelector(':root');
let buttonElementMusic=document.querySelector('.js-button-music');
let isPlaying=false;
let anim=gsap.to(".music-icon",{rotate:360, duration:5, repeat:-1, ease:"none", paused:true});
let secAnim=gsap.to(".ac-music",{rotate:'10',duration:3,repeat:-1, ease:"none", yoyo:true});


buttonElementMusic.addEventListener("click",()=>{
  

  if(!isPlaying){
    playAudio();
    isPlaying=true;
    r.style.setProperty('--visible-or-not','inline');
    secAnim.play(); 
  
    anim.play();
  
  }
  else{
    audioPlayer.pause();
    audioPlayer.currentTime=0;
    isPlaying=false;  
    secAnim.restart();
    secAnim.pause();
    anim.restart();
    anim.pause();
    r.style.setProperty('--visible-or-not','none');
    
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
