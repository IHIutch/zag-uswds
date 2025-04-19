import behavior from "../utils/behavior";
import toggleFormInput from "../utils/toggle-form-input";
import { CLICK } from "../events";
import { prefix as PREFIX } from "../config";

const LINK = `.${PREFIX}-show-password`;

function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
}

export default behavior({
  [CLICK]: {
    [LINK]: toggle,
  },
});
