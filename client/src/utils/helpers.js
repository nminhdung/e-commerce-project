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
  // lam` tron` duoi'
  for (let i = 0; i < +Math.floor(+number); i++) {
    starsArr.push(<AiFillStar color="orange" size={size} />);
  }
  for (let i = 5; i > +Math.floor(+number); i--) {
    starsArr.push(<AiOutlineStar size={size} />);
  }
  return starsArr;
};
export const secondsToHms = (d) => {
  d = Number(d) / 1000;
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);
  return { h, m, s };
};

export const validateInput = (payload, setInvalidFields) => {
  let invalids = 0;
  //payload = { email:"",password:"",password}
  const formatPayload = Object.entries(payload);
  // formatPayload = [["email",""],["password",""]]
  for (let array of formatPayload) {
    if (array[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: array[0], mes: "Require this field." },
      ]);
    }
  }
  // for (let array of formatPayload) {
  //   switch (array[0]) {
  //     case "email":
  //       const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //       if (!array[1].match(regex)) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: array[0], mes: "Email invalid" },
  //         ]);
  //       }

  //       break;
  //     case "password":
  //       if (array[1].length <= 6) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: array[0], mes: "Password must be at least 6 characters" },
  //         ]);
  //       }

  //       break;
  //     case "phone":
  //       if (array[1].length !== 10) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: array[0], mes: "Phone must be 10 characters" },
  //         ]);
  //       }

  //       break;
  //     default:
  //       break;
  //   }
  // }
  return invalids;
};

export const formatPrice = (number) => Math.round(number / 1000) * 1000;
