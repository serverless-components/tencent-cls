const CONFIGS = require('./config')

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const getType = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

const capitalString = (str) => {
  if (str.length < 2) {
    return str.toUpperCase()
  }

  return `${str[0].toUpperCase()}${str.slice(1)}`
}

const initializeInputs = async (instance, inputs = {}) => {
  const { state } = instance
  const region = inputs.region || CONFIGS.region

  const clsInputs = {
    logsetId: state.logsetId,
    topicId: state.topicId,
    name: inputs.name,
    topic: inputs.topic,
    period: inputs.period || CONFIGS.period,
    rule: inputs.rule || CONFIGS.rule
  }

  return {
    region,
    clsInputs
  }
}

module.exports = {
  getType,
  capitalString,
  deepClone,
  initializeInputs
}
