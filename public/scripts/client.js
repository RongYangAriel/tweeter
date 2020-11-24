/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('#error').hide();
  loadTweets();
  submitTweet();
  if ($('#tweet-text').focus(function() {
    $('#error').hide();
  }));
})

// render each tweet, prepend it to tweets html
function renderTweets(tweets){
  console.log('render Tweets', tweets);
  $('.tweet-container').empty();
  tweets.forEach(tweet => {
    $('.tweet-container').prepend(createTweetElement(tweet));
  });
  $('#tweet-text').val('');
}

// an escape function
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


// create each tweet template
const createTweetElement = (tweet) => {
  const safeHTML = `<div class='content'>${escape(tweet.content.text)}</div>`
  return  ` <article class = 'tweet'>
          <header>
            <div class = 'name'>
              <image src="${tweet.user.avatars}"/>
              <div>${tweet.user.name}</div>
            </div>
            <div class="account">
              <div>${tweet.user.handle}</div>
            </div>
          </header>
          ${safeHTML}
          <footer>
            <div class = 'date'>
            ${time(tweet.created_at)} ago
            </div>
            <div class = "action">
              <a href="#"><i class="fa fa-flag"></i></a>
              <a href="#"><i class="fa fa-retweet"></i></a>
              <a href="#"><i class="fa fa-heart"></i></a>
            </div>
          </footer>
        </article>`;
}

// send post request to /tweets, update new tweet
function submitTweet() {
  $( "#form" ).submit(function( event ) {
  event.preventDefault();
  if (validateTweet($( this ).serialize())) {
    $.ajax('/tweets', { method: "POST", data: $( this ).serialize()})
    .then(() => loadTweets())
    .catch(console.log('Post tweet going wrong'));
  }
  console.log('button clicked');
  }); 
}

// get tweets from /tweets, sent it to renderTweets()
const loadTweets = () => {
  $.ajax('/tweets', {method: 'GET'})
  .then(newtweets => renderTweets(newtweets))
  .catch(console.log("Loading tweets going wrong"));
}

// validate tweet before submit it to /tweets
const validateTweet = (tweet) => {
  if ($('.counter').text() < 0){
    $("#error").html("<i class='material-icons'>&#xe002;</i> Tweet is too long! Please shorten it!! <i class='material-icons'>&#xe002;</i>");
    $("#error").show();
    return false;
  } else if (tweet === 'text=') {
    $("#error").html("<i class='material-icons'>&#xe002;</i> Tweet is empty. Please enter something! <i class='material-icons'>&#xe002;</i> ");
    $("#error").show();
    return false;
  } else {
    $('#error').hide();
    return true
  }
}

// convert integre to how long ago for each tweet
const time = (tweetTime) => {
  let seconds = Math.floor((new Date - tweetTime) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}



