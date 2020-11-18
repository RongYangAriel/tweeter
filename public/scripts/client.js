/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetDate = 
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
}

const createTweetElement = (data) => {
  return  ` <article class = 'tweet'>
          <header>
            <div class = 'name'>
              <image src="${data.user.avatars}"/>
              <span>${data.user.name}</span>
            </div>
            <div class="account">
              <span>${data.user.handle}</span>
            </div>
          </header>
          <p>
          ${data.content.text}
          </p>
          <footer>
            <div class = 'date'>
            ${data.created_at}
            </div>
            <div class = "action">
               icons
            </div>
          </footer>
        </article>`
}
const $tweet = createTweetElement(tweetDate);



$(document).ready(function() {
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('.tweet-container').append($tweet);

});