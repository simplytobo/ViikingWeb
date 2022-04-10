var SUPABASE_URL = 'https://tzayehrdabqfecpwtcpb.supabase.co'
var SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NDI1MTUwNywiZXhwIjoxOTU5ODI3NTA3fQ.mpynGhKKTaoMxQQU_VXU3FvmPSVVNin9kkcBCgW6TSI'

const { createClient } = supabase;
supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
//var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

const inputEmail =  document.getElementById("login-input-email");
const inputPassword =  document.getElementById("login-input-pass");
const signUpBtn =  document.getElementById("signup-button-id");
const signInBtn =  document.getElementById("login-button-id");
const loginScreen  =  document.getElementById("login-screen-id");
const mainScreen = document.getElementById("main-screen-id");
const profileScreen = document.getElementById("profile-screen-id");
const profileButton = document.getElementById("profile-screen-button-id");
const vikingButton = document.getElementById("viking-logo");
const loadingScreen = document.getElementById("loading-screen-id");
const optionsWrapper = document.getElementById("optionsWrapperId");
const optionsNextBtn = document.getElementById("optionsNextBtnId");
const optionsScreen = document.getElementById("optionsScreenId");
const changeClass =  document.getElementById("change-class");
const logOutBtn = document.getElementById("log-out-div-id");
const ekoolScreenLogin = document.getElementById("ekool-login-id");
const ekoolButton = document.getElementById("mainoption3-id");
const logInEkoolBtn = document.getElementById("logInEkool");
const eKoolEmail = document.getElementById("eKoolEmail");
const eKoolPassword = document.getElementById("eKoolPassword");
const feedWrapper = document.getElementById("feedWrapper");
const ekoolFeedScreen = document.getElementById("ekoolFeedScreen");
const feedHeaderUserName = document.getElementById("feedHeaderUserName");
const mainoption1 = document.getElementById("mainoption1-id");
const timetableScreen = document.getElementById("timetable-id");
const inlinediv = document.getElementById("inlinediv");
const foodScreen = document.getElementById("foodScreen");
const gradesScreen = document.getElementById("gradesScreen");
const feedHeaderRefreshBtn = document.getElementById("feedHeaderRefreshBtn");
const tasksScreen = document.getElementById("tasksScreen");
const allTasksWrapper =  document.getElementById("allTasksWrapper");
const timetableBackBtn =  document.getElementById("timetableBackBtn");
const foodBackBtn =  document.getElementById("foodBackBtn");
const premBackBtn =  document.getElementById("premBackBtn");

let userData = {
  ekoolAccessToken: "",
  ekoolRefreshToken: "",
  darkMode: "",
  className: "",
  ekoolFeed:{}
}
if (getCookie("ekoolAccessToken") != ""){
  console.log("token saved")
  userData.ekoolAccessToken = getCookie("ekoolAccessToken");
} 
var registration = null;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(function(reg) {
        console.log("service worker registered");
        registration = reg;
      })
      .catch(err => console.log("service worker not registered", err))
  })
}
try {
Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});
}

catch(e){

}

function displayNotification() {
  if (Notification.permission === 'granted') {    
    registration.showNotification('Scanned an item');    
  }
}

function displayNotificationWithOptions() {  
  var options = {
    body: 'Notification from Viiking',
    icon: 'images/e-viikinglogo.png',
    vibrate: [100, 50, 100],
    data: { primaryKey: 1 } // allows us to identify notification
  };
  registration.showNotification('Found blacklisted item', options);
}

function displayNotificationWithActions() {
  var options = {
    body: 'Notification from Viiking',
    actions: [
      {action: 'notificationexplore', title: 'Go to the site', icon: 'images/e-viikinglogo.png'},
      {action: 'notificationclose', title: 'No thank you', icon: 'images/e-viikinglogo.png'},
    ]
  };
  registration.showNotification('Some text', options);
}

navigator.serviceWorker.addEventListener('message', event => {
  console.log(event.data.message);
});



timetableBackBtn.addEventListener("click", (e) => {
  timetableScreen.classList.add("hide");
  mainScreen.classList.remove("hide");


});

foodBackBtn.addEventListener("click", (e) => {
  foodScreen.classList.add("hide");
  mainScreen.classList.remove("hide");



});

premBackBtn.addEventListener("click", (e) => {
  premiumScreen.classList.add("hide");
  mainScreen.classList.remove("hide");


});


main1 = document.getElementById("mainoption1-id");

homebtns = document.querySelectorAll(".home-btn");

homebtns.forEach(homebtn => {
  homebtn.addEventListener("click", (e) => {

    console.log("homebtns clicked");
 
  profileScreen.classList.add("hide");
  ekoolScreenLogin.classList.add("hide");
  timetableScreen.classList.add("hide");
  ekoolFeedScreen.classList.add("hide");
  mainScreen.classList.remove("hide");


  main1.classList.add("active-tab");
  try{
    document.getElementById("menuToggle").checked = false;
  }catch{console.log("no homebtn: " + homebtn)}

  console.log("Clicked home button");
  
});
})


logOutBtn.addEventListener("click", (e) => {
  loadingScreen.classList.remove("hide");

  
  let allGood = logOutSupabase();
  
  if(allGood){
    document.location.reload(true);
    
  }else{
  loadingScreen.classList.add("hide");
  alert("log out error ");
  }

});


//EVENT LISTENERS for Log in Screen
signUpBtn.addEventListener("click", (e) => {
  console.log(inputEmail.value.length,  inputPassword.value.length );
 
  signUpToSupa().then((noErrors) =>{
  
    if(noErrors == true) {
      loginScreen.classList.add("hide");
      appendChildToSection({child:inlinediv, section: mainScreen});
      loadingScreen.classList.remove("hide");
      getUserData();
      setTimeout(() => {
      loadingScreen.classList.add("hide");
      optionsScreen.classList.remove("hide");
      }, 1200);
      
    }
    });

  
});

signInBtn.addEventListener("click", (e) => {
  signInToSupa().then((noErrors) =>{
    if(noErrors == true) {

      loginScreen.classList.add("hide");
  
      loadingScreen.classList.remove("hide");
  
      getUserData().then(()=>{
        if(userData.className) {
          getTimetable(userData.className);
          changeClass.classList.remove("blinking");
          changeClass.innerHTML = userData.className;
        }   
      })
     
       appendChildToSection({ child:inlinediv, section:mainScreen});
      setTimeout(() => {
      loadingScreen.classList.add("hide");
      mainScreen.classList.remove("hide");
  
  }, 1200);
    }
    }).catch(function (error) {
    alert("error in signInBtn " + error);
  })
});

//SUPABASE
async function signUpToSupa(){
  let noErrors = false;
  if(inputEmail.value.length >= 1 && inputPassword.value.length >= 1){
    
      const { user, session, error } = await supabase.auth.signUp({
      email: inputEmail.value,
      password: inputPassword.value,
       })
 
    
    if(error) alert("SignUp error " + error.message);
    if(!error) noErrors = true;
    
  }else{
    alert("Input fields are empty")
  }
  return noErrors;
}
async function signInToSupa(){
  let noErrors = false;
  if(inputEmail.value.length >= 1 && inputPassword.value.length>= 1){
      const { user, session, error } = await supabase.auth.signIn({
      email: inputEmail.value,
      password: inputPassword.value,
    })
    if(error) alert("SignUp error " + error.message);
    if(!error) noErrors = true;
  }else{
    alert("Input fields are empty")
  }
  return noErrors;
}
async function logOutSupabase(){

    const { user, session, error } = await supabase.auth.signOut();
    if(error) alert("signOut error " + error.message);
    if(!error) return true;
  

}


//Automatic log in
/*  if(supabase?.auth?.user()?.aud == 'authenticated') */
supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN'){
    getUserData().then(()=>{
      //Add timetable to website
      if(userData.className) {
        getTimetable(userData.className);
        
        changeClass.classList.remove("blinking");
        changeClass.innerHTML = userData.className;
        
      }
    });
    
      loginScreen.classList.add("hide");
  
      loadingScreen.classList.remove("hide");
      
  
    setTimeout(() => {
      loadingScreen.classList.add("hide");
      mainScreen.classList.remove("hide");
      
     
    
      
    }, 320);
  }
  if (event == 'TOKEN_REFRESHED') console.log('TOKEN_REFRESHED', session)
  if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
  
});


//GET classes from supabase And add them to optionsScreen
selectSupabase();
async function selectSupabase(){
  
  const { data, error } = await supabase
    .from('tugTimetables')
    .select('classname')
    .order('classId')
    if(error) alert("selectSupabase error " + error.message);
    if(!error) createClassOptions(data)
 
}

function createClassOptions(classNames){
  
 for(let i = 0; i < classNames.length; i++){
  let option = document.createElement("div");
  option.classList.add("option");
/*   let option2 = document.createElement("p");
  option2.classList.add("option-text");
  option2.innerHTML = classNames[i].classname; */
  option.textContent = classNames[i].classname;
  optionsWrapper.appendChild(option);

 }
 var allOptions = optionsWrapper.querySelectorAll(".option"); 
 allOptions.forEach(function(elem) {
    elem.addEventListener("click", function() {
        //this function does stuff
     let selected =  optionsWrapper.querySelectorAll(".selected");
      selected.forEach(function(elem2){
        elem2.classList.remove("selected");
      });
      elem.classList.add("selected");

    });
});
}

//Sign up flow
optionsNextBtn.addEventListener("click", (e) => {
  if(optionsWrapper.querySelectorAll(".selected")== null){
    alert("Vali klass enne jätkamist")
  }else{
    let klass = optionsWrapper.querySelectorAll(".selected")[0].textContent
    //upsertClassName(klass).then(()=>{});
    setCookie("className", klass)
    let domain = "https://tyhg.edu.ee/tunniplaan/index_"+klass+".htm";
    $("#timetableiframe").attr("src",domain);   
    changeClass.classList.remove("blinking");
    changeClass.innerHTML = klass;
    getTimetable(klass);
  }
  optionsScreen.classList.add("hide");
  mainScreen.classList.remove("hide");
  
});

changeClass.addEventListener("click", (e) => {
  changeScreen({close:mainScreen , open:optionsScreen })
});

feedHeaderRefreshBtn.addEventListener("click", (e) => {
  
  feedHeaderRefreshBtn.style.animation =  "rotation 2s infinite linear";
  getEkoolFeed(userData.ekoolAccessToken).then(()=>{
    feedHeaderRefreshBtn.style.animation = "";
  }).catch(err =>{
    alert("error refreshing feed: " + err);
  })
  
  
});
async function ekoolBtn(currentScreen,screenToShow ){


 	// 1. DO WE HAVE Ekool ACCESS TOKEN?
  if(userData.ekoolAccessToken?.length != 0){
    //YES
    currentScreen.classList.add("hide");
    //ekool feed screen 
    ekoolFeedScreen.classList.remove("hide");
      //2. FEED GOTTEN?
      if(Object.keys(userData.ekoolFeed).length === 0){
        //NO --> GET FEED, calling api

         
          await getEkoolFeed(userData.ekoolAccessToken)
            .then(()=>{
            console.log(userData.ekoolFeed);
            //insertGradesToFeedWrapper(userData.ekoolFeed);
            
        })
        .catch(err =>{
          alert("Error at userData obj: " + err );
        })
    }
    else{
      //YES --> just get feed from local var and insert
      //Stupid--> overwrites current dom
      //insertGradesToFeedWrapper(userData.ekoolFeed);

    }
    
      
  }
  //NO ACCESS TOKEN --> SHOW EKOOL SIGN IN SCREEN
  else{
    ekoolScreenLogin.classList.remove("hide");
    await appendChildToSection({child:inlinediv, section: ekoolScreenLogin}); 
    if(currentScreen != ekoolScreenLogin) currentScreen.classList.add("hide");
  }
  
  loadingScreen.classList.add("hide");
};

logInEkoolBtn.addEventListener("click", (e) => {
  
  loadingScreen.classList.remove("hide");
  document.getElementById
  if(eKoolEmail.value && eKoolPassword.value){
    logInToEkool(eKoolEmail.value, eKoolPassword.value).then(bool =>{
      if(bool = true){
        ekoolScreenLogin.classList.add("hide");
        ekoolFeedScreen.classList.remove("hide");
      }
    })
  }else{
    alert("inputs empty");
  }
  

});

async function logInToEkool(email,password){

  await axios.post('https://eviiking.herokuapp.com/ekool/login', {
    email: email,
    password: password
  })
  .then(async function (response) {
    
    if(response.data?.error?.error_description == "Bad credentials"){
     alert ("Vale email või salasõna");
 
    }else{
      appendDataToEkoolScreen(response);
      return true
    }
  
  })  
  .catch(function (error) {
    
    alert("error in logInToEkool() " + error);
  });
  loadingScreen.classList.add("hide");
}

async function upsertAccTokenToSupa(accessToken,refreshToken){
  const { data, error } = await supabase
  .from('userProfiles')
  .upsert({ id: supabase.auth.user().id, ekoolAccessToken: accessToken, ekoolRefreshToken: refreshToken })
  if(error) console.log(error);
}

async function getEkoolFeed(accessToken){
console.log("getEkoolFeed()");
  await axios.post('https://eviiking.herokuapp.com/ekool/feed', {
    accessToken: accessToken
  })
  .then(async function (response) {
    console.log(response);
   userData.ekoolFeed =  response.data.feed;
   appendDataToEkoolScreen(response);
  })  
  .catch(function (error) {
    alert("error in getEkoolFeed(): " + error);
  });
}
async function getEkoolGradeData(accessToken){
console.log("getEkoolFeed()");
  await axios.post('https://eviiking.herokuapp.com/ekool/gradeData', {
    accessToken: accessToken
  })
  .then(async function (response) {
   console.log(response);
  
  })  
  .catch(function (error) {
    alert("error in getEkoolFeed(): " + error);
  });
}
async function getUserData(){
  const { data, error } = await supabase
  .from('userProfiles')
  .select()
  if(error) alert("Error at getUserData()" + error);
  if(data){
    
   if(data[0]) userData.ekoolAccessToken = data[0].ekoolAccessToken;
    //if(data[0]) userData.ekoolRefreshToken = data[0].ekoolRefreshToken;
    if(data[0]) userData.darkMode = data[0].darkMode;
    if(data[0] && !userData.className) userData.className = data[0].className;
  
  }
  
}

async function upsertClassName(className){
  const { data, error } = await supabase
  .from('userProfiles')
  .upsert({id: supabase.auth.user().id,className: className})
  if(error) console.log(error);
  
}
function insertGradesToFeedWrapper(feedItems){
  feedWrapper.innerHTML = "";
  for(let i = 0; i < feedItems.length; i++){

    if(!feedItems[i].abbr) continue;
    if(feedItems[i].actionType == 3) continue;

    let feedItemWrapper = document.createElement("div");
    let feedItemGrade = document.createElement("div");
    let feedItemInfoWrapper = document.createElement("div");
    let feedItemLessonName = document.createElement("div");
    let feedItemDescription = document.createElement("div");
    let feedItemTeacher = document.createElement("div");

    feedItemWrapper.classList.add("feedItemWrapper");
    feedItemGrade.classList.add("feedItemGrade");
    feedItemInfoWrapper.classList.add("feedItemInfoWrapper");
    feedItemLessonName.classList.add("feedItemLessonName");
    feedItemDescription.classList.add("feedItemDescription");
    feedItemTeacher.classList.add("feedItemTeacher");



    if(feedItems[i].authorName) feedItemTeacher.innerHTML = feedItems[i].authorName;
    if(feedItems[i].abbr) feedItemGrade.innerHTML = feedItems[i].abbr;
    if(feedItems[i].gradeTypeId){
     feedItemDescription.innerHTML = gradeType(feedItems[i].gradeTypeId);
    } 
    if(feedItems[i].textContent) feedItemDescription.innerHTML += feedItems[i].textContent;
    if(feedItems[i].subjectName) feedItemLessonName.innerHTML = feedItems[i].subjectName;
    
    
    feedItemInfoWrapper.appendChild(feedItemLessonName);
    feedItemInfoWrapper.appendChild(feedItemDescription);
    feedItemInfoWrapper.appendChild(feedItemTeacher);
    
    feedItemWrapper.appendChild(feedItemGrade);
    feedItemWrapper.appendChild(feedItemInfoWrapper);

    if(feedItems.length - 1 == i) feedItemWrapper.style.marginBottom = "60vh";
    
    feedWrapper.appendChild(feedItemWrapper);
  }
 
}
function gradeType(id){
  if(id == 18) return "Kursusehinne ";
  if(id == 1) return "Tunnihinne ";
  if(id == 5) return "Kontrolltöö ";
}
function appendChildToSection(data){
      let child = data.child;
      let section = data.section;
      
      let clone =  child.cloneNode(true);

      navbarBtnClicks({screenNow: section,btn:clone.querySelector("#mainoption1-id"), show: timetableScreen, function1: null })
      navbarBtnClicks({screenNow: section,btn:clone.querySelector("#mainoption2-id"), show: foodScreen, function1: null })
      navbarBtnClicks({screenNow: section,btn:clone.querySelector("#mainoption3-id"), show: ekoolFeedScreen, function3: ekoolBtn })
      navbarBtnClicks({screenNow: section,btn:clone.querySelector("#mainoption4-id"), show: gradesScreen, function1: null })
      navbarBtnClicks({screenNow: section,btn:clone.querySelector("#mainoption5-id"), show: tasksScreen, function5: showStudentTasks })
      clone.classList.remove("hide");
  
      if(section.querySelectorAll('#inlinediv').length == 0) section.appendChild(clone);
}
function navbarBtnClicks(data){
  let screenToShow = data.show;
  let currentScreen = data.screenNow;
  let btn = data.btn;
  let CLekoolBtn = data.function3;
  let CLshowStudentTasks = data.function5;
    if (screenToShow && currentScreen && btn) {
      btn.addEventListener("click",(e)=>{
        loadingScreen.classList.remove("hide");
        appendChildToSection({child:inlinediv, section:screenToShow});
        if (CLekoolBtn) {
            CLekoolBtn(currentScreen,screenToShow).then(()=>{
              loadingScreen.classList.add("hide");
            }).catch(err=>{
            
            });     

        }
        else if(CLshowStudentTasks){
          CLshowStudentTasks(currentScreen,screenToShow).then(()=>{
            console.log("CLshowStudentTasks");
              loadingScreen.classList.add("hide");
            }).catch(err=>{});
        }
        else{
          currentScreen.classList.add("hide");
          screenToShow.classList.remove("hide");
          loadingScreen.classList.add("hide");  
        }
        
 
    })
  }
}

/* function openTugFoodSite(){
  var myWindow = window.open("https://view.officeapps.live.com/op/embed.aspx?src=https://www.tyhg.edu.ee/wp/wp-content/uploads/2022/02/21-25.02-Koolilouna-menuu.docx", "Tüg Koolitoit","top=200px");
} */

function appendDataToEkoolScreen(response){
    if(!userData.accessToken){
      setCookie("ekoolAccessToken",response.data.ekool.accessToken,14)
     //upsertAccTokenToSupa(response.data.ekool.accessToken, "");
    }
    if(response.data.ekool.accessToken != "") {
      userData.ekoolAccessToken = response.data.ekool.accessToken
    }
    userData.ekoolFeed = response.data.feed;
  
    if(response.data?.personData?.name1) {
      feedHeaderUserName.innerHTML = response.data.personData.name1;
    }else{
      feedHeaderUserName.innerHTML = "Error";
    }
    insertGradesToFeedWrapper(userData.ekoolFeed);
}
async function showStudentTasks(currentScreen,screenToShow) {
  if(allTasksWrapper.querySelectorAll(".dayWrapper").length > 1){
    currentScreen.classList.add("hide");
    screenToShow.classList.remove("hide");
    return
  }
  if(userData.ekoolAccessToken){
    currentScreen.classList.add("hide");
    screenToShow.classList.remove("hide");
    let tasks = {};
    await getStudentTasks(userData.ekoolAccessToken).then(function (tasks){
  
      upsertTasksToDom(tasks);
    })
  }else{
    //Shows ekool log in screen
    currentScreen.querySelector("#mainoption3-id").click();
  }
}
function upsertTasksToDom(tasks) {
 console.log(tasks);
      tasks.sort(function (a, b) {
      return a.orderTimestampLong - b.orderTimestampLong;
      });

      tasks.forEach((task,index) =>{
        let  allTasksWrapper =  document.getElementById("allTasksWrapper");
     
        let taskWrapper = createElem("div",{className:"taskWrapper"});
        let taskHeader = createElem("div",{className:"taskHeader"});
        let taskContent = createElem("div",{className:"taskContent"});
        let taskInfo =createElem("div",{className:"taskInfo"});       
        let dayHeader = createElem("div",{className:"dayHeader"});
        let dayHeaderSpan = createElem("dateDiv",{className:"dayHeaderSpan"});
        let dayWrapper = createElem("dayDiv",{className:"dayWrapper"});
        
        
        if(task.title) taskHeader.innerHTML = task.title;
        if(task.subjectName) taskInfo.innerHTML = task.subjectName + " , ";
        if(task.typeId) taskInfo.innerHTML += homeworkType(task.typeId);
        if(task.content)taskContent.innerHTML = task.content;
        if(task.deadLine) {
          dayHeaderSpan.innerHTML = task.deadLine;
           dayHeaderSpan.innerHTML += " - " + whatDay(task.deadLine);
          dayHeader.innerHTML = daysleft(task.deadLine);
        }
        //default currently
       
        
        taskWrapper.append(taskHeader,taskContent,taskInfo);
        dayHeader.appendChild(dayHeaderSpan);
        
        const cells = Array.from(document.getElementsByTagName('dayDiv'));
        let dateExists ="";
        cells.forEach((cell) => {
          let dateDiv = cell.getElementsByTagName("dateDiv")[0].innerHTML
          let date = dateDiv.split(" ")
          if(date[0] == task.deadLine){
            dateExists = cell;
            return
          }
        });
        
        if(dateExists){
          dateExists.appendChild(taskWrapper);
        }
        else{
          dayWrapper.appendChild(dayHeader);
          dayWrapper.appendChild(taskWrapper);
          allTasksWrapper.appendChild(dayWrapper);
        }
       
      })
}

async function getStudentTasks(accessToken){
  let today = formatDate(new Date());
  let inTwoWeeks = new Date();
  let tasks = "";
  
  inTwoWeeks.setDate(inTwoWeeks.getDate()+14);
  
  inTwoWeeks = formatDate(new Date(inTwoWeeks));
  console.log("getStudentTasks()");
  //alert("today: "+today +" intwoweeks: " + inTwoWeeks);
  await axios.post('https://eviiking.herokuapp.com/ekool/studentTasks', {
    accessToken: accessToken,
    start: today,
    end: inTwoWeeks
  })
  .then(function (response) {
   
    tasks = response.data.tasks.eventList;

  })  
  .catch(function (error) {
    alert("error in getStudentTasks(): " + error);
  });
  return tasks;
}
function homeworkType(id){
  if(id == 18) return "Kursusehinne ";
  if(id == 1) return "Kodune ülesanne ";
  if(id == 5) return "Kontrolltöö ";
}

function changeScreen(screen){
  screen.close.classList.add("hide")
  screen.open.classList.remove("hide")
}

/* var emptyAtStart = document.getElementById(timetable-today-id);

if(emptyAtStart.innerHTML.length == 0) {
  emptyAtStart.innerHTML == "Vali klass";
} */



appendChildToSection({ child:inlinediv, section:mainScreen});
let className = getCookie("className");
if(!className) console.log("no cookie(classname)")
userData.className = className;
console.log(getCookie("className")) 

if(className){
let domain = "https://tyhg.edu.ee/tunniplaan/index_"+className+".htm"
$("#timetableiframe").attr("src",domain);  
changeClass.classList.remove("blinking");
changeClass.innerHTML = className;
} 

const images = document.querySelectorAll('.lazy-image')
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const image = entry.target
      image.src = image.dataset.src;
      image.classList.remove('lazy-image')
      imageObserver.unobserve(image)
    }
  })
})

images.forEach((image) => {
  imageObserver.observe(image)
})

$("#MenuHamburger").on('click', function (e) {
var menu = document.querySelector('#st-container');
  $("#closeNav").removeClass("hide")
  menu.classList.toggle("st-effect-1");
  menu.classList.toggle('st-menu-open');
  console.log();
});



$("#sidenav-premium").on('click', function (e) {
  //var premiumScreen = document.getElementById('premiumScreen');
  $("#main-screen-id").addClass( "hide" )
  $("#premiumScreen").removeClass("hide")
  //appendChildToSection({ child:inlinediv, section:premiumScreen});
});

$("#sidenav-tagasiside").on('click', function (e) {
  //var premiumScreen = document.getElementById('premiumScreen');
  $("#main-screen-id").addClass( "hide" )
  $("#feedback-form-id").removeClass("hide")
  //appendChildToSection({ child:inlinediv, section:premiumScreen});
});

$("#tagasisideBackBtn").on('click', function (e) {
  //var premiumScreen = document.getElementById('premiumScreen');
  $("#main-screen-id").removeClass( "hide" )
  $("#feedback-form-id").addClass("hide")
  //appendChildToSection({ child:inlinediv, section:premiumScreen});
});
$("#closeNav").on('click', function (e) {
  //var premiumScreen = document.getElementById('premiumScreen');
  document.getElementById("MenuHamburger").click()
  $("#closeNav").addClass("hide")
  //appendChildToSection({ child:inlinediv, section:premiumScreen});
});


/* changeActive()
function changeActive(){
  inlindeDivs = document.querySelectorAll(".inlindediv") ;
  
  if (inlindeDivs.length > 1){
    for (inlindeDiv in inlindeDivs){
      console.log("inlindeDiv")
      console.log(inlindeDiv)
  }    
  }

} */
