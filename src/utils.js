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

  let { rule } = inputs
  if (rule) {
    const { key_value } = rule
    const { keys, case_sensitive = true } = deepClone(key_value)
    key_value.case_sensitive = case_sensitive
    key_value.keys = []
    key_value.types = []
    key_value.sql_flags = []
    key_value.tokenizers = []
    keys.forEach((item) => {
      key_value.keys.push(item.name)
      key_value.types.push(item.type || 'text')
      key_value.sql_flags.push(item.sql_flag === undefined ? false : item.sql_flag)
      key_value.tokenizers.push(item.tokenizer || '')
    })
    rule.key_value = key_value
  } else {
    ;({ rule } = CONFIGS)
  }
  const clsInputs = {
    logsetId: state.logsetId,
    topicId: state.topicId,
    name: inputs.name,
    topic: inputs.topic,
    period: inputs.period || CONFIGS.period,
    rule: rule,
    alarms: inputs.alarms || [],
    dashboard: inputs.dashboard
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
