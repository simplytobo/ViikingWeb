
function setCookie(name, value, expireIn ){
  const d = new Date();
  if(!expireIn) expireIn = 3000 //days
  d.setTime(d.getTime() + (expireIn*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires+";";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
     
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function checkCookie(name) {
  let cookie = getCookie(name);
  if (cookie != "") {
    return true
    //alert("Welcome again " + user);
  } else {
    return false
  }
}

