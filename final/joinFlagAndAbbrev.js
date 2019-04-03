const R = require('ramda')
const fs = require('fs')
const abbrevs = require('./abbrevs.json')
const flags = require('./flagUrls.json')

const getAbbrevByWiki = wiki =>
  R.prop(
    'abbrev',
    abbrevs.find(R.propEq('wiki', wiki))
  )

const addAbbrev = flag =>
  ({ ...flag, abbrev: getAbbrevByWiki(flag.wiki) })

const removeWiki = R.omit(['wiki'])

const fixSrc = flag =>
  ({ ...flag, img: `https:${flag.img}` })

const result = flags
  .map(addAbbrev)
  .map(removeWiki)
  .map(fixSrc)

/*
// AVEC PIPE

const fix = R.pipe(addAbbrev, removeWiki, fixSrc)
const result = flags.map(fix)

*/

fs.writeFileSync(
  'abbrevAndImg.json',
  JSON.stringify(result, null, 2),
  'utf-8')