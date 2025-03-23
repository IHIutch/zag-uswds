import { createMachine } from "@zag-js/core";
import * as dom from "./modal.dom";
import type { ModalSchema } from "./modal.types";

export const machine = createMachine<ModalSchema>({
    props({ props }) {
        return {
            role: "dialog",
            modal: true,
            closeOnEscape: true,
            closeOnInteractOutside: true,
            ...props,
        };
    },

    initialState({ prop }) {
        return prop("open") ? "open" : "closed";
    },

    states: {
        open: {
            entry: ["focusContent", "hideNonModals"],
            on: {
                CLOSE: { target: "closed", actions: ["restoreNonModals"] },
                TOGGLE: { target: "closed", actions: ["restoreNonModals"] },
            },
        },
        closed: {
            on: {
                OPEN: { target: "open", actions: ["hideNonModals"] },
                TOGGLE: { target: "open", actions: ["hideNonModals"] },
            },
        },
    },

    implementations: {
        actions: {
            focusContent({ scope }) {
                const contentEl = dom.getContentEl(scope);
                contentEl?.focus();
            },
            hideNonModals({ scope }) {
                const nonModals = dom.getNonModals(scope);
                nonModals.forEach((el) => el.setAttribute("aria-hidden", "true"));
            },
            restoreNonModals({ scope }) {
                const hiddenNonModals = dom.getHiddenNonModals(scope);
                hiddenNonModals.forEach((el) => el.removeAttribute("aria-hidden"));
            },
        },
    },
});