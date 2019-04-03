const fetch = require('node-fetch')
const fs = require('fs')
const data = require('./abbrevAndImg')

const write = abbrev => buffer =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      `flags/${abbrev}.png`,
      buffer,
      err => err ? reject(err) : resolve()
    )
  })

const downloadOne = ({ img, abbrev }) =>
  fetch(img)
    .then(r => r.buffer())
    .then(write(abbrev))

Promise.all(data.map(downloadOne))
  .then(() => console.log('done'))
  .catch(console.log)

