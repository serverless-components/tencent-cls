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
      case_sensitive: true
      # 键列表
      keys:
        - name: SCF_RequestId # 字段名称
          type: text # 字段类型
          sql_flag: true # 是否开启统计
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
      trigger: # 告警策略
        condition: '$1.count > 1' # 触发条件
        count: 1 # 告警频率
        period: 10 # 如果持续指定 count，则每 10 分钟告警一次
      monitor: # 监控周期
        type: Period # 固定频率
        time: 1 # 每隔多少分钟查询一次
        # type: Fixed # 固定时间
        # time: 601 # 每天 10:00 执行
```

## 配置描述

主要的参数

| 名称   | 必选 |       类型        |     默认值     | 描述                              |
| ------ | :--: | :---------------: | :------------: | :-------------------------------- |
| name   |  是  |      string       |                | 日志集名称，不能和历史名称重复    |
| topic  |  是  |      string       |                | 日志主题名称，不能和历史名称重复  |
| region |  否  |      string       | `ap-guangzhou` | CLS 所在区域                      |
| period |  否  |      number       |      `7`       | 日志保存时间，单位 `天`           |
| rule   |  否  |   [Rule](#Rule)   |                | 索引配置，默认会使用函数 cls 配置 |
| alarms |  否  | [Alarm](#Alarm)[] |                | 告警配置                          |

### Rule

索引配置

| 名称      | 必选 |         类型          | 默认值 | 描述         |
| --------- | :--: | :-------------------: | :----: | :----------- |
| key_value |  是  | [KeyValue](#KeyValue) |        | 键值索引配置 |

#### KeyValue

简直索引配置

| 名称           | 必选 |           类型            | 默认值 | 描述           |
| -------------- | :--: | :-----------------------: | :----: | :------------- |
| case_sensitive |  是  |   [KeyValue](#KeyValue)   |        | 大小写是否敏感 |
| keys           |  是  | [KeyObject](#KeyObject)[] |        | 键配置列表     |

#### KeyObject

| 名称     | 必选 |  类型   | 默认值 | 描述         |
| -------- | :--: | :-----: | :----: | :----------- |
| name     |  是  | string  |        | 字段名称     |
| type     |  否  | string  | `text` | 字段类型     |
| sql_flag |  否  | boolean | `true` | 是否开启统计 |

### Alarm

告警配置

| 名称     | 必选 |        类型         | 默认值 | 描述        |
| -------- | :--: | :-----------------: | :----: | :---------- |
| name     |  是  |       string        |        | 告警名称    |
| noticeId |  是  |       string        |        | 通知模板 ID |
| targets  |  是  | [Target](#Target)[] |        | 监控规则    |
| trigger  |  是  | [Trigger](#Trigger) |        | 告警策略    |
| monitor  |  否  | [Monitor](#Monitor) |        | 监控周期    |

#### Target

监控规则配置

| 名称   | 必选 |  类型  | 默认值 | 描述                                     |
| ------ | :--: | :----: | :----: | :--------------------------------------- |
| period |  是  | number |        | 查询时间范围，单位为分钟，默认为 15 分钟 |
| query  |  是  | string |        | 分析语句                                 |

#### Trigger

告警策略

| 名称      | 必选 |  类型  | 默认值 | 描述     |
| --------- | :--: | :----: | :----: | :------- |
| condition |  是  | string |        | 触发条件 |
| count     |  是  | number |        | 持续周期 |
| period    |  是  | number |        | 告警频率 |

#### Monitor

监控周期

| 名称 | 必选 |  类型  | 默认值 | 描述                                                                                               |
| ---- | :--: | :----: | :----: | :------------------------------------------------------------------------------------------------- |
| type |  是  | string |        | 监控周期类型，支持：`Period` - 固定频率，`Fixed` - 固定时间                                        |
| time |  是  | string |        | 监控周期，如果是 `Period`，则是`每隔多少分钟查询一次`，如果是 `Fixed`，则是相对于 0 点的分钟数 + 1 |

比如配置 `type` 为 `Fixed`，`time` 为 `601`，则表示每天的 `10:00` 分查询一次。
