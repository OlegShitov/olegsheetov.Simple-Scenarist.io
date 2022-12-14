const Enter = document.getElementById('Enter');
const textfield = document.getElementById('textfield')
const textmodes = document.getElementById("textmodes")
const sidebar = document.getElementById('sidebar')
const contextmenu = document.getElementById('contextmenu')
const forprint = document.getElementById('forprint')
let text = document.getElementById('text'), clicked_classname



const Delete = document.getElementById('delete')
const edit1 = document.getElementById('edit1')
const edit2 = document.getElementById('edit2')
const load = document.getElementById('load')
const print = document.getElementById('print')
const Delete2 = document.getElementById('delete2')
const save = document.getElementById('save')

function wrtext() {
  let writedtext_styleclass = textmodes.value, writedtext_name = text.value.replace(' ', '')

  textfield.insertAdjacentHTML('BeforeEnd', '<div class = ' + writedtext_styleclass + '>' + "<p>" + text.value + "</p>" + '</div>');
  text.value = ""
  console.log(writedtext_styleclass)

  // Переключает режимы ввода текста. Сделано для удобства написания Диалогов.
  if (writedtext_styleclass == "Hero") {
    textmodes.selectedIndex = 1
  }
  else if (writedtext_styleclass == "Line") {
    textmodes.selectedIndex = 0
  }
}

function writeAndSafe() {
  wrtext()
  safeprogress()
}
// Функция которая отправляет текст 
function Send_Enter_Button(event) {
  if (event.which == 13) {
    wrtext()
    textfield.lastChild.scrollIntoView()
    safeprogress()
  }
  else if (event.altKey == true && event.which == 8) {
    textfield.lastChild.remove()
    if (textfield.lastChild.className == 'chapter') {
      textfield.lastChild.remove()
      sidebar.lastChild.remove()
    }
  }

}
// Проста функция которая удаляет последний блок 
function Delete_button(event) {
  if (event.altKey == true && event.which == 8) {
    textfield.lastChild.remove()
  }
  safeprogress()
}
// Простая функция по переключению режимов ввода текста при зажатой клавише альт и 1-4
function ModeOfText(event) {
  if (event.altKey == true)
    if (event.which == 49) {
      textmodes.selectedIndex = 0
    }
    else if (event.which == 50) {
      textmodes.selectedIndex = 1
    }
    else if (event.which == 51) {
      textmodes.selectedIndex = 2
    }
    else if (event.which == 52) {
      textmodes.selectedIndex = 3
    }

}
// Функции по редактированию текста. Разделены потому что было необходимо узнать значение клавиши
function edit_writed_text() {
  const texfield_inners = document.querySelectorAll('#textfield > div')
  texfield_inners.forEach(element => {
    element.addEventListener('click', (event) => {
      if (event.altKey == true) {
        clicked_classname = element.className
        text.value = element.textContent
        element.className = 'redacting'
      }
    })
  });
}
function redacting_marked_text(event) {
  //alt+r Позволяет редактировать текст оставив тот же тип болка с которым он написан
  const redacting = textfield.querySelectorAll('div.redacting')
  if (event.altKey == true && event.which == 82) {
    redacting[0].textContent = text.value
    text.value = ''
    redacting[0].className = clicked_classname
    for (let index = 0; index <= redacting.length; index++) {
      delete redacting[index]
    }
  }
  // alt+e Позовляет редактировать текст изменив тип блока .
  else if (event.altKey == true && event.which == 69) {
    event.preventDefault()
    redacting[0].textContent = text.value
    text.value = ''
    redacting[0].className = textmodes.value
    for (let index = 0; index <= redacting.length; index++) {
      delete redacting[index]
    }
  }
}
//Пока не работает. По задумне это содержание в правом блоке страницы. 
function sidebarChapters(event) {
  const chaptersList = document.querySelectorAll('#textfield >  div.chapter')
  // if (event.altKey && event.which == 67) {
  //   console.log(chaptersList)
  // }
  for (let index = 0; index < chaptersList.length; index++) {
    const element = chaptersList[index];
    let sidebarchapter = document.createElement('p')
    sidebarchapter.textContent = element.textContent
    sidebar.appendChild(sidebarchapter)
  }
}

function safeprogress() {
  localStorage.setItem('nametext', textfield.innerHTML)
}
function loadprogress(event) {
  // alt + s загрузка сохраненного текста 
  if (event.altKey && event.which == 83) {
    textfield.innerHTML = localStorage.nametext
  }
  // alt + d удаление сохраненного текста 
  else if (event.altKey && event.which == 68) {
    event.preventDefault()
    localStorage.clear()
  }
}
//Не работает. А надо. 
function DeleteThisText() {
  const texfield_inners = document.querySelectorAll('#textfield > div')
  texfield_inners.forEach(element => {
    element.addEventListener('click', (event) => {
      console.log(texfield_inners)
      if (event.ctrlkey == true) {
        console.log(element.textContent)

      }
    })
  });
}
// Не нужно. Так как есть стандартное клавиатурное сокращение.
// Хотя можно создать отдельную функциональную кнопку в интерфейсе. Это для тех кто не знает о стандартном клавиатурном сокращении.
function PrintWritedText(event) {
  if (event.altKey == true && event.which == 65) {
    forprint.innerHTML = textfield.innerHTML
    window.print()
    event.preventDefault()
  }
}

Enter.addEventListener("click", writeAndSafe)
window.addEventListener('keydown', ModeOfText)
window.addEventListener('keydown', Send_Enter_Button)
window.addEventListener('change', Delete_button)
window.addEventListener('change', edit_writed_text)
window.addEventListener('keydown', redacting_marked_text)
window.addEventListener('change', safeprogress)
window.addEventListener('keydown', loadprogress)
window.addEventListener('change', DeleteThisText)
window.addEventListener('keydown', PrintWritedText)
window.addEventListener('change', sidebarChapters)

Delete.addEventListener('click', () => {
  textfield.lastChild.remove()
  safeprogress()
})
edit1.addEventListener('click', () => {
  const redacting = textfield.querySelectorAll('div.redacting')
  redacting[0].textContent = text.value
  text.value = ''
  redacting[0].className = clicked_classname
  for (let index = 0; index <= redacting.length; index++) {
    delete redacting[index]
  }
})
edit2.addEventListener('click', () => {
  const redacting = textfield.querySelectorAll('div.redacting')
  redacting[0].textContent = text.value
  text.value = ''
  redacting[0].className = textmodes.value
  for (let index = 0; index <= redacting.length; index++) {
    delete redacting[index]
  }

})

save.addEventListener('click', safeprogress)
load.addEventListener('click', () => {
  textfield.innerHTML = localStorage.nametext
})
Delete2.addEventListener('click', () => {
  localStorage.clear()
})

print.addEventListener('click',()=> {
  forprint.innerHTML = textfield.innerHTML
    window.print()
})
// Просто удобный способ узнать код нажатой клавиши.
// window.addEventListener('keydown', (event) => {
//   console.log(event.key, event.which, event.altKey)
// })
// window.addEventListener('mousedown', (event) => {
//   console.log( event.which, event.altKey , event.ctrlKey)
// })
// 