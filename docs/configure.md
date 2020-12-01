# 配置文档

## 全部配置

```yml
# serverless.yml

org: orgDemo # (可选) 用于记录组织信息，默认值为您的腾讯云账户 appid，必须为字符串
app: appDemo # (可选) 用于记录组织信息. 默认与name相同，必须为字符串
stage: dev # (可选) 用于区分环境信息，默认值是 dev

component: cls # (必选) 组件名称，在该实例中为 cls
name: clsDemo # 必选) 组件实例名称.

inputs:
  region: ap-guangzhou
  name: cls-demo
  topic: cls-topic-demo
  period: 7
```

## 配置描述

主要的参数

| 名称   | 必选 |  类型  |     默认值     | 描述                             |
| ------ | :--: | :----: | :------------: | :------------------------------- |
| name   |  是  | string |                | 日志集名称，不能和历史名称重复   |
| topic  |  是  | string |                | 日志主题名称，不能和历史名称重复 |
| region |  否  | string | `ap-guangzhou` | CLS 所在区域                     |
| period |  否  | number |      `7`       | 日志保存时间，单位 `天`          |
