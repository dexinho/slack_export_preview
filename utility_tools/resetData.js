import reusableData from "./reusableData.js";

const resetData = () => {
  reusableData.files_counter = 0;
  reusableData.user_data = [];
  reusableData.final_csv = "Date and Time; Message sender; Message content;\n";
};

export default resetData;