import type { CharacterCountSchema } from './character-count.types'
import { createMachine } from '@zag-js/core'
import * as dom from './character-count.dom'
// import
// import { debounce } from '@zag-js/utils' // Assuming Zag provides debounce

// function calculateStatusText(currentValue: string, maxLength: number): string {
//   if (maxLength <= 0)
//     return ''
//   const charCount = currentValue.length
//   const difference = Math.abs(maxLength - charCount)
//   const characters = difference === 1 ? 'character' : 'characters'
//   const guidance
//     = charCount === 0
//       ? 'allowed'
//       : charCount > maxLength
//         ? 'over limit'
//         : 'left'
//   return `${difference} ${characters} ${guidance}`
// }

export const machine = createMachine<CharacterCountSchema>({
  props({ props }) {
    return {
      maxLength: Infinity,
      // value: 0,
      ...props,
    }
  },

  initialState() {
    // const open = prop('open') || prop('defaultOpen')
    return 'valid'
  },

  context({ prop, bindable }) {
    return {
      charCount: bindable(() => ({ defaultValue: 0 })),
      // value: bindable(() => ({ defaultValue: 0 }))
    }
  //   // const initialValue = prop('value') ?? prop('defaultValue') ?? ''
  //   // const initialStatus = calculateStatusText(initialValue, prop('maxLength'))
  //   return {
  //     id: prop('id'),
  //     ids: prop('ids') ?? {},
  //     dir: prop('dir'),
  //     getRootNode: prop('getRootNode'),
  //     maxLength: prop('maxLength'),
  //     value: initialValue,
  //     name: prop('name'),
  //     form: prop('form'),
  //     disabled: prop('disabled'),
  //     readOnly: prop('readOnly'),
  //     placeholder: prop('placeholder'),
  //     statusSrDebounce: prop('statusSrDebounce')!, // Will be defaulted by props function
  //     onValueChange: prop('onValueChange'),
  //     // computed and internal
  //     charCount: initialValue.length,
  //     charsRemaining: prop('maxLength') - initialValue.length,
  //     isInvalid: prop('maxLength') - initialValue.length < 0,
  //     statusText: initialStatus,
  //     srStatusText: initialStatus, // Initialize srStatusText with the initial status
  //     debouncedSetSrTextFn: undefined,
  //   }
  },

  // computed: {
  //   charCount: ctx => ctx.value.length,
  //   charsRemaining: ctx => ctx.maxLength - ctx.charCount,
  //   isInvalid: ctx => ctx.charsRemaining < 0,
  //   statusText: ctx => calculateStatusText(ctx.value, ctx.maxLength),
  // },

  // setup({ context, send }) {
  //   context.debouncedSetSrTextFn = debounce((text: string) => {
  //     send({ type: 'INTERNAL.SET_SR_TEXT', text })
  //   }, context.statusSrDebounce)
  // },

  // watch: {
  //   'value': ['updateComputedValues', 'invokeOnValueChange', 'triggerSrTextUpdate'],
  //   'maxLength': ['updateComputedValues', 'triggerSrTextUpdate'],
  //   // Watch prop 'value' for controlled component updates
  //   'prop:value': (ctx, { prop }) => {
  //     const controlledValue = prop('value')
  //     if (controlledValue !== undefined && controlledValue !== ctx.value) {
  //       ctx.value = controlledValue
  //     }
  //   },
  // },

  // on: {
  //   'VALUE.SET': {
  //     actions: ['setValue'],
  //   },
  //   'INTERNAL.SET_SR_TEXT': {
  //     actions: ['setSrText'],
  //   },
  // },

  watch({ track, action, prop, context }) {
    track([() => context.get('charCount')], () => {
      // console.log("count changed", context.get("charCount"))
      action(['toggleState'])
    })
  },

  states: {
    valid: {
      on: {
        INPUT: { actions: ['countCharacters'] },
        INVALID: { target: 'invalid' },
      },
    },
    invalid: {
      on: {
        INPUT: { actions: ['countCharacters'] },
        VALID: { target: 'valid' },
      },
    },
  },

  implementations: {
    actions: {
      countCharacters({ context, scope, prop }) {
        // eslint-disable-next-line no-console
        const input = dom.getInputEl(scope) as HTMLInputElement | HTMLTextAreaElement | null
        const charCount = (input?.value || '').length
        // const maxLength = prop('maxLength')
        // console.log('countChars', {
        //   charCount,
        //   maxLength
        // })
        context.set('charCount', () => charCount)
      },

      toggleState({ context, send, prop }) {
        const charCount = context.get('charCount')
        const maxLength = prop('maxLength')
        if (charCount > maxLength) {
          // console.log("invalid")
          send({ type: 'INVALID' })
        } else {
          // console.log("valid")
          send({ type: 'VALID' })
        }

        // setState({scope, send, prop }) {
        //   const input = dom.getInputEl(scope) as HTMLInputElement | HTMLTextAreaElement | null
        //   const charCount = (input?.value || '').length
        //   const maxLength = prop('maxLength') || Infinity

        //   if (charCount > maxLength) {
        //     console.log("invalid")
        //     send({ type: 'INVALID' })
        //   } else {
        //     console.log("valid")
        //     send({ type: 'VALID' })
        //   }
        // }
      },
    },
  }

  // implementations: {
  // effects: {
  //   setValue: (ctx, event) => {
  //     ctx.value = event.value
  //   },
  //   updateComputedValues: (ctx) => {
  //     // These are now in 'computed', but this action can ensure statusText is re-evaluated for sr debounce
  //     // No direct assignment needed here as computed properties handle it.
  //     // srStatusText update is triggered by 'triggerSrTextUpdate'
  //   },
  //   invokeOnValueChange: (ctx, event) => {
  //     // Only invoke if the change didn't come from a prop update
  //     if (event.type === 'VALUE.SET' && event.src !== 'prop') {
  //       ctx.onValueChange?.({ value: ctx.value })
  //     }
  //     else if (event.type !== 'VALUE.SET') { // For direct watch on context.value
  //       ctx.onValueChange?.({ value: ctx.value })
  //     }
  //   },
  //   triggerSrTextUpdate: (ctx) => {
  //     // statusText is a computed property, so it's always up-to-date
  //     ctx.debouncedSetSrTextFn?.(ctx.statusText)
  //   },
  //   setSrText: (ctx, event) => {
  //     ctx.srStatusText = event.text
  //   },
  // },
  // },
})
