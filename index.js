'use strict'

const SingleMetric = require('./lib/single-metric')
const SummaryMetric = require('./lib/summary-metric')

SingleMetric.prototype.isSingle = () => true
SingleMetric.prototype.isSummary = () => false
SummaryMetric.prototype.isSingle = () => false
SummaryMetric.prototype.isSummary = () => true

exports.single = function (name, opts) {
  return new SingleMetric(name, opts)
}

exports.summary = function (name, opts) {
  return new SummaryMetric(name, opts)
}

// TODO (later): move to package
// TODO (later): expose a function to validate units
exports.units = require('./lib/units')
