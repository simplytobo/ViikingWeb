function validate()
{
  
  var email = document.getElementById("email").value;
  var yourfeedback = document.getElementById("yourfeedback").value;
  var error_message = document.getElementById("error_message");
  var success_message = document.getElementById("success_message");

  var text;
  
  if( email.indexOf("@") == -1 || email.length < 6 )
  {
    text = "Sisestage kehtiv email";
    error_message.style.padding = "10px";
    error_message.innerHTML = text;
  }
  
  if(yourfeedback.length <= 30)
  {
    text = "Palun kirjutage rohkem kui 30 sõna";
    error_message.style.padding = "10px";
    error_message.innerHTML = text;

  }
  else{
    text = "Tagasiside saadetud";
    success_message.style.padding = "10px";
    success_message.innerHTML = text;
  }
}