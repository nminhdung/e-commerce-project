import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { IoIosArrowForward } from "react-icons/io";

const BreadCumbs = ({ title, category}) => {
  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/", breadcrumb: category },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  
  return (
    <div className="text-sm flex items-center">
      {breadcrumbs
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb },index,thisArray) => {
          return (
            <Link
              className="flex items-center hover:text-main gap-1 uppercase"
              key={match.pathname}
              to={match.pathname}
            >
              <span>{breadcrumb}</span>
              {index!==thisArray.length-1 && <IoIosArrowForward />}
            </Link>
          );
        })}
    </div>
  );
};

export default BreadCumbs;
