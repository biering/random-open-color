# random-open-color

> Super fast random color generator from the [open-color](https://github.com/yeun/open-color) palette

## Install

```bash
npm install --save random-open-color
```

## Usage

```javascript
const randomColor = require('random-open-color')

import randomColor from 'random-open-color')

const hexColor = randomColor([options = {}])
// returns -> '#h??????'
```
### Options

You can specify an `options` object to modify the random color generator.

|Property|Type|Default|Description|
|:--:|:--:|:--:|:--|
|`excluded`|Array<String>|`[]`|All colors in the array will be excluded from the random generator|
|`min`|Number|`0`|The minimal range of color selection. For example if you specify `min = 1` all colors lower than `2` will be excluded|
|`max`|Number|`9`|The maximal range of color selection.|
|`shuffle`|Boolean|`false`|If shuffle is true, ...|

/*import randomColor from 'random-open-color'

randomColor({
  excluded: [
    'gray'
  ],
  min: 2, // min >= 0 && min < max
  max: 8, // max > min && max <= 9
  shuffle: true
})*/

## License

Copyright (c) 2017 Christoph Biering, Licensed under the [MIT license](./LICENSE).
