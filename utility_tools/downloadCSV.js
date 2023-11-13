import reusableData from "./reusableData.js";

const downloadCSV = () => {
  const blob = new Blob([reusableData.final_csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "slack_data.csv";
  link.click();
}

export default downloadCSV;