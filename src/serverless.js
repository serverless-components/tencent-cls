const { Component } = require('@serverless/core')
const { Cls } = require('tencent-component-toolkit')
const { TypeError } = require('tencent-component-toolkit/src/utils/error')
const { initializeInputs } = require('./utils')

class ServerlessComponent extends Component {
  getCredentials() {
    const { tmpSecrets } = this.credentials.tencent

    if (!tmpSecrets || !tmpSecrets.TmpSecretId) {
      throw new TypeError(
        'CREDENTIAL',
        'Cannot get secretId/Key, your account could be sub-account and does not have the access to use SLS_QcsRole, please make sure the role exists first, then visit https://cloud.tencent.com/document/product/1154/43006, follow the instructions to bind the role to your account.'
      )
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
