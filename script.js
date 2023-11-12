const filesInput = document.querySelector("#files-input");
const inputDiv = document.querySelector("#input-div");
const downloadCsvButton = document.querySelector("#download-csv-button");
let FINAL_CSV = "";
let FILES_COUNTER = 0;
const USERS_DATA = [];
const USER_ICON_COLORS = {};

const resetData = () => {
    USERS_DATA.length = 0;
    FILES_COUNTER = 0;
    FINAL_CSV = "Date and Time; Message sender; Message content;\n";
};

filesInput.addEventListener("change", (e) => {
    const files = e.target.files;
    resetData();

    [...files].forEach((file) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const contents = JSON.parse(reader.result);
            FILES_COUNTER++;

            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                const date = new Date(content.ts * 1000).toLocaleDateString(
                    "bs",
                    {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                    }
                );
                const senderName = content.user.replace(/[\r\n]/g, "");
                const messageContent = content.text.replace(/[\r\n]/g, "");

                const data = {
                    date,
                    senderName,
                    messageContent,
                };

                if (!USER_ICON_COLORS[senderName])
                    USER_ICON_COLORS[senderName] = `rgb(${Math.floor(
                        Math.random() * 100 + 100
                    )}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(
                        Math.random() * 100 + 100
                    )})`;

                USERS_DATA.push(data);
                writeContent(data);
            }

            if (FILES_COUNTER === files.length) {
                downloadCsvButton.style.display = "block";
                previewMessages();
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
        const i = document.createElement("i");
        const userNameDateDiv = document.createElement("div");
        const userMessage = document.createElement("div");
        const userNameSpan = document.createElement("span");
        const dateSpan = document.createElement("span");

        previewSlot.classList.add("preview-slot");
        iconDiv.classList.add("icon-div");
        i.classList.add("fa-solid");
        i.classList.add("fa-user");
        messageDiv.classList.add("message-div");
        userNameDateDiv.classList.add("user-name-date-div");
        userMessage.classList.add("user-message");
        userNameSpan.classList.add("user-name-span");
        dateSpan.classList.add("date-span");

        previewDiv.append(previewSlot);
        previewSlot.append(iconDiv);
        previewSlot.append(messageDiv);
        iconDiv.append(i);
        messageDiv.append(userNameDateDiv);
        messageDiv.append(userMessage);
        userNameDateDiv.append(userNameSpan);
        userNameDateDiv.append(dateSpan);

        i.style.color = USER_ICON_COLORS[data.senderName];
        userNameSpan.textContent = data.senderName;
        dateSpan.textContent = data.date;
        userMessage.textContent = data.messageContent;
    });
};

const cleanPreviewMessages = () => {
    while (previewDiv.childElementCount > 0)
        previewDiv.removeChild(previewDiv.firstElementChild);
};
