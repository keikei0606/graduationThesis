function readWords(){    
  var array=[
    "ruby on rails",
    "testFizzBizz",
    "fmt Println",
    "an",
    "encourage",
    "wizard",
    "coredump",
    "mariadb",
    "http",
    "ssl",
    "xss"
  ];
  
  return array;
}


//typing  game 
window.onload = function(){
    var words = readWords();
    var currentWord;
    var currentLocation;
    var score;
    var miss;
    var timer;
    var color = new Array("red","blue","green","yellow","purple");
    var colorId = 0;
    var target = document.getElementById('target');
    var scoreLabel = document.getElementById('score');
    var missLabel = document.getElementById('miss');
    var timerLabel = document.getElementById('timer');
    var isStarted;
    var timerId;
    function init(){
      currentWord ='click to start';
      currentLocation = 0;
      score = 0;
      miss = 0;
      timer = 60;
      target.innerHTML = currentWord;
      scoreLabel.innerHTML = score;
      missLabel.innerHTML = miss;
      timerLabel.innerHTML = timer;
      isStarted = false;
    }
//modal
    init();

    function updateTimer(){
      timerId = setTimeout(function(){
        timer--;
        timerLabel.innerHTML = timer;
        if(timer%5 === 0 &&timer!=60){
          document.bgColor = color[colorId];
          colorId++;
          if(colorId >= color.length) {
             colorId = 0;
        }
          
          
          
        }
        if(timer <=0){
          var accuracy = (score + miss) === 0 ? '0.00' : ((score / (score + miss)) * 100).toFixed(2);
          
          alert(score + ' letters, ' + miss + ' miss! ' + accuracy + ' % accuracy \n 実験お疲れ様でした！！');
          location.reload();  
          clearTimeout(timerId);
          init();
          return;
        }
        updateTimer();
      },1000);
    }

    function setTarget(){
      currentWord = words[Math.floor(Math.random()*words.length)];
      target.innerHTML = currentWord;
      currentLocation = 0;
    }

    window.addEventListener('click',function(){
      if(!isStarted) {
        isStarted = true;
        setTarget();
        updateTimer();
      }
    });

    window.addEventListener('keyup', function(e){
      if(!isStarted){
        return;
      }

      if(String.fromCharCode(e.keyCode) === currentWord[currentLocation].toUpperCase()){
        currentLocation++;
        var placeholder = '';
        for(var i = 0; i < currentLocation; i++){
          placeholder += '_';
        }
        target.innerHTML = placeholder + currentWord.substring(currentLocation);
        score++;
        scoreLabel.innerHTML = score;
        if (currentLocation === currentWord.length){
          setTarget();
        }
      } else {
        //console.log('miss!');
        miss++;
        missLabel.innerHTML = miss;
      }
    });
  }
