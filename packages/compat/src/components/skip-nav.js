import { once } from "receptor";
import behavior from "../utils/behavior";
import { CLICK } from "../events";
import { prefix as PREFIX } from "../config";

const LINK = `.${PREFIX}-skipnav[href^="#"], .${PREFIX}-footer__return-to-top [href^="#"]`;
const MAINCONTENT = "main-content";

function setTabindex() {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  const id = encodeURI(this.getAttribute("href"));
  const target = document.getElementById(
    id === "#" ? MAINCONTENT : id.slice(1),
  );

  if (target) {
    target.style.outline = "0";
    target.setAttribute("tabindex", 0);
    target.focus();
    target.addEventListener(
      "blur",
      once(() => {
        target.setAttribute("tabindex", -1);
      }),
    );
  } else {
    // throw an error?
  }
}

export default behavior({
  [CLICK]: {
    [LINK]: setTabindex,
  },
});
