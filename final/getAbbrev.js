const fs = require('fs')
const cheerio = require('cheerio')
const R = require('ramda')

const page = fs.readFileSync(`../Canton.html`, 'utf-8')

const filterChildrenByTagName = tag =>
  R.pipe(
    R.propOr([], 'children'),
    R.filter(R.propEq('name', tag))
  ) 

const getTwoFirstLetters = string =>
  string.substring(0, 2)

const getAllTr = filterChildrenByTagName('tr')

const getAbbrev = R.pipe(
  filterChildrenByTagName('th'),
  R.pathOr('', [0, 'children', 0, 'data']),
  getTwoFirstLetters,
)

const getWiki = R.pipe(
  filterChildrenByTagName('td'),
  R.path([0]),
  filterChildrenByTagName('a'),
  R.path([0, 'attribs', 'href'])
)

const tbody = cheerio('tbody', page)[0]
const trs = getAllTr(tbody)

const result = trs
  .map(tr => ({
    abbrev: getAbbrev(tr),
    wiki: getWiki(tr),
  }))
  .filter(d => d.wiki)

  fs.writeFileSync(
    'abbrevs.json',
    JSON.stringify(result, null, 2),
    'utf-8')