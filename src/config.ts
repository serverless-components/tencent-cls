export const CONFIGS = {
  region: 'ap-guangzhou',
  period: 7,
  rule: {
    full_text: {
      case_sensitive: true,
      tokenizer: '@&()=\'",;:<>[]{}/ \n\t\r'
    },
    key_value: {
      case_sensitive: true,
      keys: [
        'SCF_Alias',
        'SCF_Duration',
        'SCF_FunctionName',
        'SCF_Level',
        'SCF_LogTime',
        'SCF_MemUsage',
        'SCF_Message',
        'SCF_Namespace',
        'SCF_Qualifier',
        'SCF_RequestId',
        'SCF_StartTime',
        'SCF_StatusCode',
        'SCF_Type',
        'SCF_RetryNum'
      ],
      types: [
        'text',
        'long',
        'text',
        'text',
        'long',
        'double',
        'text',
        'text',
        'text',
        'text',
        'long',
        'long',
        'text',
        'long'
      ],
      tokenizers: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      sql_flags: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
      ]
    }
  }
}

