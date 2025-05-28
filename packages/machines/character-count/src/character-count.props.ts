import type { CharacterCountProps } from './character-count.types'
import { createProps } from '@zag-js/types'
import { createSplitProps } from '@zag-js/utils'

export const props = createProps<CharacterCountProps>()([
  'id',
  'ids',
  'maxLength',
  'value',
  'defaultValue',
  'onValueChange',
  'name',
  'form',
  'disabled',
  'readOnly',
  'placeholder',
  'statusSrDebounce',
  'dir',
  'getRootNode',
])

export const splitProps = createSplitProps<Partial<CharacterCountProps>>(props)
