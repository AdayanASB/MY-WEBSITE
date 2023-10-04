
let letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';


let devText= document.querySelector('.developer');
devText.onmouseover=function(event){
  let iterration=0;

    let interval=setInterval(()=>{
      devText.innerText=devText.innerText.split("").map((letter, index)=>
      {
        if(iterration>=devText.dataset.text.length){
          console.log('this is index rn '+index);
          console.log('this is the text[index] '+devText.dataset.text[index]);
          return devText.dataset.text[index];
  
        }
        
        let randomletter=letters[Math.floor(Math.random()*26)];
        console.log('random letter rn ' +randomletter);
      return randomletter;
        
      }).join(""); 
    
      if(iterration>9){clearInterval(interval);}
      iterration+=1/3;
    
    console.log(iterration);
  
    },30);

  



};