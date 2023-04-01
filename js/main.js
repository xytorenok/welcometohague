const code = document.getElementById('code')
const sidebar = document.getElementById('sidebar')
const languageBtn = document.getElementById('language')
const levelBlock = document.getElementById('pagination')
const outputTest = document.getElementById('code-output')
const outputTestBefore = document.getElementById('code-output-before')
const outputTestAfter = document.getElementById('code-output-after')
const gameSector = document.getElementById('road-map-to-the-hague')
const blackboard = document.getElementById('blackboard')
const faces = document.querySelector('.faces')
const putin = document.querySelector('.putin')
const editor = document.getElementById('editor')
const submit = document.getElementById('submit')
const audioWelcomeToHaager = document.getElementById('audio-welcome-to-haager')
const detailsMissionInfo = document.getElementById('mission-info')
const detailsTaskInfo = document.getElementById('task-info')
const detailsExampleInfo = document.getElementById('example-info')


let solution

textMission()

closeTab()


function textMission() {
  detailsMissionInfo.addEventListener('toggle', function () {
    if (detailsMissionInfo.open) {
      detailsMissionInfo.querySelector('audio').volume = 0.4
      detailsMissionInfo.querySelector('audio').play();
      detailsTaskInfo.open = false
      detailsExampleInfo.open = false
    } else {
      detailsMissionInfo.querySelector('audio').pause();
      detailsMissionInfo.querySelector('audio').currentTime = 0;
    }
  });
  detailsTaskInfo.addEventListener('toggle', function () {
    if (detailsTaskInfo.open) {
      detailsMissionInfo.open = false
      detailsExampleInfo.open = false
    }
  });
  detailsExampleInfo.addEventListener('toggle', function () {
    if (detailsTaskInfo.open) {
      detailsMissionInfo.open = false
      detailsTaskInfo.open = false
    }
  })

}

function closeTab() {

}

code.focus();

// объявили глобальную переменную чтобы сохранять значение ключа
let cleanValue

code.addEventListener('input', () => {
  const [prop, value] = code.value.split(':')
  cleanValue = value.replace(/[;\s]/g, '');
  faces.style[prop] = cleanValue;
  checkSolution()
});

function normalize(prop) {
  return prop.replace(/(:) *|([^;]);?$/g, '$1$2')
}

function checkSolution() {
  editor.classList.toggle('solved', normalize(code.value) == normalize(solution))
  if (editor.classList.contains('solved')) {
    audioWelcomeToHaager.volume = 0.4
    audioWelcomeToHaager.play();
    putin.style.opacity = 0.8
  }
}

function missionComplete() {

}


code.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (editor.matches('.solved')) {
      submit.click()
    } else {
      shake()
    }
  }
});

function shake() {
  editor.classList.add('shake')

  editor.onanimationend = () => {
    editor.classList.remove('shake')
  }
}


const radios = document.querySelectorAll('input[type="radio"]');


submit.addEventListener('click', function() {
  let checkedIndex = -1;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      checkedIndex = i;
      break;
    }
  }
  if (checkedIndex > -1 && checkedIndex < radios.length - 1 && editor.matches('.solved')) {
    radios[checkedIndex + 1].checked = true;
  }
  console.log(document.querySelector('input:checked').value);
  console.log(document.querySelector('option:checked').value);

  cleanCode()
 
  prepareLevel(document.querySelector('input:checked').value,document.querySelector('option:checked').value)
  
});

function cleanCode(){
  code.value = ''
  editor.classList.remove('solved')
}