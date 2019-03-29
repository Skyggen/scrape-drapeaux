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
  .map(trChildren => trChildren.filter(getElementsByName('td'))[2])

const getImgFromTd = ts =>
  R.path([])



console.log(tds)
