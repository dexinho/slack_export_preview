const filesInput = document.querySelector("#files-input");
const inputDiv = document.querySelector("#input-div");
const downloadCsvButton = document.querySelector("#download-csv-button");
let FINAL_CSV = "";
let FILES_COUNTER = 0;
const USERS_DATA = [];

const resetData = () => {
  USERS_DATA.length = 0;
  FILES_COUNTER = 0;
  FINAL_CSV = "Date and Time; Message sender; Message content;\n";
};

filesInput.addEventListener("change", (e) => {
  const slackFiles = e.target.files;
  resetData();

  [...slackFiles].forEach((file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const contents = JSON.parse(reader.result);
      FILES_COUNTER++;

      for (let i = 0; i < contents.length; i++) {
        const content = contents[i];

        const messageContent = content.text.replace(/[\r\n]/g, "");

        if (!messageContent) continue;

        const userProfile = content.user_profile

        const [senderName, icon] = userProfile
          ? [userProfile.first_name.replace(/[\r\n]/g, ""), userProfile.image_72.replace(/[\\]/g, '')]
          : ["BOT", 'assets/slackbot_avatar.png'];
        const date = new Date(content.ts * 1000).toLocaleDateString("bs", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        const data = {
          date,
          senderName,
          messageContent,
          icon,
        };

        USERS_DATA.push(data);
        writeContent({date, senderName, messageContent});
      }

      if (FILES_COUNTER === slackFiles.length && USERS_DATA.length > 0) {
        downloadCsvButton.style.display = "block";
        previewMessages();
      } else if (FILES_COUNTER === slackFiles.length && USERS_DATA.length === 0) {
        alert('There is nothing to read in the file!')
      }
    };
  });
});

function writeContent({ date, senderName, messageContent }) {
  FINAL_CSV += date + ";";
  FINAL_CSV += senderName + ";";
  FINAL_CSV += messageContent + "\n";
}

function downloadCSV() {
  const blob = new Blob([FINAL_CSV], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "text.csv";
  link.click();
}

downloadCsvButton.addEventListener("click", downloadCSV);
const previewDiv = document.querySelector("#preview-div");

const previewMessages = () => {
  previewDiv.style.display = "flex";
  cleanPreviewMessages();

  USERS_DATA.forEach((data) => {
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
    img.classList.add('icon')
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

    img.src = data.icon
    userNameSpan.textContent = data.senderName;
    dateSpan.textContent = data.date;
    userMessage.textContent = data.messageContent;
  });
};

const cleanPreviewMessages = () => {
  while (previewDiv.childElementCount > 0)
    previewDiv.removeChild(previewDiv.firstElementChild);
};
