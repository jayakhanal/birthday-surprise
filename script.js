function startSurprises() {
  document.getElementById("surprise-container").style.display = "block";
  document.getElementById("startBtn").style.display = "none";
  startHearts();
  startConfetti();
}

let isPlaying = false;

// Initialize music - let native loop handle repetition
function initializeMusic() {
  const audio = document.getElementById('backgroundMusic');
  
  // Track play/pause state for button
  audio.addEventListener('play', function() {
    isPlaying = true;
    document.getElementById('music-toggle').textContent = '⏸️ Pause Music';
    document.getElementById('music-toggle').classList.add('playing');
  });
  
  audio.addEventListener('pause', function() {
    isPlaying = false;
    document.getElementById('music-toggle').textContent = '🎵 Play Music';
    document.getElementById('music-toggle').classList.remove('playing');
  });
}

// Start music initialization when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMusic);
} else {
  initializeMusic();
}

function toggleMusic() {
  const audio = document.getElementById('backgroundMusic');
  
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(err => {
      console.log('Audio playback failed:', err);
    });
  }
}

function showContent(id) {
  const contents = document.querySelectorAll('.surprise-content');
  contents.forEach(c => { c.classList.remove('show'); c.classList.add('hidden'); });
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  setTimeout(()=>{ el.classList.add('show'); }, 50);

  if(id === 'surprise1') startTyping("Thank you for all the laughter, love, and memories 💖 Happy Birthday once again! 🎂✨", "typedMessage1");
  if(id === 'surprise3') startTyping("You are the best sister ever! 💖 I love you!", "typedMessage3");
  if(id === 'surprise6') startQuiz();
}

function startTyping(text, elementId){
  let i=0; let el=document.getElementById(elementId);
  el.innerHTML=""; 
  let interval = setInterval(()=>{
    el.innerHTML += text[i]; i++;
    if(i>=text.length) clearInterval(interval);
  },50);
}

// Quiz functionality
let currentQuestionIndex = 0;
let score = 0;
const questions = [
  {
    question: "What is my sister's favorite color?",
    options: ["Pink", "Blue", "Green", "Red"],
    answer: 0
  },
  {
    question: "How many kids does my sister have?",
    options: ["1", "2", "3", "4"],
    answer: 1
  },
  {
    question: "What's my sister's favorite food?",
    options: ["Pizza", "Chocolate", "Ice Cream", "All of the above"],
    answer: 3
  },
  {
    question: "What does my sister love to do on weekends?",
    options: ["Sleep", "Dance", "Watch movies", "All of the above"],
    answer: 3
  },
  {
    question: "What's the funniest thing my sister does?",
    options: ["Sing loudly", "Dance awkwardly", "Tell bad jokes", "All of the above"],
    answer: 3
  }
];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('question-container').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
  document.getElementById('final-score').classList.add('hidden');
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question').textContent = question.question;
  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach((btn, index) => {
    btn.textContent = question.options[index];
  });
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  const resultText = document.getElementById('result-text');
  if (selectedIndex === question.answer) {
    score++;
    resultText.textContent = "Correct! 🎉";
  } else {
    resultText.textContent = `Wrong! The correct answer was: ${question.options[question.answer]} 😅`;
  }
  document.getElementById('question-container').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    showQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  document.getElementById('result').classList.add('hidden');
  document.getElementById('final-score').classList.remove('hidden');
  const scoreText = document.getElementById('score-text');
  scoreText.textContent = `You got ${score} out of ${questions.length} correct! ${score === questions.length ? 'Perfect! 🏆' : score > questions.length / 2 ? 'Great job! 🎊' : 'Better luck next time! 😄'}`;
}

function restartQuiz() {
  startQuiz();
}

function startSuspense() {
  // Hide cake gallery and gift message
  document.querySelector('.cake-gallery').style.display = 'none';
  document.querySelector('.gift-message').style.display = 'none';
  
  // Show suspense
  document.getElementById('suspense-container').classList.remove('hidden');
  
  let countdown = 3;
  const countdownEl = document.querySelector('.countdown');
  countdownEl.textContent = countdown;
  
  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownEl.textContent = countdown;
    } else {
      clearInterval(interval);
      // Hide suspense and show special message
      document.getElementById('suspense-container').classList.add('hidden');
      document.getElementById('special-message').classList.remove('hidden');
    }
  }, 1000);
}

function startHearts(){
  const heartsContainer=document.getElementById("hearts");
  for(let i=0;i<30;i++){
    let heart=document.createElement("div");
    heart.className="heart";
    heart.style.left=Math.random()*window.innerWidth+"px";
    heart.style.animationDuration=(2+Math.random()*3)+"s";
    heart.style.width=heart.style.height=(10+Math.random()*20)+"px";
    heart.style.backgroundColor=`hsl(${Math.random()*360},80%,60%)`;
    heartsContainer.appendChild(heart);
  }
}

function startConfetti(){
  const canvas=document.getElementById("confetti");
  const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  const confetti=[], colors=["#ff0","#f0f","#0ff","#fff","#ff4081"];
  for(let i=0;i<150;i++){ confetti.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*6+2, d:Math.random()*10+1, color:colors[Math.floor(Math.random()*colors.length)], tilt:Math.random()*10-10}); }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c=>{
      ctx.beginPath();
      ctx.fillStyle=c.color;
      ctx.moveTo(c.x+c.tilt,c.y);
      ctx.lineTo(c.x+c.tilt+5,c.y+c.r);
      ctx.lineTo(c.x+c.tilt-5,c.y+c.r);
      ctx.closePath();
      ctx.fill();
      c.y += (Math.cos(c.d)+1+2)/2;
      c.x += Math.sin(0.01);
      if(c.y>canvas.height){ c.y=0; c.x=Math.random()*canvas.width; }
    });
    requestAnimationFrame(draw);
  }
  draw();
}