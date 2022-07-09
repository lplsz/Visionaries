import React, { useState } from 'react';



const Test = () => {
  const date = new Date('2022-06-30T00:00:00.000');
  function timeFormat(date) {
    if (!date || typeof (date) === "string") {
      this.error("参数异常，请检查...");
    }
    var y = date.getFullYear(); //年
    var m = date.getMonth() + 1; //月
    var d = date.getDate(); //日

    return y + "-" + m + "-" + d;
  }

  function getFirstDayOfWeek(date) {

    var weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7

    date.setDate(date.getDate() - weekday + 1);//往前算（weekday-1）天，年份、月份会自动变化
    return timeFormat(date);
  }
  return (
    <div> {getFirstDayOfWeek(date)}</div>
  );
}
export default Test;