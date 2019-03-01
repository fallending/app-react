
/**
 * 例子页 状态
 */
export interface ExampleState {
  languageName?: string;
  level?: number;
}

/**
 * 应用级 状态
 */
export interface AppState {
  example: ExampleState
}
