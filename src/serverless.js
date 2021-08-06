const { Component } = require('@serverless/core')
const { Cls } = require('tencent-component-toolkit')
const { ApiError } = require('tencent-component-toolkit/lib/utils/error')
const { initializeInputs } = require('./utils')

class ServerlessComponent extends Component {
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
    this.__TmpCredentials = this.getCredentials()
  }

  async deploy(inputs) {
    this.initialize()
    const { __TmpCredentials } = this

    const { region, clsInputs } = await initializeInputs(this, inputs)

    const client = new Cls(__TmpCredentials, region)

    const res = await client.deploy(clsInputs)

    const outputs = {
      region,
      ...res,
      period: clsInputs.period
    }

    this.state = outputs

    return outputs
  }

  async remove() {
    this.initialize()
    const { __TmpCredentials, state } = this

    const { region } = state

    const client = new Cls(__TmpCredentials, region)

    await client.remove(state)

    this.state = {}

    return {}
  }
}

module.exports = ServerlessComponent
