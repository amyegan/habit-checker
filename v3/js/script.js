const habitRecordsFile = "habit-tracker";
let habitRecordsArray = [];
const today = new Date().toLocaleDateString("en-us");

// Load habit record from localStorage after document loaded
window.addEventListener("DOMContentLoaded", event => {
  loadHabitRecords();
});

const recordHabitDone = () => {
  const dateAlreadyInArray = habitRecordsArray.some(
    record => record.date === today
  );
  if (dateAlreadyInArray) {
    return;
  }

  const newRecord = { date: today, isDone: true };
  displayRecord(newRecord);
  habitRecordsArray.push(newRecord);
  saveHabitRecords();
};

function displayRecord(record) {
  const tracker = document.getElementById("tracker");
  const newItem = document.createElement("div");
  let message;
  if (record.isDone) {
    message = "Done on " + record.date;
    newItem.classList.add("checked");
  } else {
    message = "Not done on " + record.date;
    newItem.classList.add("unchecked");
  }

  newItem.append(message);
  tracker.prepend(newItem);
}

function loadHabitRecords() {
  const localHabitRecords = localStorage.getItem(habitRecordsFile);
  if (localHabitRecords) {
    habitRecordsArray = JSON.parse(localHabitRecords);
    habitRecordsArray.forEach(record => {
      displayRecord(record);
    });
  } else {
    fakeHabitRecords();
  }
}

function fakeHabitRecords() {
  const date = new Date(today);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const lastDay = date.getDate() - 1;
  for (let day = 1; day <= lastDay; day++) {
    habitRecordsArray.push({
      date: `${month}/${day}/${year}`,
      isDone: false
    });
  }

  habitRecordsArray.forEach(record => {
    displayRecord(record);
  });
  saveHabitRecords();
}

function saveHabitRecords() {
  const jsonString = JSON.stringify(habitRecordsArray);
  localStorage.setItem(habitRecordsFile, jsonString);
}
