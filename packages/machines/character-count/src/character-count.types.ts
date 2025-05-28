import type { Machine, Service } from '@zag-js/core'
import type { CommonProperties, DirectionProperty, PropTypes, RequiredBy } from '@zag-js/types'

/* -----------------------------------------------------------------------------
 * Callback details
 * ----------------------------------------------------------------------------- */

export interface ValueChangeDetails {
  value: string
}

/* -----------------------------------------------------------------------------
 * Machine context
 * ----------------------------------------------------------------------------- */

export type ElementIds = Partial<{
  root: string
  label: string
  input: string
  status: string
  srStatus: string
}>

export interface CharacterCountProps extends CommonProperties, DirectionProperty {
  /**
   * The ids of the elements in the character count. Useful for composition.
   */
  ids?: ElementIds
  /**
   * The maximum number of characters allowed.
   */
  maxLength: number
  /**
   * The current value of the input.
   */
  value?: string
  /**
   * The initial value of the input when it is first rendered.
   * Use when you do not need to control the state of the input.
   */
  defaultValue?: string
  /**
   * Callback invoked when the value of the input changes.
   */
  onValueChange?: (details: ValueChangeDetails) => void
  /**
   * The `name` attribute for the input element.
   */
  name?: string
  /**
   * The `form` attribute for the input element.
   */
  form?: string
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean
  /**
   * Whether the input is read-only.
   */
  readOnly?: boolean
  /**
   * The placeholder text for the input.
   */
  placeholder?: string
  /**
   * The debounce duration (in milliseconds) for updating the screen-reader status text.
   * @default 1000
   */
  statusSrDebounce?: number
}

interface PublicContext extends DirectionProperty, CommonProperties {
  ids: ElementIds
  maxLength: number
  value: string
  name?: string
  form?: string
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  statusSrDebounce: number
  onValueChange?: (details: ValueChangeDetails) => void

  /**
   * @computed
   * The current number of characters.
   */
  charCount: number
  /**
   * @computed
   * The number of characters remaining.
   */
  charsRemaining: number
  /**
   * @computed
   * Whether the current character count exceeds the maximum length.
   */
  isInvalid: boolean
  /**
   * @computed
   * The human-readable status text (e.g., "5 characters left").
   */
  statusText: string
  /**
   * The screen-reader accessible status text, updated after a debounce.
   */
  srStatusText: string
}

interface PrivateContext {
  /**
   * The debounced function to update srStatusText.
   */
  debouncedSetSrTextFn?: (text: string) => void
}

export type CharacterCountMachineContext = PublicContext & PrivateContext

export interface CharacterCountSchema {
  props: RequiredBy<CharacterCountProps, 'maxLength' | 'statusSrDebounce' | 'id'>
  // context: CharacterCountMachineContext
  // state: 'idle' // The machine might have a very simple state or just rely on context.
  state: 'valid' | 'invalid'
  action: 'countCharacters'
  event: {
    type: 'INPUT'
  }
}

export type CharacterCountService = Service<CharacterCountSchema>

export type CharacterCountMachine = Machine<CharacterCountSchema>

/* -----------------------------------------------------------------------------
 * Component props
 * ----------------------------------------------------------------------------- */

export interface CharacterCountApi<T extends PropTypes = PropTypes> {
  /**
   * The current value of the input.
   */
  // value: string
  // /**
  //  * Function to set the value of the input.
  //  */
  // setValue: (value: string) => void
  // /**
  //  * The current number of characters.
  //  */
  // charCount: number
  // /**
  //  * The number of characters remaining.
  //  */
  // charsRemaining: number
  /**
   * Whether the current character count exceeds the maximum length.
   */
  isInvalid: boolean
  // /**
  //  * The human-readable status text (e.g., "5 characters left").
  //  */
  // statusText: string
  // /**
  //  * The screen-reader accessible status text.
  //  */
  // srStatusText: string
  // /**
  //  * The configured maximum length.
  //  */
  // maxLength: number

  getRootProps: () => T['element']
  getLabelProps: () => T['label']
  getInputProps: () => T['input']
  getStatusProps: () => T['element']
  getSrStatusProps: () => T['element']
}
