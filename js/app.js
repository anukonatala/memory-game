
const deck = document.getElementsByClassName('card');
var listOfCards = [], newListOfCards = [], openCards = [];
var move = 0;
var totalCards = 16;
var openedCards = 0;
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function removeCardClass(){
    $('.deck .card').each(function(){
        $(this).removeClass();
        $(this).addClass('card');
    });
}

function resetStars(){
    $('.stars li i').each(function(){
      if($(this).attr('class') === 'fa fa-star-o'){
        $(this).removeClass('fa-star-o').addClass('fa-star');
      }
    });
}

function resetMoves(){
  move = 0;
  $('.moves').text(move);
}

function restart(){
    modal.style.display = "none";
    resetMoves();
    resetStars();
    removeCardClass();
    getListOfCards();
}

function getListOfCards(){
  var i = 0;
  $('.deck .card i').each(function(){
    var $allClasses = $(this).attr('class');
    listOfCards.push($allClasses);
  });
  newListOfCards = shuffle(listOfCards);
  $('.deck .card i').each(function(){
        $(this).removeClass();
        $(this).addClass(newListOfCards[i]);
        i++;
  });
}

function checkStars(){
  if(move > 25 && move < 30 ){
    $('.stars li:last-child()').find('i').removeClass('fa-star').addClass('fa-star-o');
  //  $('.stars li:last-child()').find('i').addClass('fa-star-o');
  }
  else if(move > 30 && move < 40){
    $('.stars li:nth-last-child(2)').find('i').removeClass('fa-star').addClass('fa-star-o');
  //  $('.stars li:nth-last-child(2)').find('i').addClass('fa-star-o');
  }
  else if(move > 40 && move < 45){
    $('.stars li:nth-last-child(3)').find('i').removeClass('fa-star').addClass('fa-star-o');
  //  $('.stars li:nth-last-child(2)').find('i').addClass('fa-star-o');
  }
  else if(move > 45){
    $('.stars li:nth-last-child(4)').find('i').removeClass('fa-star').addClass('fa-star-o');
  //  $('.stars li:nth-last-child(2)').find('i').addClass('fa-star-o');
  }
}

function gameOver(){
    console.log("gameOver");
    $(".modal-content .modalText").text(move);
    modal.style.display = "block";
}



function checkMatch(){
  if(openCards[0].find('i').attr('class') === openCards[1].find('i').attr('class')){
    openCards[0].addClass('match disabled').find("i").prop("disabled", true);
    openCards[1].addClass('match disabled').find("i").prop("disabled", true);
    openedCards = openedCards + 2;
    if(openedCards == totalCards){
      gameOver();
    }
  }
  else {
    openCards[0].toggleClass('open show');
    openCards[1].removeClass('open show');
  }
  openCards = [];
}

function toggleCard(){
  if(($(this).attr('class') != "card open show match disabled")){
    if(openCards.length == 0){
      $(this).addClass("open show");
      openCards.push($(this));
      move++;
    }
    else if(openCards.length == 1 && ($(this).attr('class') != "card open show")){
      $(this).addClass("open show");
      openCards.push($(this));
      setTimeout(checkMatch, 700);
      move++;
    }
    $('.moves').text(move);
    checkStars(move);
  }
}

function initGame(){
  $("#dialog").hide();
  removeCardClass();
  getListOfCards();
  $('.moves').text("0");
  $( ".deck .card" ).click(toggleCard);
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}

initGame();
