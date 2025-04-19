import { keymap } from "receptor";
import behavior from "../utils/behavior";

const ANCHOR_BUTTON = `a[class*="usa-button"]`;

const toggleButton = (event) => {
  event.preventDefault();
  event.target.click();
};

const anchorButton = behavior({
  keydown: {
    [ANCHOR_BUTTON]: keymap({
      " ": toggleButton,
    }),
  },
});

export default anchorButton;
