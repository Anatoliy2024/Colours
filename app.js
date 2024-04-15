const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    setRandomColors()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type
  if (type === 'lock') {
    const node = event.target.children[0]
    console.log(node)
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToClickboard(event.target.textContent)
  } else if (type === 'col') {
    const child = event.target.querySelector('i')
    if (child.classList.contains('fa-lock-open')) {
      event.target.style.background = generateRandomColors()
    }
  }
})
function generateRandomColors() {
  const hexCodes = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }
  return '#' + color
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text)
}
function setRandomColors(isInitial) {
  const colors = isInitial ? getColoursFromHash() : []
  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')

    const text = col.querySelector('h2')

    const button = col.querySelector('button')
    if (isLocked) {
      colors.push(text.textContent)
      return
    }
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random()

    if (!isInitial) {
      colors.push(color)
    }
    col.style.background = color
    text.textContent = color
    setTextColors(text, color)
    setTextColors(button, color)
  })
  updateColorHash(colors)
}

function updateColorHash(color = []) {
  document.location.hash = color
    .map((col) => {
      return col.toString().substring(1)
    })
    .join('-')
}

function setTextColors(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function getColoursFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((col) => '#' + col)
  }
  return []
}
setRandomColors(true)
