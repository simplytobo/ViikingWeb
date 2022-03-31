

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('.');
}

function whatDay(ekoolDate) {
  var text = ""
  date = ekoolDate.split(".");
  dd2 = date[0];
  mm2 =date[1];
  yyyy2 = date[2];
  date = new Date(yyyy2,mm2-1,dd2);
  day = date.getDay();
  
  if(day == 0) {text += "Pühapäev"}
  if(day == 1) {text +=  "Esmaspäev"}
  if(day == 2) {text +=  "Teisipäev"}
  if(day == 3) {text +=  "Kolmapäev"}
  if(day == 4) {text +=  "Neljapäev"}
  if(day == 5) {text +=  "Reede"}
  if(day == 6) {text +=  "Laupäev"}

  return text
}

function daysleft(ekoolDate) {

  date = ekoolDate.split(".");
  dd2 = date[0];
  mm2 =date[1];
  yyyy2 = date[2];
  date = new Date(yyyy2,mm2-1,dd2);
  day = date.getDay();
  
  //Today
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if(dd<10)  dd='0'+dd;
  if(mm<10)  mm='0'+mm;
  
  const diffTime = Math.abs(date - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  if((yyyy2 == yyyy) && (mm2 == mm) && (dd2-1 == dd) )return  "Homsed Ülesanded"
  if((yyyy2 == yyyy) && (mm2 == mm) && (dd2 == dd) )return  "Tänased Ülesanded"
  if(diffDays) return diffDays + " Päeva jäänud"
  
}

function addtime(time,min){
var t = time.split(":"),      // convert to array [hh, mm, ss]
    h = Number(t[0]),         // get hours
    m = Number(t[1]);         // get minutes
m+= min % 60;                 // increment minutes
h+= Math.floor(min/60);       // increment hours
if (m >= 60) { h++; m-=60 }   // if resulting minues > 60 then increment hours and balance as minutes

return (h+"").padStart(2,"0")  +":"  
       +(m+"").padStart(2,"0")       
}  


