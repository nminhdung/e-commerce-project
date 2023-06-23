import icons from "./icons";

const { AiOutlineStar, AiFillStar } = icons;

export const createSlug = (string) => {
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};
export const formatMoney = (number) => {
  return Number(number?.toFixed(1)).toLocaleString();
};

export const renderStarFromNumber = (number, size = 16) => {
  if (!Number(number)) return [];

  //4 = > [1,1,1,1,0]
  const starsArr = [];
  for (let i = 0; i < +number; i++) {
    starsArr.push(<AiFillStar color="orange" size={size} />);
  }
  for (let i = 5; i > +number; i--) {
    starsArr.push(<AiOutlineStar size={size} />);
  }
  return starsArr;
};
export const secondsToHms = (d) => {
  d = Number(d) / 1000;
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);
  return ({ h, m, s });
};
