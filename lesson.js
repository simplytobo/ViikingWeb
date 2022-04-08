const lessonDuration = document.getElementById("next-lesson-duration-p-id")
const lessonNext = document.getElementById("next-lesson-p-id")
const lessonClassroom = document.getElementById("next-lesson-classroom-p-id")
var columnWrapper = document.createElement("div");
var todaywrapper = document.getElementById("timetable-today-id");


let Tähendused = {
  "mate": "Matemaatika",
  "vekb": "Vene keel",
  "sak": "Saksa keel",
  "vek": "Vene keel",
  "his": "Ühiskond",
  "kirj": "Kirjandus",
  "eek": "Eesti keel",
  "int": "Järeltööd",
  "muus": "Muusika",
  "digi": "Digitoote disain",
  "koor": "Koor",
  "ink": "Inglise keel",
  "loke": "Looduse grupp?",
  "hik": "Hispaania keel",
  "prk": "Prantsuse keel",
  "sok": "Soome keel",
  "jaap": "Jaapani keel",
  "keem": "Keemia",
  "bio": "Bioloogia",
  "filo": "Filosoofia",
  "kk": "Kehaline Kasvatus",
  "klju": "Klassijuhataja",
  "geo": "Geograafia",
  "teat": "Teater",
  "meed": "Meedia",
  "aja": "Ajalugu",
  "geoi": "Geoinformaatika",
  "erip": "?Õpiabi?",
  "kuns": "Kunst",
  "f": "Füüsika",
  "ps": "Psühholoogia?",
  "riig": "Riigikaitse",
  "prak": "Keemia?",
  "rakb": "Rakubioloogia",
  "t": "Tööõpetus",
  "log": "Logopeed",
  "tehn": "Ehituskool",
  "ktk": "Käsitöö",
  "lkoo": "Lastekoor",
  "inim": "Inimeseõpetus",
  "soom": "Soome keel",
  "lood": "Loodus",
  "arv": "Arvutiõpetus",
  "mkoo": "Mudilaskoor",
  "ld": "Üld?",
  "pia": "Õpiabi",
  "rtm": "Rütmika",
  "pikk": "Pikapäeva rühm",
  "vabatund": "-",
}

let Õpetajad = {
  "niit": "Lilian Niitsoo",
  "rein": "Liivi Reinert",
  "aade": "Aade Erits",
  "kink": "Marika Kink",
  "saar": "Helen Saarts",
  "amor": "Cristina	Amoros Prados",
  "pete": "Zoja Peterson",
  "tarv": "Aili Tarvo"
}
let timetable;

getTimetable(className);
async function getTimetable(className) {

  if (!className) return console.log("ERROR: getTimetable() no className ")
  const { data, error } = await supabase
    .from('tugTimetables')
    .select("*")
    .eq("classname", className.toUpperCase())
  if (error) {
    console.log(error);
    return error.message
  }
  timetable = data[0].timetable
  //TimeTableToDom(timetable);

  LessonsToMainScreen(timetable)

}
setInterval(loop, 20000);

function loop() {
  let time = new Date()
  console.log("updating..." + time.getMinutes())
  if (timetable) LessonsToMainScreen(timetable)
}

function päev() {
  var today = new Date();
  let dayNum = today.getDay();
  let day = "";
  if (dayNum == 0) day = "Esmaspäev";
  if (dayNum == 1) day = "Esmaspäev";
  if (dayNum == 2) day = "Teisipäev";
  if (dayNum == 3) day = "Kolmapäev";
  if (dayNum == 4) day = "Neljapäev";
  if (dayNum == 5) day = "Reede";
  if (dayNum == 6) day = "Esmaspäev";
  $("#today-text-id").text(day)
}
päev();

let lesStart = ["08:00", "08:55", "09:50", "10:45", "11:45", "13:05", "14:00", "14:55", "15:50", "16:45", "17:30"]
function LessonsToMainScreen(timetable) {

  //"2022/03/10 09:00"
  var today = new Date();
  let dayNum = today.getDay();
  var currentTime = ("0" + today.getHours()).slice(-2) +
    ":" + ("0" + today.getMinutes()).slice(-2);


  if (dayNum >= 1 && dayNum <= 5) {
    console.log(currentTime)
    LessonsHeaderInfo("00:00", "08:00", lesStart[0], dayNum, 1, currentTime);
    LessonsHeaderInfo("08:01", "08:55", lesStart[1], dayNum, 2, currentTime);
    LessonsHeaderInfo("08:56", "09:50", lesStart[2], dayNum, 3, currentTime);
    LessonsHeaderInfo("09:51", "10:45", lesStart[3], dayNum, 4, currentTime);
    LessonsHeaderInfo("10:46", "11:45", lesStart[4], dayNum, 5, currentTime);
    LessonsHeaderInfo("11:46", "13:05", lesStart[5], dayNum, 6, currentTime);
    LessonsHeaderInfo("13:06", "14:00", lesStart[6], dayNum, 7, currentTime);
    LessonsHeaderInfo("14:01", "14:55", lesStart[7], dayNum, 8, currentTime);
    LessonsHeaderInfo("14:56", "15:50", lesStart[8], dayNum, 9, currentTime);
    LessonsHeaderInfo("15:51", "16:45", lesStart[0], dayNum + 1, 1, currentTime);
    LessonsHeaderInfo("16:46", "23:59", lesStart[0], dayNum + 1, 1, currentTime);
  }

  else {

    console.log("dayNum " + dayNum)
    LessonsHeaderInfo("00:00", "23:59", lesStart[0], 1, 1, currentTime);
  }

}



function LessonsHeaderInfo(start, end, lesStart, dayNum, lessonNum, currentTime) {
  if (start <= currentTime && currentTime <= end) {


    let data = getLessonData(dayNum, lessonNum);
    if (data.lesson == "-") {
      data = nextNonEmptyLessonIs(dayNum, lesStart)
      lesStart = data.lesStart
    }
    let lesson = data.lesson;
    let classroom = data.classroom;
    if (lesStart != "") lessonDuration.innerHTML = lesStart + "-" + addtime(lesStart, 45);
    lessonNext.innerHTML = lesson
    if (lesson == "-") lessonNext.innerHTML = "Vaba Tund"
    lessonClassroom.innerHTML = classroom

  }
}

function nextNonEmptyLessonIs(dayNum) {
  let lesson1;
  let classroom1;
  let lesStart1 = "08:55";
  for (let i = 1; i < 9; i++) {
    let { lesson, classroom } = getLessonData(dayNum, i);
    if (lesson != "-") {
      lesson1 = lesson;
      classroom1 = classroom;
      lesStart1 = lesStart[i - 1];
      break
    }
  }
  return { "lesson": lesson1, "classroom": classroom1, "lesStart": lesStart1 }
}


function getLessonData(dayNum, lessonNum) {

  dayNum = dayNum.toString();
  lessonNum = lessonNum.toString();
  var lesson = "";
  var classroom = "";
  if (timetable[dayNum] && timetable[dayNum][lessonNum]) {
    lesson = timetable[dayNum][lessonNum].className1
    lesson = formatLesson(lesson);
    TimeTableToDom(dayNum, lessonNum);
    classroom = timetable[dayNum][lessonNum].classNum1
  }

  return { "lesson": lesson, "classroom": classroom }


}
function TimeTableToDom(dayNum, lessonNum) {
  todaywrapper.innerHTML = ""
  Object.keys(timetable[dayNum]).forEach((i) => {
    //console.log(timetable[dayNum][i])
    var tundWrapper = createElem("div.tundWrapper");
    var tund = createElem("div.tund");
    var tunniNum = createElem("div.tunniNum.font-dark");
    let lesson = formatLesson(timetable[dayNum][i].className1);
    if (i < lessonNum - 1) {
      tundWrapper.classList.add("font-dark")
    }
    if (i == lessonNum - 1 && lesson != "-") {
      tund.classList.add("praegune-tund")
    }
    lesson = formatLesson(timetable[dayNum][i].className1);

    let lessonInfo = timetable[dayNum][i];
    tund.textContent = lesson
    tunniNum.textContent = i
    tundWrapper.addEventListener("click", function() {
      openOverlay(lessonInfo, i)
    })
    tundWrapper.append(tunniNum, tund);
    todaywrapper.appendChild(tundWrapper);

  })

}

function formatLesson(lesson) {
  let clone = lesson
  lesson = lesson.toLowerCase()
  lesson = lesson.replace(/[0-9]/g, '');
  lesson = lesson.replace(/[^\w\-]+/g, '')

  lesson = Tähendused[lesson]

  if (lesson == void 0) return clone

  return lesson
}
function formatTeacher(teacher) {
  let clone = teacher
  teacher = teacher.toLowerCase()
  teacher = teacher.replace(/[0-9]/g, '');
  teacher = teacher.replace(/[^\w\-]+/g, '')
  teacher = Õpetajad[teacher]
  if (teacher == void 0) return clone

  return teacher
}
function openOverlay(lessonInfo, i) {
  let lessonDuration = lesStart[i - 1] + "-" + addtime(lesStart[i - 1], 45);
  $("#overlayScreen").removeClass("hide")
  $("#main-screen-id").addClass("blur")
  $("#olNum").text(i + ". tund")
  $("#olLesson p").text(formatLesson(lessonInfo.className1));
  let text = lessonInfo.classNum1.toString().substring(0, 3)
  $("#olClass").text(text)
  $("#olTeacher").text(formatTeacher(lessonInfo.teacher1))

  $("#olTimes").text(lessonDuration)
  $("#olLesson").on('click', function(e) {
    $("#optionsDropdown").removeClass("hide");
    showLessonOptions(lessonInfo);
  });
}

$("#overlayScreen").on('click', function(e) {
  if ($(e.target).closest("#overlayBoxWrapper").length === 0) {
    $("#main-screen-id").removeClass("blur")
    $("#overlayScreen").addClass("hide")
    $("#optionsDropdown").addClass("hide");
  }
});

function showLessonOptions(lessonInfo) {

}