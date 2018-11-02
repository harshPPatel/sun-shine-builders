//  Variables for JSON Functions for fetching data from the .json file
var projectsJSONSource = "/assets/js/json/projects.json";
var upcomingProjectsJSONSource = "/assets/js/json/upcoming-projects.json";

$(document).ready(function() {

  //  Function    : jQuery Function
  //  Arguments   : index (index for all calsses with name of 'skill-functions')
  //  Variables   : fillAmount   => fetch the fill up value from the attribut in the HTML document.
  //  Description : fetch the fill up amaount, apply css rule to the skill-fill class

  $('.skill-fill').each(function(index) {
    var fillAmount = $(this).attr("data-fill");
    $(this).css("width", fillAmount + "%");
  });

});


//  Function    : printProjectObject
//  Arguments   : projectObject (an object from JSON file)
//                classname (to catch working and upcoming projects form HTML)
//  Variables   : divs        => get class for working or upcoming task
//                printLayout =>  an template to print data
//  Description : fetch data from JSON functions and print it in the formate of the provided
//                template.

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

//  Function    : getProjectData
//  Arguments   : none
//  Variables  :  xhttp        => creates new XMLHttpRequest in the function
//                projectData  => save data in variable from the JSON file
//  Description : fetch data from projects.json file in the json folder, make and http request,
//                save it in variable and print the data in provided layout.

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

//  Function    : getUpcomingProjectData
//  Arguments   : none
//  Variables  :  xhttp                 => creates new XMLHttpRequest in the function
//                upcomingProjectData   => save data in variable from the JSON file
//  Description : fetch data from upcoming-projects.json file in the json folder, make and http request,
//                save it in variable and print the data in provided layout.

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

//  Function    : onLoadFunctions
//  Arguments   : none
//  Variables  :  none
//  Description : List of function to be load when page is loaded

function onLoadFunctions () {
  //JSON Functions
  getProjectData();
  getUpcomingProjectData();
}


// Running onLoadFunctions while page loads

window.onload = onLoadFunctions;
