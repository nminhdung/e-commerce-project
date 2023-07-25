import React, { useEffect } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const PaginateItem = ({ children }) => {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const handlePage = () => {
    let paramsList = [];
    //giu lai cac truong filter truoc do
    for (let i of params.entries()) {
      paramsList.push(i);
    }
    const queries = {};
    for (let i of paramsList) {
      queries[i[0]] = i[1];
      // [["color","black"],["page","1"]]
      // => queries = {color:"black",page:"1"}
    }

    // ################################
    if (Number(children)) queries.page = children;
    console.log(queries);
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };

  return (
    <button
      onClick={handlePage}
      className={`px-4 py-2 } rounded-md ${
        +params.get("page") === +children ? "bg-black text-white" : ""
      } ${!+params.get("page") && children === 1 && "bg-black text-white"}
      transition duration-300 ${
        Number(children) ? "hover:bg-main hover:text-white " : ""
      }`}
      type="button"
      disabled={Number(children) ? false : true}
     
    >
      {children}
    </button>
  );
};

export default PaginateItem;
