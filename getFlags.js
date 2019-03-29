const fs = require('fs')
const $ = require('cheerio')
const R = require('ramda')

const page = fs.readFileSync('Armorial_de_la_Suisse.html', 'utf-8')

const getChildren = R.prop('children')
const getElementsByName = R.propEq('name')

const tbody = $('tbody', page)[0]
const trs = getChildren(tbody)
  .filter(getElementsByName('tr'))

const tds = trs.map(getChildren)
  .map(trChildren => trChildren.filter(getElementsByName('td')))

const getImgSrc = R.path(['2', 'children', '0', 'children', '0', 'attribs', 'src'])
const getWikiLink = R.path(['1', 'children', '2', 'children', '0', 'attribs', 'href'])
const result = tds.map(d => ({
  wiki:getWikiLink(d),
  img: getImgSrc(d)
}))

fs.writeFileSync(
  'liens_drapeaux.json',
  JSON.stringify(result, null, 2),
  'utf-8')
