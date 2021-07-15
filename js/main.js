"use strict";
console.clear();
{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); //5月 0からjsは始まる

  function getCalendarHead() {
    const dates = []; // date: 日付, day: 曜日
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();
    for (let i = 0; i < n; i++) {
      //30
      //29 30
      //28 29 30
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    // console.log(dates);
    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    // console.log(dates);
    return dates;
  }

  function getCalendarBody() {
    const dates = [];
    // day=0指定で翌月の1日前を取得
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    //今日の日にちだけ太字にするための処理
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }
    // console.log(dates);
    return dates;
  }

  // 以前存在したカレンダーを削除
  function clearCalendar() {
    const tbody = document.querySelector("tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }
  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, "0")}`;
    document.getElementById("title").textContent = title;
  }
  function renderWeeks() {
    // ...スプレッド構文
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    //週毎のデータ取得
    const weeks = [];
    const weeksCount = dates.length / 7;
    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }
    // console.log(weeks);
    // console.log(dates);
    weeks.forEach((week) => {
      const tr = document.createElement("tr");
      week.forEach((date) => {
        const td = document.createElement("td");
        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add("today");
        }
        if (date.isDisabled) {
          td.classList.add("disabled");
        }
        tr.appendChild(td);
      });
      document.querySelector("tbody").appendChild(tr);
    });
  }

  //カレンダー作成
  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  // 前の月
  document.getElementById("prev").addEventListener("click", () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalendar();
  });

  //次の月
  document.getElementById("next").addEventListener("click", () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCalendar();
  });

  //todayを押したときの処理
  document.getElementById("today").addEventListener("click", () => {
    year=today.getFullYear();
    month=today.getMonth();
    createCalendar();
  });

  createCalendar();
  // getCalendarTail();
  // getCalendarHead();
  // getCalendarBody();
}
