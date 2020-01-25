// Javascript.html page

// AJAX
// JSON
// Javascript

// Local Storage getter
function getLocalStorageObj() {
  const localStorage = window.localStorage;
  return localStorage;
}

/**
 * Name: RandomNumGenerator
 * Description: Returns random integer based on upToNum(non-inclusive) argument
 *              passed to getNum method. ES5 Way
 * Type: Function Object
 * Returns: Integer
 */
const RandomNumGenerator = function() {
  this.getNum = function(upToNum) {
    return Math.floor(Math.random() * upToNum);
  };
};

/**
 * Name: Random
 * Description: Returns RandomNumGenerator Object
 * Returns: Object which includes getNum function
 */
const Random = new RandomNumGenerator();

/**
 * Name: initializer
 * Description: Checks if a user mood and gif url are already found in local storage
 *              if they are, they wil be appended to DOM element properties. Otherwise,
 *              HttpRequest is made via gifRequest function
 */
function initializer() {
  const localStorage = getLocalStorageObj();
  if (localStorage.getItem('mood') && localStorage.getItem('url')) {
    // Use DOM API to access innerText property of userMood header element
    document.getElementById('userMood').innerText = localStorage.getItem(
      'mood'
    );
    document.getElementById('mainImage').src = localStorage.getItem('url');
  } else {
    gifRequest();
  }
}

/**
 * Name: request
 * Description: AJAX request to Giphy's API and sets a random image
 *              based on user mood's
 * Returns: Single image url and sets image to DOM
 */
function gifRequest() {
  // Emotions array
  const EMOTIONS = [
    'Happy',
    'Funny',
    'Sad',
    'Angry',
    'Frustrated',
    'Nervous',
    'Confident',
    'Intelligent',
    'Ecstatic',
    'Romantic',
    'Confused',
    'Bored',
  ];

  // Gets random emotion from EMOTIONS array
  let randomEmotion = Random.getNum(EMOTIONS.length);

  const request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    // if the request was successful
    if (this.readyState == 4 && this.status == 200) {
      // Parse data JSON object to Javascript Object returned from api
      let data = JSON.parse(request.response);
      // Get a random number between 0 to 19, the api returns 20 images
      let num = Random.getNum(20);
      // Get random image url
      let url = data.data[num].images.original.url;
      // Append url from random gif to image src property
      document.getElementById('mainImage').src = url;
      // localStorage url setter
      localStorage.setItem('url', url);
      // localStorage user mood setter
      localStorage.setItem('mood', EMOTIONS[randomEmotion]);
      // Use DOM API to access innerText property of userMood header element
      document.getElementById('userMood').innerText = EMOTIONS[randomEmotion];
    }
  };

  // Opens the AJAX request object with API address and randomly selected emotion along with
  // API key
  request.open(
    'GET',
    `https://api.giphy.com/v1/gifs/search?q=${EMOTIONS[randomEmotion]}&api_key=7OvpnuSOvDeKHnxXLJ9AJq5ZpTsuJRap&limit=20`
  );

  // Sends request to Giphy api
  request.send();
}

// Change Button changes the random user mood
document.getElementById('changeMoodBtn').addEventListener('click', gifRequest);

// On Page Load, run initializer
document.onload = initializer();
