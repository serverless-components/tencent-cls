import { DeployDashboardInputs } from 'tencent-component-toolkit/lib/modules/cls/dashboard';
import { AlarmInputs } from 'tencent-component-toolkit/lib/modules/cls/interface';
import { CONFIGS } from './config';

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export const getType = (obj: any): string => {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

export const capitalString = (str: string): string => {
  if (str.length < 2) {
    return str.toUpperCase()
  }

  return `${str[0].toUpperCase()}${str.slice(1)}`
}

export interface DeployInputs {
  name?: string;
  topic?: string;
  period?: number;
  alarms?: AlarmInputs[];
  dashboards?: DeployDashboardInputs[];
  region?: string;
  rule?: {
    full_text?: {}
    key_value: { case_sensitive: boolean, keys: { name: string, type: string, sql_flag: boolean; tokenizer: string }[], types: string[], sql_flags: boolean[]; tokenizers: string[] };
  };
}

interface ParsedRule {
  key_value?: ParsedKeyValue
}

interface ParsedKeyValue {
  case_sensitive: boolean;
  keys: string[];
  types: string[];
  sql_flags?: boolean[];
  tokenizers?: string[];
}

export const initializeInputs = async (instance: {
  state: { logsetId?: string; topicId?: string }
}, inputs: DeployInputs = {}) => {
  const { state } = instance
  const region = inputs.region || CONFIGS.region

  let { rule } = inputs
  let parsedRule: ParsedRule = {};
  if (rule) {
    const { key_value } = rule
    const { keys, case_sensitive } = deepClone<typeof key_value>(key_value)
    const parsed_key_value: ParsedKeyValue = {
      case_sensitive,
      keys: [],
      types: [],
      sql_flags: [],
      tokenizers: [],
    };
    parsed_key_value.types = []
    parsed_key_value.sql_flags = []
    parsed_key_value.tokenizers = []
    keys.forEach((key) => {
      parsed_key_value.keys?.push(key.name)
      parsed_key_value.types?.push(key.type || 'text')
      parsed_key_value.sql_flags?.push(key.sql_flag === undefined ? false : key.sql_flag)
      parsed_key_value.tokenizers?.push(key.tokenizer || '')
    })
    parsedRule.key_value = parsed_key_value
  } else {
    ; ({ rule: parsedRule } = CONFIGS)
  }
  const clsInputs = {
    logsetId: state.logsetId,
    topicId: state.topicId,
    name: inputs.name,
    topic: inputs.topic,
    period: inputs.period ?? CONFIGS.period,
    rule: parsedRule,
    alarms: inputs.alarms ?? [],
    dashboards: inputs.dashboards ?? []
  }

  return {
    region,
    clsInputs
  }
}