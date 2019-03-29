const cheerio = require('cheerio')
const R = require('ramda')

const html = `<div>
  <ul>
    <li id="a">A</li>
    <li id="b">B</li>
  </ul>
</div>`

const div = cheerio('div', html)[0]
const ul = R.path(['children', 1], div)
const lis = R.prop('children', ul)
  .filter(R.propEq('type', 'tag'))

const getId = R.path(['attribs', 'id'])
const getText = R.path(['children', 0, 'data'])
/*
console.log(lis.map(li => ({
  id: getId(li),
  text: getText(li),
})))
*/
console.log(div)
