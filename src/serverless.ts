
const { Component } = require('@serverless/core')

import { DeployInputs } from "./utils"
import { Cls } from 'tencent-component-toolkit';
import { ApiError } from 'tencent-component-toolkit/lib/utils/error';
import { initializeInputs } from './utils';

export interface State {
  region?: string;
  logsetId?: string;
  topicId?: string;
}

class ServerlessComponent extends Component {
  state: State = {};
  _tmpCredentials: { SecretId: string; SecretKey: string; Token: string; } = {} as never;
  getCredentials() {
    const { tmpSecrets } = this.credentials.tencent

    if (!tmpSecrets || !tmpSecrets.TmpSecretId) {
      throw new ApiError({
        type: 'CREDENTIAL',
        message:
          '无法获取授权密钥信息，账号可能为子账户，并且没有角色 SLS_QcsRole 的权限，请确认角色 SLS_QcsRole 是否存在，参考 https://cloud.tencent.com/document/product/1154/43006'
      })
    }

    return {
      SecretId: tmpSecrets.TmpSecretId,
      SecretKey: tmpSecrets.TmpSecretKey,
      Token: tmpSecrets.Token
    }
  }

  getAppId() {
    return this.credentials.tencent.tmpSecrets.appId
  }

  initialize() {
    this._tmpCredentials = this.getCredentials()
  }

  async deploy(inputs: DeployInputs) {
    this.initialize()
    const { _tmpCredentials: __TmpCredentials } = this

    const { region, clsInputs } = await initializeInputs(this, inputs)

    const client = new Cls(__TmpCredentials, region)

    const res = await client.deploy(clsInputs);

    const outputs = {
      ...res,
      period: clsInputs.period
    }

    this.state = outputs

    return outputs
  }

  async remove() {
    this.initialize()
    const { _tmpCredentials: __TmpCredentials, state } = this

    const { region } = state

    const client = new Cls(__TmpCredentials, region)

    await client.remove(state)

    this.state = {}

    return {}
  }
}

module.exports = ServerlessComponent
