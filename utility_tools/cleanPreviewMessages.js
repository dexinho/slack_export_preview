import { previewDiv } from "./querySelectors.js";

const cleanPreviewMessages = () => {
  while (previewDiv.childElementCount > 0)
    previewDiv.removeChild(previewDiv.firstElementChild);
};

export default cleanPreviewMessages;
