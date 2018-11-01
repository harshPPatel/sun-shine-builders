$(document).ready(function() {

  // Function To fill Skill bar using attribute
  $('.skill-fill').each(function(index) {
    var fillAmount = $(this).attr("data-fill");
    $(this).css("width", fillAmount + "%");
    $(this).attr("title", fillAmount);
  });
});
