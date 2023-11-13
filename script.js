import onDataUpload from "./utility_tools/onDataUpload.js";
import downloadCSV  from "./utility_tools/downloadCSV.js";
import { filesInput, downloadCsvButton } from "./utility_tools/querySelectors.js";

filesInput.addEventListener("change", (e) => {
  onDataUpload(e.target.files)
});

downloadCsvButton.addEventListener('click', downloadCSV)
