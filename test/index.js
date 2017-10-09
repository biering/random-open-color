const randomColor = require('../index.js')

for (let i = 0; i < 10000; i++) {
  console.log(randomColor({ shuffle: true }))
}
