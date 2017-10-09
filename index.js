const { 
  has, 
  keys, 
  flatten, 
  slice }          = require('lodash')
const Random       = require('random-js')
const shuffleArray = require('shuffle-array')

const colors       = require('./colors.js')

const mt = Random.engines.mt19937().autoSeed()

console.log(colors)

/*import randomColor from 'random-open-color'

randomColor({
  excluded: [
    'gray'
  ],
  min: 2, // min >= 0 && min < max
  max: 8, // max > min && max <= 9
  shuffle: true
})*/

let shuffleCache = null

const randomColor = (options = {}) => {
  if (!has(options, 'excluded')) options.excluded = []
  if (!has(options, 'min'))      options.min = 0
  if (!has(options, 'max'))      options.max = 9
  if (!has(options, 'shuffle'))  options.shuffle = false

  const allowedColors = flatten(
    keys(colors)
      .filter(k => options.excluded.indexOf(k) === -1)
      .map(c => slice(colors[c], options.min, options.max + 1))
  )

  if (!options.shuffle) {
    return Random.pick(mt, allowedColors)
  } else {
    if (!shuffleCache || !shuffleCache.length) 
      shuffleCache = shuffleArray(allowedColors, { copy: true })

    const index = Random.integer(0, shuffleCache.length - 1)(mt)
    return shuffleCache.splice(index, 1)[0]
  }
}

for (let i = 0; i < 10000; i++) {
  console.log(randomColor({ shuffle: true }))
}

module.exports = randomColor
