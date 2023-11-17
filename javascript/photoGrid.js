  
  let currLayout=[];
  console.log(window.innerHeight);
  let photoGrid=document.querySelector('.main-grid');
  let temporHTML='';

    for(let i=1;i<163;i++){
      temporHTML+=`<img loading="lazy" class="photo-art"  src="./PHOTOS/PORTFOLIO/1 (${i}).jpg" data-tilt data-index="${i-1}" data-tilt-scale="1.3" id="${i-1}">
      `;
    }  
    
    //temporary grid generator
  photoGrid.innerHTML=temporHTML;
  let photoObj=document.querySelectorAll(".photo-art");
  photoObj.forEach((element,index)=>{
    
    randomClass(element);
    for(i=0;i<alwaysSame.length;i++){
      if(index===alwaysSame[i].pos){
        element.classList.remove('tall');
        element.classList.remove('wide');
        if(alwaysSame[i].classes==='tall'){
          element.classList.add('tall');
        }
        else if(alwaysSame[i].classes==='wide'){
          element.classList.add('wide');
        }
        else if(alwaysSame[i].classes==='tall wide'){
          element.classList.add('wide');
          element.classList.add('tall');
        }
      
      }
    }
    

  });
  callingStuff();
  document.onscroll=()=>{
  
      callingStuff();
    
  };
  function callingStuff(){
    let randNumber=Math.random();
    if(randNumber<1){
      document.querySelectorAll('.photo-art').forEach((elem,index)=>{
        fixedUpdate(elem);
      });
    }
  }
  function fixedUpdate(elems){
    //vector3.forward() 
    // == miscarea rectilinie uniforma
    let varXY=  elems.getBoundingClientRect();
    console.log(varXY);
    let convertedPercentage=varXY.y*100/(window.innerHeight+varXY.height);
    /*
    if(convertedPercentage<40){
      convertedPercentage=40;
    }
    if(convertedPercentage>60){
      convertedPercentage=60;
    }*/
    console.log(convertedPercentage);
    if(varXY.y<window.innerHeight+varXY.height &&varXY.y>-varXY.height){
      elems.animate({objectPosition:`center ${convertedPercentage}%`},{duration:500, fill:'forwards'});

    } 
  }

  //start anim when bottom = -height of element
  //end anim when bottom =height of screen
  //convert (current bottom)*100/(1080px +height of elem )






  //display generated grid
  
  

  
  
  function randomClass(imgObj){
    let randomNumb=Math.random()*20 ;
    if(randomNumb<1){
      imgObj.classList.add('tall');
      currLayout.push('tall');
    }
     else if(randomNumb>=1 && randomNumb<2){
      imgObj.classList.add('wide');
      currLayout.push('wide');
    }
   else  if(randomNumb>=4 && randomNumb<6){
      imgObj.classList.add('wide');
      imgObj.classList.add('tall');
      currLayout.push('tall wide');
    }
    else{
      currLayout.push(' ');
    }
  
  }