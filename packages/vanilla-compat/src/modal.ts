import * as modal from '@uswds-tailwind/modal-compat'
import { nanoid } from 'nanoid'
import { Component } from './component'
import { normalizeProps } from './normalize-props'
import { spreadProps } from './spread-props'
import { VanillaMachine } from './lib/machine'
import type { ModalSchema } from '@uswds-tailwind/modal-compat';

export class Modal extends Component<modal.Props, modal.Api> {
    initMachine(context: modal.Props): VanillaMachine<ModalSchema> {
        return new VanillaMachine(modal.machine, {
            ...context,
            role: this.content.getAttribute('role') === 'alertmodal' ? 'alertmodal' : 'modal',
            closeOnEscape: !this.content.hasAttribute('data-static'),
            closeOnInteractOutside: !this.content.hasAttribute('data-static'),
        })
    }

    initApi() {
        return modal.connect(this.machine.service, normalizeProps)
    }

    render() {
        spreadProps(this.rootEl, this.api.getTriggerProps())

        this.renderPositioner(this.positioner)
        this.renderBackdrop(this.backdrop)
        this.renderContent(this.content)

        if (this.title)
            this.renderTitle(this.title)
        if (this.description)
            this.renderDescription(this.description)
        this.closeTriggers.forEach((closeTriggerEl) => {
            this.renderCloseTrigger(closeTriggerEl)
        })
    }

    private get backdrop() {
        const value = this.rootEl.getAttribute('data-target')
        if (!value)
            throw new Error('Expected value to be defined')

        const backdropEl = document.querySelector<HTMLElement>(`[data-part="modal-backdrop"][data-value="${value}"]`)
        if (!backdropEl)
            throw new Error('Expected backdropEl to be defined')
        return backdropEl
    }

    private get positioner() {
        const value = this.rootEl.getAttribute('data-target')
        if (!value)
            throw new Error('Expected value to be defined')

        const positionerEl = document.querySelector<HTMLElement>(`[data-part="modal-positioner"][data-value="${value}"]`)
        if (!positionerEl)
            throw new Error('Expected positionerEl to be defined')
        return positionerEl
    }

    private get content() {
        const contentEl = this.positioner.querySelector<HTMLElement>(`[data-part="modal-content"]`)
        if (!contentEl)
            throw new Error('Expected contentEl to be defined')
        return contentEl
    }

    private get title() {
        return this.positioner.querySelector<HTMLElement>(`[data-part="modal-title"]`)
    }

    private get description() {
        return this.positioner.querySelector<HTMLElement>(`[data-part="modal-description"]`)
    }

    private get closeTriggers() {
        return Array.from(this.content.querySelectorAll<HTMLButtonElement>(`[data-part="modal-close-trigger"]`))
    }

    private renderBackdrop(backdropEl: HTMLElement) {
        spreadProps(backdropEl, this.api.getBackdropProps())
    }

    private renderPositioner(positionerEl: HTMLElement) {
        spreadProps(positionerEl, this.api.getPositionerProps())
    }

    private renderContent(contentEl: HTMLElement) {
        spreadProps(contentEl, this.api.getContentProps())
    }

    private renderTitle(titleEl: HTMLElement) {
        spreadProps(titleEl, this.api.getTitleProps())
    }

    private renderDescription(descriptionEl: HTMLElement) {
        spreadProps(descriptionEl, this.api.getDescriptionProps())
    }

    private renderCloseTrigger(closeTriggerEl: HTMLButtonElement) {
        spreadProps(closeTriggerEl, this.api.getCloseTriggerProps())
    }
}

export function modalInit() {
    document.querySelectorAll<HTMLElement>('[data-part="modal-trigger"]').forEach((targetEl) => {
        const modal = new Modal(targetEl, {
            id: nanoid(),
        })
        modal.init()
    })
}

if (typeof window !== 'undefined') {
    window.Modal = Modal
    window.modalInit = modalInit
}
