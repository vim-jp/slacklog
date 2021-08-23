type FzfCommandBase = ReadonlyDeep<{
  sourceFunc: (sourceFuncArgs: SourceFuncArgs) => Promise<Resource>
  sourceFuncArgsParser: (args: string) => SourceFuncArgs
  vimCommandOptions: CommandOptions
  defaultFzfOptionFunc: () =>
    | { [optionName: string]: string | boolean | undefined }
    | Promise<{ [optionName: string]: string | boolean | undefined }>
  defaultProcessesName: ProcessesName
  enableConvertForFzf: boolean
  enableDevIcons: boolean
  beforeCommandHook?: (args: string) => void
}>

export type ResourceData = ReadonlyDeep<{
  command: FzfCommandName
  type: "file"
  file: string
  lineNumber?: undefined
}>

export type ResourceLine = ReadonlyDeep<{
  data: ResourceData
  displayText: string
}>

export type ResourceLines = ReadonlyArray<ResourceLine>

type Resource = ReadonlyDeep<{
  lines: ResourceLines
  options?: FzfCommandDynamicOption
}>