/**
 *  Variables for JSON Functions for fetching data from the .json file
 */
var projectsJSONSource = "/assets/js/json/projects.json";
var upcomingProjectsJSONSource = "/assets/js/json/upcoming-projects.json";
var testimonialSource = "/assets/js/json/testimonials.json";

/**
 *  Function      :   printProjectObject
 *  Arguments     :   projectObject =>  an object from JSON file
 *                    classname     =>  to catch working and upcoming projects form HTML
 *  Variables     :   divs          =>  get class for working or upcoming task
 *                    printLayout   =>  an template to print data
 *  Description   :   fetch data from JSON functions and print it in the formate of the provided
 *                    template.
 */
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

/**
 *  Function      :   printTestimonials
 *  Arguments     :   projectObject =>  an object from JSON file
 *                    i             =>  to catch i^th object in JSON Data
 *  Variables     :   div           =>  get element by ID of '--js-testimonial-content'
 *                    printLayout   =>  an template to print data
 *  Description   :   fetch data from JSON functions and print it in the formate of the provided
 *                    template.
 */
function printTestimonials(object, i) {
  i = i - 1; //TO convert normal number in 0 base so that will be easy to understand array process
  var div = document.getElementById('--js-testimonial-content');
  var printLayout = '<img src=\" /assets/img/testimonial-' + (i + 1) + '.jpg\"' +
  'alt=\"' + object[i].name + '"/>' +
  '<article><blockquote>' + object[i].testimonial + '</blockquote><p class=\"name\">' +
  object[i].name + '</p></article>'
  div.innerHTML = printLayout;
}

/**
 *  Function      :   getProjectData
 *  Arguments     :   none
 *  Variables     :   xhttp         =>  creates new XMLHttpRequest in the function
 *                    projectData   =>  save data in variable from the JSON file
 *  Description   :   fetch data from projects.json file in the json folder, make and http request,
 *                    save it in variable and print the data in provided layout.
 */
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

/**
 *  Function      :   getUpcomingProjectData
 *  Arguments     :   none
 *  Variables     :   xhttp                 =>  creates new XMLHttpRequest in the function
 *                    upcomingProjectData   =>  save data in variable from the JSON file
 *  Description   :   fetch data from upcoming-projects.json file in the json folder, make and http request,
 *                    save it in variable and print the data in provided layout.
 */
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

/**
 *  Function      :   getTestimonials
 *  Arguments     :   i                     =>  represents number of the testimonial-img in the HTML
 *  Variables     :   xhttp                 =>  creates new XMLHttpRequest in the function
 *                    testimonialObject     =>  save data in variable from the JSON file
 *  Description   :   fetch data from upcoming-projects.json file in the json folder, make and http request,
 *                    save it in variable and print the data in provided layout.
 */
function getTestimonials(i) {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var testimonialObject = JSON.parse(xhttp.response);
     printTestimonials(testimonialObject, i);
    }
  };
  xhttp.open("GET", testimonialSource, true);
  xhttp.send();
}
