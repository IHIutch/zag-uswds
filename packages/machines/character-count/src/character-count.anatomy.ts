import { createAnatomy } from '@zag-js/anatomy'

export const anatomy = createAnatomy('character-count').parts(
  'root',
  'label', // Optional: if a label is associated
  'input',
  'status',
  'srStatus', // Screen-reader specific status
)

export const parts = anatomy.build()
