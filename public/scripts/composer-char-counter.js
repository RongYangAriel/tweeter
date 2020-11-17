$(document).ready(function() {
  // --- our code goes here ---
  console.log("I am ready");
  $("#tweet-text").keydown(function() {
    $("output.counter").text(140 -this.value.length);
    if (140 - this.value.length < 0) {
      $("output.counter").css('color', 'red');
    }
  })
});