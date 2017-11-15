const { 
  has, 
  keys, 
  flatten, 
  slice }           = require('lodash')
const Random        = require('random-js')
const shuffleArray  = require('shuffle-array')
const defaultColors = require('./lib/colors.js')

const mt = Random.engines.mt19937().autoSeed()

let shuffleCache = null
let colors = defaultColors

const randomColor = (options = {}) => {
  if (!has(options, 'excluded')) options.excluded = []
  if (!has(options, 'min'))      options.min = 0
  if (!has(options, 'max'))      options.max = 9
  if (!has(options, 'shuffle'))  options.shuffle = false
  if (!has(options, 'tone'))     options.tone = []

  // if you want a specific tone than excluded is not necessary
  if (options.tone.length > 0) {
    options.excluded = []
  }

  const allowedColors = flatten(
    keys(colors)
      .filter(k => options.excluded.indexOf(k) === -1)
      .filter(k => {
        return (options.tone.length > 0) 
          ? options.tone.indexOf(k) > -1 : true
      })
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

randomColor.input = input => {
  colors = input
}

randomColor.tone = color => {
  for (let key in colors)
    if (has(colors, key) && colors[key].indexOf(color) > -1)
      return key
  return null
}

module.exports = randomColor
