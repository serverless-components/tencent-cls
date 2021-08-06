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
  rule:
    # 键值索引
    key_value:
      # 大小写是否敏感
      case_sensitive: true,
      # 键列表
      keys:
        - name: SCF_RequestId
          type: text
          sql_flag: true
        - name: SCF_MemUsage
          type: double
          sql_flag: true
  alarms:
    - name: error-count # 告警名称
      # 通知模板 ID
      noticeId: notice-af7f877b-5999-4a1d-8f09-89b84d54e41c
      targets: # 监控规则
        - period: 15 # 查询时间范围，单位为分钟，默认为15分钟
          query: 'level:error | select count(*) as errCount' # 分析语句
      monitor: # 监控周期
        type: period # 固定频率
        time: 1 # 每隔多少分钟查询一次
        # type: fixed # 固定时间
        # time: 601 # 每天 10:00 执行
      trigger: # 告警策略
        condition: '$1.count > 1' # 告警频率
        count: 1 # 告警频率
        period: 10 # 如果持续指定 count，则每 10 分钟告警一次
```

## 配置描述

主要的参数

| 名称   | 必选 |       类型        |     默认值     | 描述                             |
| ------ | :--: | :---------------: | :------------: | :------------------------------- |
| name   |  是  |      string       |                | 日志集名称，不能和历史名称重复   |
| topic  |  是  |      string       |                | 日志主题名称，不能和历史名称重复 |
| region |  否  |      string       | `ap-guangzhou` | CLS 所在区域                     |
| period |  否  |      number       |      `7`       | 日志保存时间，单位 `天`          |
| rule   |  否  |   [Rule](#Rule)   |                | 索引配置                         |
| alarms |  否  | [Alarm](#Alarm)[] |                | 告警配置                         |

### Rule

| 名称 | 必选 |  类型  | 默认值 | 描述                           |
| ---- | :--: | :----: | :----: | :----------------------------- |
| name |  是  | string |        | 日志集名称，不能和历史名称重复 |
