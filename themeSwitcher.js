let chk = document.getElementById("squareoption4-id");
let chk1 = document.getElementById("squareoption3-id");
let chk2 = document.getElementById("squareoption2-id");
let chk3 = document.getElementById("squareoption1-id");

chk.addEventListener("click", (e) => {
  
  document.body.classList.toggle("dark-mode");
  $(chk).toggleClass('pfp-active'); 
  
});

chk1.addEventListener("click", (e) => {
  
  $(chk1).toggleClass('pfp-active');
  
});

chk2.addEventListener("click", (e) => {
  
  $(chk2).toggleClass('pfp-active');
  
});

chk3.addEventListener("click", (e) => {
  
  $(chk3).toggleClass('pfp-active');
  
});


function highlightButton() {


  
}
