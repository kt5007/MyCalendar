"use strict";
console.clear();
{
  let year = 2020;
  let month = 4; //5月 0からjsは始まる

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
    // console.log(dates);
    return dates;
  }


  //カレンダー作成
  function createCalendar() {
    // 以前存在したカレンダーを削除
    const tbody = document.querySelector('tbody');
    while(tbody.firstChild){
      tbody.removeChild(tbody.firstChild);
    }

    const title = `${year}/${String(month+1).padStart(2,'0')}`;
    document.getElementById('title').textContent=title;
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
    weeks.forEach(week=>{
      const tr = document.createElement('tr');
      week.forEach(date=>{
        const td = document.createElement('td');
        td.textContent=date.date;
        if(date.isToday){
          td.classList.add('today');
        }
        if(date.isDisabled){
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    })
  }

  // 前の月
  document.getElementById('prev').addEventListener('click',()=>{
    month--;
    if(month<0){
      year--;
      month=11;
    }
    createCalendar();
  });

  //次の月
  document.getElementById('next').addEventListener('click',()=>{
    month++;
    if(month>11){
      year++;
      month=0;
    }
    createCalendar();
  });

  createCalendar();
  // getCalendarTail();
  // getCalendarHead();
  // getCalendarBody();
}