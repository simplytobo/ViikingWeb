
//correct screen size on IPHONE



window.addEventListener('resize', () => {
  
  correctSizeMobile();
});
function correctSizeMobile(){
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
correctSizeMobile();
/* try {
 window.addEventListener("load", function(){
 
    let isIOS = /iPad|iPhone|iPod/.test(navigator.platform)
|| (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
//if(isIOS == true ) document.body.style.touchAction = "auto";

  if(isIOS == true ){
  
    document.getElementsByTagName("body")[0].style.touchAction = "auto";
  } 
}); 
} catch (error) {
  
}
*/
if(navigator.userAgent.indexOf("Safari") != -1)
{
   //document.getElementsByTagName("body")[0].style.touchAction = "pan-y";
   document.body.style.touchAction = "auto";
    document.body.style.overflow = "";
} 

