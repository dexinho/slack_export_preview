function createCSV({ final_csv, date, senderName, messageContent }) {
  final_csv += date + ";" + senderName + ";" + messageContent + "\n";

  return final_csv;
}

export default createCSV;