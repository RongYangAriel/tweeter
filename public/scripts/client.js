/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Test / driver code (temporary)
  submitTweet(event);
});


const tweetsData = 
[
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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


function submitTweet(event) {
  $( "#form" ).submit(function( event ) {
  event.preventDefault();
  $.ajax('/tweets', { method: "POST", data: $( this ).serialize()})
  .then(tweetsData.push( {"content": {'text':$( this ).serialize()}}))
  .then(renderTweets(tweetsData));
  }); 
}



