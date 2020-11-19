$(document).ready(function() {
  // --- our code goes here ---
  console.log("I am ready");
  $("#tweet-text").keyup(function() {
    $("output.counter").text(140 -this.value.length);
    console.log('fired');
    if (140 - this.value.length < 0) {
      $("output.counter").css('color', 'red');
    } else {
      $("output.counter").css('color', '#545149')
    }
  })
});