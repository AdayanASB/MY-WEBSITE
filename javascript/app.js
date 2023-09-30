//import { languages } from "./language";

//languages.forEach(()=>{

//});

let audioPlayer= document.querySelector('.main-audio');

let buttonElementMusic=document.querySelector('.js-button-music');
let isPlaying=false;
buttonElementMusic.addEventListener("click",()=>{
  if(!isPlaying){
    playAudio();
    isPlaying=true;

  }
  else{
    audioPlayer.pause();
    audioPlayer.currentTime=0;
    isPlaying=false;  
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
