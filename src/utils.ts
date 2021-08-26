import { DeployDashboardInputs } from 'tencent-component-toolkit/lib/modules/cls/dashboard';
import { DeployInputs as ClsDeployInputs } from 'tencent-component-toolkit/lib/modules/cls/interface';
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
    full_text?: {
      case_sensitive?: boolean;
      tokenizer: string;
    }
    key_value?: { case_sensitive: boolean, keys: { name: string, type: string, sql_flag: boolean; tokenizer: string }[] };
  };
  indexRule?: {
    fullText?: {
      caseSensitive: boolean;
      tokenizer: string;
    }
    keyValue?: {
      caseSensitive: boolean,
      keys: { key: string, type: string, sqlFlag: boolean; tokenizer: string }[],
    }
  }
}


export const initializeInputs = async (instance: {
  state: { logsetId?: string; topicId?: string }
}, inputs: DeployInputs = {}) => {
  const { state } = instance;
  const region = inputs.region ?? CONFIGS.region;
  const clsInputs: ClsDeployInputs = {
    logsetId: state.logsetId,
    topicId: state.topicId,
    name: inputs.name,
    topic: inputs.topic,
    period: inputs.period ?? CONFIGS.period,
    region: inputs.region ?? CONFIGS.region,
    alarms: inputs.alarms,
    dashboards: inputs.dashboards,
  };

  let { rule, indexRule } = inputs
  // Old index rule compatible
  if (rule) {
    clsInputs.indexRule = {
      fullText: deepClone({
        caseSensitive: rule.full_text?.case_sensitive!,
        tokenizer: rule.full_text?.tokenizer!,
      }),
      keyValue: {
        caseSensitive: rule.key_value?.case_sensitive!,
        keys: rule?.key_value?.keys.map(v => {
          return deepClone({
            key: v.name,
            sqlFlag: v.sql_flag,
            type: v.type,
            tokenizer: v.tokenizer,
          })
        }) ?? [],
      }
    };
  }

  if (indexRule) {
    clsInputs.indexRule = {
      fullText: indexRule.fullText!,
      keyValue: indexRule.keyValue!,
    }
  }

  return { region, clsInputs }
}