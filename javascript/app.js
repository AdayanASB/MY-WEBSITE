
let musicNote='./PHOTOS/SVG/music-solid2.svg';
let vinylIcon='./PHOTOS/SVG/compact-disc-solid.svg'
let audioPlayer= document.querySelector('.main-audio');

let r=document.querySelector(':root');
let buttonElementMusic=document.querySelector('.js-button-music');
let isPlaying=false;
let anim=gsap.to(".music-icon",{rotate:360, duration:5, repeat:-1, ease:"none", paused:true});
let secAnim=gsap.to(".ac-music",{rotate:'15',duration:2,repeat:-1, ease:"none", yoyo:true, paused:true});

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
