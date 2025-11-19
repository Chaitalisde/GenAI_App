// Simple professional Quiz app (static). Replace fetchQuestions() to call your backend AI generator.
const startBtn = document.getElementById('startBtn');
const configPanel = document.getElementById('configPanel');
const quizPanel = document.getElementById('quizPanel');
const resultPanel = document.getElementById('resultPanel');
const qCounter = document.getElementById('qCounter');
const scoreEl = document.getElementById('score');
const questionText = document.getElementById('questionText');
const optionsEl = document.getElementById('options');
const numQInput = document.getElementById('numQ');
const topicInput = document.getElementById('topic');
const useAIEl = document.getElementById('useAI');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const retryBtn = document.getElementById('retryBtn');
const resultText = document.getElementById('resultText');

let questions = [];
let index = 0;
let score = 0;

startBtn.addEventListener('click', async () => {
  const n = Math.max(1, Math.min(20, parseInt(numQInput.value) || 5));
  const topic = topicInput.value.trim();
  const useAI = useAIEl.checked;
  startBtn.disabled = true;
  startBtn.textContent = 'Loading...';

  try{
    questions = await fetchQuestions(n, useAI, topic);
  }catch(e){
    console.error(e);
    questions = mockQuestions(n);
  }finally{
    startBtn.disabled = false;
    startBtn.textContent = 'Start Quiz';
  }

  index = 0; score = 0;
  renderQuiz();
  configPanel.classList.add('hidden');
  quizPanel.classList.remove('hidden');
  resultPanel.classList.add('hidden');
});

prevBtn.addEventListener('click', () => {
  if(index>0){ index--; renderQuiz(); }
});
nextBtn.addEventListener('click', () => {
  if(index < questions.length - 1){ index++; renderQuiz(); }
  else { finishQuiz(); }
});
retryBtn.addEventListener('click', () => {
  configPanel.classList.remove('hidden');
  quizPanel.classList.add('hidden');
  resultPanel.classList.add('hidden');
});

function renderQuiz(){
  const q = questions[index];
  qCounter.textContent = `Question ${index+1} / ${questions.length}`;
  scoreEl.textContent = `Score: ${score}`;
  questionText.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.forEach((opt,i)=>{
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = `<span class="opt-label">${String.fromCharCode(65+i)}</span> ${opt}`;
    btn.onclick = () => chooseOption(opt, btn, q);
    optionsEl.appendChild(btn);
  });
}

function chooseOption(opt, btn, q){
  // prevent multiple selection
  if(optionsEl.querySelector('.option.disabled')) return;
  const buttons = Array.from(optionsEl.children);
  buttons.forEach(b=>b.classList.add('disabled'));
  if(opt === q.correct){
    btn.classList.add('correct');
    score++;
  }else{
    btn.classList.add('wrong');
    // mark correct
    const correctIndex = q.options.indexOf(q.correct);
    if(correctIndex >= 0 && buttons[correctIndex]) buttons[correctIndex].classList.add('correct');
  }
  scoreEl.textContent = `Score: ${score}`;
  // auto move next after short delay if not last
  setTimeout(()=>{
    if(index < questions.length -1){
      index++; renderQuiz();
    }else{
      finishQuiz();
    }
  }, 900);
}

function finishQuiz(){
  quizPanel.classList.add('hidden');
  resultPanel.classList.remove('hidden');
  resultText.textContent = `${score} out of ${questions.length} correct • ${(Math.round(score/questions.length*100))}%`;
}

// ----- Mock generator (used when no backend)
function mockQuestions(n){
  const pool = [
    {question:'What is the capital of India?', options:['Mumbai','New Delhi','Chennai','Kolkata'], correct:'New Delhi'},
    {question:'Which layer of OSI model is responsible for routing?', options:['Transport','Network','Data Link','Session'], correct:'Network'},
    {question:'What does HTML stand for?', options:['HyperText Markup Language','HighText Machine Language','Hyperlinks Text Mark Language','None'], correct:'HyperText Markup Language'},
    {question:'Which gas is most abundant in Earth\'s atmosphere?', options:['Oxygen','Nitrogen','Carbon Dioxide','Hydrogen'], correct:'Nitrogen'},
    {question:'Who wrote "Hamlet"?', options:['Charles Dickens','William Shakespeare','Mark Twain','Leo Tolstoy'], correct:'William Shakespeare'},
  ];
  const out = [];
  for(let i=0;i<n;i++){
    const item = pool[i % pool.length];
    out.push({question:item.question, options:item.options, correct:item.correct});
  }
  return out;
}

// ----- Replace this function to call your backend AI generator
async function fetchQuestions(n=5, useAI=true, topic=''){
  if(!useAI){
    return mockQuestions(n);
  }
  // Demo behaviour: try to call /api/generate (you can deploy your own)
  try{
    const params = new URLSearchParams({n, topic});
    const res = await fetch(`/api/generate?${params.toString()}`, {method:'GET'});
    if(!res.ok) throw new Error('No backend');
    const data = await res.json();
    // Expecting: [{question:'', options:[], correct:''}, ...]
    if(Array.isArray(data) && data.length) return data.slice(0,n);
    throw new Error('Bad response');
  }catch(e){
    console.warn('AI backend not available, using mock questions.');
    return mockQuestions(n);
  }
}
