'use strict'

const units = module.exports = new Map()

class Unit {
  constructor (name, shortName, longName) {
    this.name = name
    this.shortName = shortName
    this.longName = longName
  }

  toJSON () {
    return this.name
  }

  toString () {
    return this.name
  }
}

function add (name, shortName, longName, addRate) {
  units.set(name, new Unit(name, shortName, longName))

  if (addRate) {
    add(`${name}/second`, `${shortName}/s`, `${longName}/Second`, false)
  }
}

// Note: long names are currently used for CloudWatch unit names too, so don't
// change them.
add('seconds', 's', 'Seconds')
add('microseconds', 'us', 'Microseconds')
add('milliseconds', 'ms', 'Milliseconds')
add('bytes', 'bytes', 'Bytes', true)
add('kilobytes', 'kb', 'Kilobytes', true)
add('megabytes', 'mb', 'Megabytes', true)
add('gigabytes', 'gb', 'Gigabytes', true)
add('terabytes', 'tb', 'Terabytes', true)
add('bits', 'bits', 'Bits', true)
add('kilobits', 'kbit', 'Kilobits', true)
add('megabits', 'mbit', 'Megabits', true)
add('gigabits', 'gbit', 'Gigabits', true)
add('terabits', 'tbit', 'Terabits', true)
add('count', 'count', 'Count', true)
add('percent', '%', 'Percent')
add('none', 'none', 'None')

for (const info of units.values()) {
  // Allow shortName to be used as alias
  if (!units.has(info.shortName)) {
    units.set(info.shortName, info)
  }
}
