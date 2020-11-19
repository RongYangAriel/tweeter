/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  submitTweet();
});

// render each tweet, prepend it to tweets html
const renderTweets = (tweets) => {
  tweets.forEach(tweet => {
    $('.tweet-container').prepend(createTweetElement(tweet));
  })
}

// xss escape function
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (tweet) => {
  console.log(tweet);
  const safeHTML = `<p>${escape(tweet.content.text)}</p>`
  return  ` <article class = 'tweet'>
          <header>
            <div class = 'name'>
              <image src="${tweet.user.avatars}"/>
              <span>${tweet.user.name}</span>
            </div>
            <div class="account">
              <span>${tweet.user.handle}</span>
            </div>
          </header>
          <p>
          ${safeHTML}
          </p>
          <footer>
            <div class = 'date'>
            ${tweet.created_at}
            </div>
            <div class = "action">
               icons
            </div>
          </footer>
        </article>`
}

// send post request to /tweets, update new tweet
function submitTweet() {
  $( "#form" ).submit(function( event ) {
  event.preventDefault();
  if(validateTweet($( this ).serialize())) {
    $.ajax('/tweets', { method: "POST", data: $( this ).serialize()})
    .then(console.log($( this ).serialize()))
    .then(loadTweets());
  }
  }); 
}

// get tweets from /tweets, sent it to renderTweets()
const loadTweets = () => {
  $.ajax('/tweets', {method: 'GET'})
  .then(newtweet => renderTweets(newtweet));
}

// validate tweet before submit it to /tweets
const validateTweet = (tweet) => {
  if(tweet.length > 140){
    alert("Tweet is too long!")
  } else if(tweet == null) {
    alert("tweet is empty");
  } else {
    return true
  }
}



