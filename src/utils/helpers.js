import moment from "moment";

export const database = [
  {
    email: "user@hamoye.com",
    password: "user123",
  },
];

export const errors = {
  mail: "invalid username",
  pass: "invalid password"
};

export const getCurrentDate = () => {
  return moment().format("YYYY-MM-DDTkk:mm");
};

export const getLast2Hrs = () => {
  return moment().subtract(2, "hours").format("YYYY-MM-DDTkk:mm");
};

export const getTimeStamp = (value) => {
  let getValueTimeStamp = new Date(value).getTime() / 1000;
  return new Date(getValueTimeStamp).getTime();
};

export const getLast2HrsWithParam = (value) => {
  let last2Hrs = moment(value).subtract(2, "hours").format("YYYY-MM-DDTkk:mm");
  return moment(last2Hrs).format("YYYY-MM-DDTkk:mm");
};
