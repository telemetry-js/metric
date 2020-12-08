'use strict'

const units = require('./units')

class AbstractMetric {
  constructor (name, options) {
    if (new.target === AbstractMetric) {
      throw new Error('Cannot instantiate AbstractMetric class')
    }

    // TODO (later): "may only consist of ‘A-Za-z0-9.:-_’"
    if (typeof name !== 'string' || name === '') {
      throw new TypeError('First argument "name" must be a non-empty string')
    } else if (name.length > 255) {
      throw new RangeError('First argument "name" must be <= 255 in length')
    }

    if (typeof options !== 'object' || options === null) {
      throw new TypeError('Second argument "options" must be an object')
    }

    const unit = options.unit
    const resolution = options.resolution || 60
    const statistic = options.statistic || undefined

    if (typeof unit !== 'string' || unit === '') {
      throw new TypeError('The "unit" option must be a non-empty string')
    } else if (!units.has(unit)) {
      throw new Error(`Unsupported "unit" option: ${JSON.stringify(unit)}`)
    }

    // TODO (later): appoptics allows for custom period (but defaults to 60)
    if (resolution !== 60 && resolution !== 1) {
      throw new Error('The "resolution" option must be one of 60 seconds (normal) or 1 (high)')
    }

    // TODO (later): validate (must be one of average, sum, min, max, count)
    if (statistic !== undefined && typeof statistic !== 'string') {
      throw new TypeError('The "statistic" option must be a string')
    }

    this.name = name
    this.date = undefined
    this.unit = unit
    this.resolution = resolution
    this.statistic = statistic
    this.tags = options.tags ? Object.assign({}, options.tags) : {}
  }

  touch (date) {
    this.date = date != null ? date : new Date()
  }

  reset () {
    this.date = undefined
    this.tags = {}
  }
}

module.exports = AbstractMetric
