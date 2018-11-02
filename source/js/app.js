var projectsJSONSource = "/assets/js/json/projects.json";
var upcomingProjectsJSONSource = "/assets/js/json/upcoming-projects.json";

$(document).ready(function() {

  // Function To fill Skill bar using attribute
  $('.skill-fill').each(function(index) {
    var fillAmount = $(this).attr("data-fill");
    $(this).css("width", fillAmount + "%");
    $(this).attr("title", fillAmount);
  });


});

function printProjectObject(projectObject, classname) {
  var divs = document.getElementsByClassName(classname);
  for (var i = 0; i < divs.length; i++) {
    var printLayout = '<section><h3>'
                      + projectObject[i].heading +
                      '</h3><p class=\"project-status\">Status : '
                      + projectObject[i].status
                      + '</p><p>' + projectObject[i].paragraph
                      + '</p><div class=\"btn btn-solid btn-square\"><a href=\"\">Learn More &gt;&gt;</a></div></section>';
    divs[i].innerHTML = printLayout;
  }
}

function getProjectData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var projectData = JSON.parse(xhttp.response);
     printProjectObject(projectData, '--js-isWorking');
    }
  };
  xhttp.open("GET", projectsJSONSource, true);
  xhttp.send();
}

function getUpcomingProjectData() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var upcomingProjectData = JSON.parse(xhttp.response);
     printProjectObject(upcomingProjectData, '--js-isUpcoming');
    }
  };
  xhttp.open("GET", upcomingProjectsJSONSource, true);
  xhttp.send();
}

function onLoadFunctions () {
  //JSON Functions
  getProjectData();
  getUpcomingProjectData();
}

window.onload = onLoadFunctions;


// TODO: Do Commenting for whole JS
