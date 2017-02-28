import def from '../default'
import { Promise } from 'es6-promise'
import es6denodeify from 'es6-denodeify'
import extend from 'extend'
import fs from 'fs-extra'
import { minify } from 'html-minifier'
import path from 'path'
import sassdocExtras from 'sassdoc-extras'
import swig from './swig'

const denodeify = es6denodeify(Promise)

const copy = denodeify(fs.copy)
const renderFile = denodeify(swig.renderFile)
const writeFile = denodeify(fs.writeFile)

const applyDefaults = ctx =>
  extend({}, def, ctx, {
    groups: extend(def.groups, ctx.groups),
    display: extend(def.display, ctx.display)
  })

const shortcutIcon = (dest, ctx) => {
  if (!ctx.shortcutIcon) {
    ctx.shortcutIcon = { type: 'internal', url: 'assets/images/favicon.png' }
  } else if (ctx.shortcutIcon.type === 'internal') {
    ctx.shortcutIcon.url = 'assets/images/' + ctx.shortcutIcon.url

    return () =>
      copy(ctx.shortcutIcon.path, path.resolve(dest, ctx.shortcutIcon.url))
  }
}

export default (dest, ctx) => {
  ctx = applyDefaults(ctx)
  sassdocExtras(ctx,
    'description',
    'markdown',
    'display',
    'groupName',
    'shortcutIcon',
    'sort',
    'resolveVariables'
  )
  ctx.data.byGroupAndType = sassdocExtras.byGroupAndType(ctx.data)

  const index = path.resolve(__dirname, '../views/documentation/index.html.swig')

  return Promise.all([
    copy(path.resolve(__dirname, '../assets'), path.resolve(dest, 'assets'))
      .then(shortcutIcon(dest, ctx)),

    renderFile(index, ctx)
      .then(html => minify(html, { collapseWhitespace: true }))
      .then(html => writeFile(path.resolve(dest, 'index.html'), html))
  ])
}
