const randomColor = require('../index.js')

for (let i = 0; i < 100; i++) {
  const color = randomColor({ shuffle: true })
  console.log('Random ', color)
  console.log('Color Tone: ', randomColor.tone(color))
}
