import { init, preload } from "./pageLoad.js";

if (document.readyState == "loading") {
  preload();
  document.addEventListener("DOMContentLoaded", init());
} else {
  init();
}
