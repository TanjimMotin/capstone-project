
    // HTML elements
    const form = document.forms[0];
    const gameDisplay = document.getElementById("game-display");
    const guessText = document.getElementById("guess-text");
    const submitBtn = document.querySelector("input[type=submit]");
    const restartBtn = document.getElementById("restart");
   
    const animalHint = document.getElementById("animal-hint");
    
   
    const remainingLive = document.getElementById("current-live");
    const wrongLetter = document.getElementById("wrongLetter");
    // animal data
    const animalList = [
      {
        animal: "Turkey",
      
        hint: "There is lots of me at Thanksgiving.But you do not want me to be wasted.Because my meat is really juicy.Just so long as I have been basted",
        
      },
      {
        animal: "reindeer",
    
        hint: "One of these is Cupid.But it does not have a bow.Instead it pulls a sleigh.Through the air and lands on snow",
       
      },
      {
        animal: "lion",
   
        hint: "I am known as a king.The jungle where I reign.It is hard to tame me.And I have a large mane",
       
      },
      {
        animal: "snail",
    
        hint: "I travel very slowlyWhen gliding alongthe groundMaybe my shell weighs me downIn your garden I am found",
        
      },
      {
        animal: "elephant",
   
        hint: "I am an animal you might love.But I am too big to be your pet.I have an extremely long trunk.And it is said I never forget",
        
      }
    ];
    var grabanimal = animalList[Math.floor(Math.random() * animalList.length)];
  
    var answer;
    var currentDisplayedWord; 
    var live;
    var wrongLetterArray = [];
  
  function startGame() {
     
      answer = grabanimal;
      
      gameDisplay.textContent = [...answer.animal].fill("_").join("");
      currentDisplayedWord = gameDisplay.textContent;
    
      live = answer.animal.length;
   
      remainingLive.textContent = live;
 
      document.body.style.background = answer.animal;
  
      animalHint.textContent = "Riddle: " + answer.hint;
     
      // process guesses
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        processGuess(form.guess.value);
      });
    }










    
    

    function processGuess(guess) {
    
      guessText.textContent = "";
    
      if (isValidGuess(guess) && answer.animal.includes(guess)) {
        currentDisplayedWord = updateDisplayedWord(
          currentDisplayedWord,
          answer.animal,
          guess
        );
        gameDisplay.textContent = currentDisplayedWord;
        form.reset();
        renderwrongLetter();
        guessText.textContent = "Good guess!";
      } else if (isValidGuess(guess) && !wrongLetterArray.includes(guess)) {
     
        guessText.textContent = "Nope!";
        wrongLetterArray.push(guess);
        form.reset();
        renderwrongLetter();
        live--;
      } else if (isValidGuess(guess) && wrongLetterArray.includes(guess)) {
     
        guessText.textContent = "You already tried that!";
        form.reset();
      } else {
   
        guessText.textContent = "Valid character, please!";
        form.reset();
      }
      updatelive();
    }









    function isValidGuess(char) {
      return char.length === 1 && /[a-z]/i.test(char);
    }
    










    function updateDisplayedWord(displayedWord, answerWord, char) {
     
      let answerArray = answerWord.split("");
      let displayArray = displayedWord.split("");
      for (let n = 0; n < answerWord.length; n++) {
        if (answerArray[n] === char) displayArray[n] = char;
      }
      return displayArray.join("");
    }
    
    function renderwrongLetter() {
      wrongLetter.textContent =
        "Incorrect characters: " + wrongLetterArray.join(" ");
    }
  
    function updatelive() {
      remainingLive.textContent = live;
      
      if (currentDisplayedWord === answer.animal) {
        guessText.textContent = "You won.";
        restartBtn.classList.remove("hidden");
        submitBtn.setAttribute("disabled", "true");
       
      }
    
      if (live <= 0) {
        guessText.textContent = "Game over.";
        restartBtn.classList.remove("hidden");
        submitBtn.setAttribute("disabled", "true");
        
      }
    }












    restartBtn.addEventListener("click", function(){
      window.location.reload(true);
    });

    window.addEventListener("load", function() {
      startGame();
    });
