function validate()
{
  var email = document.getElementById("email").value;
  var yourfeedback = document.getElementById("yourfeedback").value;
  var error_message = document.getElementById("error_message");
  
  error_message.style.padding = "10px";
  
  var text;
  
  if(email.indexOf("@") == -1 || email.length < 6)
  {
    text = "Sisestage kehtiv email";
    error_message.innerHTML = text;
    return false;
  }
  
  if(address.length <= 30)
  {
    text = "Palun kirjutage rohkem kui 30 sõna";
    error_message.innerHTML = text;
    return false;
  }
  
  alert("Tagasiside saadetud");
    return true;
}