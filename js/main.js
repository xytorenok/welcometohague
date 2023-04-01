const code = document.getElementById('code')
const information= document.getElementById('information')
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
    submit.disabled = false;
  }
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


//нажатие на кнопку добавляет значение n+1 в атрибут value, затем мы считываем атрибут и передаем его в функцию prepareLevel()
submit.addEventListener('click', function (event) {
  event.preventDefault()
  const radios = document.querySelectorAll('input[type="radio"]');
  let checkedIndex = -1;
  
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      checkedIndex = i;
      break;
    }
  }
  if (checkedIndex > -1 && checkedIndex < radios.length - 1) {
    radios[checkedIndex + 1].checked = true;
  }

  const level = document.querySelector('input:checked').value
  const lang = document.querySelector('option:checked').value

  prepareLevel(level, lang)
  cleanCode()
  console.log('click');
});

function nextLvl() {

}

function cleanCode() {
  code.value = ''
  editor.classList.remove('solved')
  submit.disabled = true;
}