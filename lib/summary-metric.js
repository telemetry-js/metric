'use strict'

const AbstractMetric = require('./abstract-metric')

module.exports = class SummaryMetric extends AbstractMetric {
  constructor (name, options) {
    if (!options) options = {}
    super(name, options)

    // TODO (later): add stats.last, stats.stddev for appoptics
    this.stats = {
      sum: 0,
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY,
      count: 0
    }

    if (options.stats) {
      this.accumulate(options.stats, options.date)
    } else if (options.value != null) {
      this.record(options.value, options.date)
    }
  }

  reset () {
    super.reset()

    const stats = this.stats

    stats.sum = 0
    stats.min = Number.POSITIVE_INFINITY
    stats.max = Number.NEGATIVE_INFINITY
    stats.count = 0
  }

  record (value, date) {
    if (Number.isFinite(value) && value <= Number.MAX_SAFE_INTEGER) {
      const stats = this.stats

      stats.sum += value
      stats.min = Math.min(stats.min, value)
      stats.max = Math.max(stats.max, value)
      stats.count++

      this.touch(date)
    }
  }

  accumulate (stats, date) {
    const { sum, min, max, count } = stats

    if (!Number.isFinite(count)) throw new TypeError('count must be a finite number')

    if (count > 0) {
      if (!Number.isFinite(sum)) throw new TypeError('sum must be a finite number')
      if (!Number.isFinite(min)) throw new TypeError('min must be a finite number')
      if (!Number.isFinite(max)) throw new TypeError('max must be a finite number')

      const stats = this.stats

      stats.sum += sum
      stats.min = Math.min(stats.min, min)
      stats.max = Math.max(stats.max, max)
      stats.count += count
    }

    this.touch(date)
  }
}
