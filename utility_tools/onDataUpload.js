import createCSV from "./createCSV.js";
import resetData from "./resetData.js";
import previewMessages from "./previewMessages.js";
import cleanPreviewMessages from "./cleanPreviewMessages.js";
import reusableData from "./reusableData.js";
import { downloadCsvButton } from "./querySelectors.js";

const onDataUpload = (slackFiles) => {
  resetData();

  [...slackFiles].forEach((file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const contents = JSON.parse(reader.result);
      reusableData.files_counter++;

      for (let i = 0; i < contents.length; i++) {
        const content = contents[i];
        const messageContent = content.text.replace(/[\r\n]/g, "");

        if (!messageContent) continue;

        const userProfile = content.user_profile;
        const [senderName, icon] = userProfile
          ? [
              userProfile.first_name.replace(/[\r\n]/g, ""),
              userProfile.image_72.replace(/[\\]/g, ""),
            ]
          : ["BOT", "assets/slackbot_avatar.png"];
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

        reusableData.user_data.push(data);
        reusableData.final_csv = createCSV({
          final_csv: reusableData.final_csv,
          date,
          senderName,
          messageContent,
        });
      }

      if (
        reusableData.files_counter === slackFiles.length &&
        reusableData.user_data.length > 0
      ) {
        downloadCsvButton.style.display = "block";
        cleanPreviewMessages();
        previewMessages();
      } else if (
        reusableData.files_counter === slackFiles.length &&
        reusableData.user_data.length === 0
      ) {
        alert("There is nothing to read in the file!");
      }
    };
  });
};

export default onDataUpload;
