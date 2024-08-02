// 성별
export const getGenderText = genderCode => {
  switch (genderCode) {
    case 1:
      return "남성";
    case 2:
      return "여성";
    case 3:
      return "성별무관";
    default:
      return "";
  }
};

// 년도 문자로
export const getYearLastTwoDigits = year => {
  // return year.toString().slice(-2);
  return year.toString();
};
