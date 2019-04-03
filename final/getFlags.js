const fs = require('fs')
const cheerio = require('cheerio')
const R = require('ramda')

const page = fs.readFileSync(`../Armorial_de_la_Suisse.html`, 'utf-8')

const filterChildrenByTagName = tag =>
  R.pipe(
    R.propOr([], 'children'),
    R.filter(R.propEq('name', tag))
  ) 

const getAllTr = filterChildrenByTagName('tr')

const getImg = R.pipe(
  filterChildrenByTagName('td'),
  R.path([2]),
  filterChildrenByTagName('a'),
  R.head,
  filterChildrenByTagName('img'),
  R.path([0, 'attribs', 'src'])
)

const getWiki = R.pipe(
  filterChildrenByTagName('td'),
  R.path([1]),
  filterChildrenByTagName('b'),
  R.head,
  filterChildrenByTagName('a'),
  R.path([0, 'attribs', 'href']),

)

const tbody = cheerio('tbody', page)[0]
const trs = getAllTr(tbody)

const result = trs
  .map(tr => ({
    img: getImg(tr),
    wiki: getWiki(tr),
  }))
  .filter(d => d.wiki)

fs.writeFileSync(
  'flagUrls.json',
  JSON.stringify(result, null, 2),
  'utf-8')