'use strict'

const test = require('tape')
const metric = require('.')

test('summary metric', function (t) {
  const summary1 = metric.summary('test1', { unit: 'count' })

  t.is(summary1.stats.min, Number.POSITIVE_INFINITY)
  t.is(summary1.stats.max, Number.NEGATIVE_INFINITY)
  t.is(summary1.stats.count, 0)
  t.is(summary1.stats.sum, 0)

  summary1.record(2)
  summary1.record(4)

  t.is(summary1.stats.min, 2)
  t.is(summary1.stats.max, 4)
  t.is(summary1.stats.count, 2)
  t.is(summary1.stats.sum, 6)

  const summary2 = metric.summary('test2', { unit: 'count' })

  summary2.record(5)
  summary1.accumulate(summary2.stats)

  t.is(summary1.stats.min, 2)
  t.is(summary1.stats.max, 5)
  t.is(summary1.stats.count, 3)
  t.is(summary1.stats.sum, 11)

  summary1.reset()

  t.is(summary1.stats.min, Number.POSITIVE_INFINITY)
  t.is(summary1.stats.max, Number.NEGATIVE_INFINITY)
  t.is(summary1.stats.count, 0)
  t.is(summary1.stats.sum, 0)

  t.end()
})
