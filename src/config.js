const CONFIGS = {
  region: 'ap-guangzhou',
  period: 7,
  rule: {
    full_text: {
      case_sensitive: true,
      tokenizer: '!@#%^&*()_="\', <>/?|\\;:\n\t\r[]{}'
    },
    key_value: {
      case_sensitive: true,
      keys: [
        'SCF_RetMsg',
        'SCF_Message',
        'SCF_RequestId',
        'SCF_FunctionId',
        'SCF_Qualifier',
        'SCF_EventType',
        'SCF_StartTime',
        'SCF_RetCode',
        'SCF_StatusCode',
        'SCF_Duration',
        'SCF_BillDuration',
        'SCF_MemDuration',
        'SCF_MemUsage',
        'SCF_WanTraffic',
        'SCF_AppId',
        'SCF_Uin',
        'SCF_Namespace',
        'SCF_FunctionName',
        'SCF_Level',
        'SCF_Type',
        'SCF_Index',
        'SCF_Alias'
      ],
      types: [
        'text',
        'text',
        'text',
        'text',
        'text',
        'long',
        'long',
        'long',
        'long',
        'double',
        'double',
        'double',
        'double',
        'double',
        'long',
        'long',
        'text',
        'text',
        'text',
        'text',
        'long',
        'text'
      ],
      tokenizers: [
        ' ',
        ' ',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ]
    }
  }
}

module.exports = CONFIGS
