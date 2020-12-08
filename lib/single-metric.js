'use strict'

const AbstractMetric = require('./abstract-metric')

module.exports = class SingleMetric extends AbstractMetric {
  constructor (name, options) {
    if (!options) options = {}
    super(name, options)
    this.value = 0

    if (options.value != null) {
      this.record(options.value, options.date)
    }
  }

  record (value, date) {
    this.value = value
    this.touch(date)
  }

  reset () {
    super.reset()
    this.value = 0
  }
}
