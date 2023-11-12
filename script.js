const filesInput = document.querySelector("#files-input");
const inputDiv = document.querySelector("#input-div");
const downloadCsvButton = document.querySelector("#download-csv-button");
let FINAL_CSV = "";
let filesCounter = 0;

filesInput.addEventListener("change", (e) => {
    const files = e.target.files;
    filesCounter = 0;
    FINAL_CSV = "Date and Time; Message sender; Message content;\n";

    [...files].forEach((file) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const contents = JSON.parse(reader.result);
            filesCounter++;

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
                const senderName = content.user.replace(/[\r\n]/g, '')
                const textContent = content.text.replace(/[\r\n]/g, '')

                writeContent({
                    date,
                    senderName,
                    textContent,
                });
            }

            if (filesCounter === files.length) {
                downloadCsvButton.style.display = "block";
            }
        };
    });
});

function writeContent({ date, senderName, textContent }) {
    FINAL_CSV += date + ";";
    FINAL_CSV += senderName + ";";
    FINAL_CSV += textContent + "\n";
}

function downloadCSV() {
    const blob = new Blob([FINAL_CSV], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "text.csv";
    link.click();
}

downloadCsvButton.addEventListener("click", downloadCSV);
