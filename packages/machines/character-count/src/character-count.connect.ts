import type { Service } from '@zag-js/core'
import type { NormalizeProps, PropTypes } from '@zag-js/types'
import type { CharacterCountApi, CharacterCountSchema } from './character-count.types'
import { parts } from './character-count.anatomy'
import * as dom from './character-count.dom'

export function connect<T extends PropTypes>(
  service: Service<CharacterCountSchema>,
  normalize: NormalizeProps<T>,
): CharacterCountApi<T> {
  const { state, send, scope } = service

  const isInvalid = state.matches('invalid')

  // const api: Omit<CharacterCountApi<T>, 'getRootProps' | 'getLabelProps' | 'getInputProps' | 'getStatusProps' | 'getSrStatusProps'> = {
  //   value: ctx.value,
  //   setValue: (value) => {
  //     send({ type: 'VALUE.SET', value, src: 'api.setValue' })
  //   },
  //   charCount: ctx.charCount,
  //   charsRemaining: ctx.charsRemaining,
  //   isInvalid: ctx.isInvalid,
  //   statusText: ctx.statusText,
  //   srStatusText: ctx.srStatusText,
  //   maxLength: ctx.maxLength,
  // }

  return {
    // ...api,
    isInvalid,

    getRootProps() {
      return normalize.element({
        ...parts.root.attrs,
        // 'dir': ctx.dir,
        'id': dom.getRootId(scope),
        'data-invalid': isInvalid ? 'true' : undefined,
      })
    },

    getLabelProps() {
      return normalize.label({
        ...parts.label.attrs,
        // dir: ctx.dir,
        id: dom.getLabelId(scope),
        htmlFor: dom.getInputId(scope),
      })
    },

    getInputProps() {
      return normalize.input({
        ...parts.input.attrs,
        // 'dir': ctx.dir,
        'id': dom.getInputId(scope),
        // 'name': ctx.name,
        // 'form': ctx.form,
        // 'disabled': ctx.disabled,
        // 'readOnly': ctx.readOnly,
        // 'placeholder': ctx.placeholder,
        // 'value': ctx.value,
        // 'aria-invalid': ctx.isInvalid,
        'data-invalid': isInvalid ? 'true' : undefined,
        // Do not add 'maxLength' here to allow typing over limit, matching Alpine behavior
        // onChange(event) {
        //   send({ type: '', value: event.currentTarget.value, src: 'input.onChange' })
        // },
        onInput() {
          send({ type: 'INPUT' })
        },
      })
    },

    getStatusProps() {
      return normalize.element({
        ...parts.status.attrs,
        // 'dir': ctx.dir,
        'id': dom.getStatusId(scope),
        'aria-live': 'polite', // Announce changes politely
        'data-invalid': isInvalid ? 'true' : undefined,
        // Text content will be set by framework using api.statusText
      })
    },

    getSrStatusProps() {
      return normalize.element({
        ...parts.srStatus.attrs,
        // 'dir': ctx.dir,
        'id': dom.getSrStatusId(scope),
        'aria-live': 'polite',
        'data-invalid': isInvalid ? 'true' : undefined, // Optional: for consistency
        // Text content will be set by framework using api.srStatusText
        // Visually hidden styles should be applied to this element
        // 'style': {
        //   border: '0px',
        //   clip: 'rect(0px, 0px, 0px, 0px)',
        //   height: '1px',
        //   width: '1px',
        //   margin: '-1px',
        //   padding: '0px',
        //   overflow: 'hidden',
        //   position: 'absolute',
        //   whiteSpace: 'nowrap',
        //   wordWrap: 'normal',
        // },
      })
    },
  }
}
