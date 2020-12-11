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
        'SCF_RequestId',
        'SCF_StartTime',
        'SCF_Qualifier',
        'SCF_StatusCode',
        'SCF_Message',
        'SCF_MemUsage',
        'SCF_Namespace',
        'SCF_FunctionName',
        'SCF_Level',
        'SCF_Type',
        'SCF_LogTime',
        'SCF_StatusCode',
        'SCF_Alias'
      ],
      types: [
        'text',
        'long',
        'text',
        'long',
        'text',
        'double',
        'text',
        'text',
        'text',
        'text',
        'long',
        'long',
        'text'
      ],
      tokenizers: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
      sql_flags: [true, true, true, true, true, true, true, true, true, true, true, true, true]
    }
  }
}

module.exports = CONFIGS
