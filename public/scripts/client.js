/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  submitTweet();
});


const renderTweets = (tweets) => {
  tweets.forEach(tweet => {
    $('.tweet-container').append(createTweetElement(tweet));
  })
}

const createTweetElement = (tweet) => {
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
          ${tweet.content.text}
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


const loadTweets = () => {
  $.ajax('/tweets', {method: 'GET'})
  .then(newtweet => renderTweets(newtweet));
}

const validateTweet = (tweet) => {
  if(tweet.length > 140){
    alert("Tweet is too long!")
  } else if(tweet == null) {
    alert("tweet is empty");
  } else {
    return true
  }
}



