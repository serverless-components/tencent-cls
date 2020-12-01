const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '..', '.env.test')
})
const { generateId, getServerlessSdk } = require('./utils')

const instanceYaml = {
  org: 'orgDemo',
  app: 'appDemo',
  stage: 'dev',
  component: 'cls@dev',
  name: `cls-integration-tests-${generateId()}`,
  inputs: {
    name: 'cls-test',
    topic: 'cls-topic-test',
    region: 'ap-guangzhou',
    period: 7,
  }
}

const credentials = {
  tencent: {
    SecretId: process.env.TENCENT_SECRET_ID,
    SecretKey: process.env.TENCENT_SECRET_KEY,
  }
}

// get serverless construct sdk
const sdk = getServerlessSdk(instanceYaml.org)

it('Using template should deploy success', async () => {
  const instance = await sdk.deploy(instanceYaml, credentials)

  expect(instance).toBeDefined()
  expect(instance.instanceName).toEqual(instanceYaml.name)
  expect(instance.outputs).toBeDefined()
  expect(instance.outputs.name).toBe(instanceYaml.inputs.name)
  expect(instance.outputs.topic).toBe(instanceYaml.inputs.topic)
  expect(instance.outputs.period).toBe(instanceYaml.inputs.period)
  expect(instance.outputs.region).toBe(instanceYaml.inputs.region)
  expect(instance.outputs.logsetId).toBeDefined()
  expect(instance.outputs.topicId).toBeDefined()
})

it('should remove success', async () => {
  await sdk.remove(instanceYaml, credentials)
  result = await sdk.getInstance(instanceYaml.org, instanceYaml.stage, instanceYaml.app, instanceYaml.name)

  expect(result.instance.instanceStatus).toEqual('inactive')
})
