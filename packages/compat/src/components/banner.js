import behavior from "../utils/behavior";
import select from "../utils/select";
import { CLICK } from "../events";
import { prefix as PREFIX } from "../config";
import toggle from "../utils/toggle";

const HEADER = `.${PREFIX}-banner__header`;
const EXPANDED_CLASS = `${PREFIX}-banner__header--expanded`;
const BANNER_BUTTON = `${HEADER} [aria-controls]`;

/**
 * Toggle Banner display and class.
 * @param {Event} event
 */
const toggleBanner = function toggleEl(event) {
  event.preventDefault();
  const trigger = event.target.closest(BANNER_BUTTON);

  toggle(trigger);
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
};

export default behavior(
  {
    [CLICK]: {
      [BANNER_BUTTON]: toggleBanner,
    },
  },
  {
    init(root) {
      select(BANNER_BUTTON, root).forEach((button) => {
        const expanded = button.getAttribute(EXPANDED_CLASS) === "true";
        toggle(button, expanded);
      });
    },
  },
);
