import chroma from 'chroma-js'
import { Swig } from 'swig'
import swigExtras from 'swig-extras'
import swigFilters from 'swig/lib/filters'

const swig = new Swig()
export default swig

swigExtras.useFilter(swig, 'split')
swigExtras.useFilter(swig, 'trim')
swigExtras.useFilter(swig, 'groupby')

const safe = fn =>
  (fn.safe = true) && fn

const isColor = value => {
  try {
    chroma(value)
    return true
  } catch (e) {
    return false
  }
}

const displayAsType = input =>
  input.split('|')
    .map(x => x.trim())
    .map(swigFilters.capitalize)
    .join('</code> or <code>')

const yiq = ([red, green, blue]) =>
  ((red * 299) + (green * 587) + (blue * 114)) / 1000

const yiqContrast = rgb =>
  (yiq(rgb) >= 128) ? '#000' : '#fff'

const getChannel = (start, hex) =>
  parseInt(hex.substr(start, 2), 16)

const hexToRgb = hex =>
  [0, 2, 4].map(x => getChannel(x, hex))

const colorToHex = color =>
  chroma(color).hex().substr(1)

/**
 * Normalises a CSS color, then uses the YIQ algorithm to get the
 * correct contrast.
 *
 * @param {String} color
 * @return {String} `#000` or `#fff` depending on which one is a better.
 * @see {@link http://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area}
 */
const maybeYiqContrast = color =>
  isColor(color)
    ? yiqContrast(hexToRgb(colorToHex(color)))
    : '#000'

swig.setFilter('in', (key, object) => key in object)
swig.setFilter('is_color', isColor)
swig.setFilter('display_as_type', safe(displayAsType))
swig.setFilter('yiq', maybeYiqContrast)
