import reusableData from "./reusableData.js";
import { previewDiv } from "./querySelectors.js";

const previewMessages = () => {
  previewDiv.style.display = "flex";

  reusableData.user_data.forEach((data) => {
    const previewSlot = document.createElement("div");
    const iconDiv = document.createElement("div");
    const messageDiv = document.createElement("div");
    const img = document.createElement("img");
    const userNameDateDiv = document.createElement("div");
    const userMessage = document.createElement("div");
    const userNameSpan = document.createElement("span");
    const dateSpan = document.createElement("span");

    previewSlot.classList.add("preview-slot");
    iconDiv.classList.add("icon-div");
    img.classList.add("icon");
    messageDiv.classList.add("message-div");
    userNameDateDiv.classList.add("user-name-date-div");
    userMessage.classList.add("user-message");
    userNameSpan.classList.add("user-name-span");
    dateSpan.classList.add("date-span");

    previewDiv.append(previewSlot);
    previewSlot.append(iconDiv);
    previewSlot.append(messageDiv);
    iconDiv.append(img);
    messageDiv.append(userNameDateDiv);
    messageDiv.append(userMessage);
    userNameDateDiv.append(userNameSpan);
    userNameDateDiv.append(dateSpan);

    img.src = data.icon;
    userNameSpan.textContent = data.senderName;
    dateSpan.textContent = data.date;
    userMessage.textContent = data.messageContent;
  });
};

export default previewMessages;