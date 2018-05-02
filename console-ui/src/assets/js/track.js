var stage = ['one', 'two', 'three', 'four', 'remove'];
var track = 0;
$('#toggler').on('click', function () {
  console.log('clicking');
  $('.bulb-wrapper').attr('class', 'bulb-wrapper');
  $('.bulb-wrapper').addClass(stage[track % 5]);
  track++;
});

$('#track').on('click', function() {
  $('.page1').css('display', 'none');
  $('.page2').removeAttr('style');
});