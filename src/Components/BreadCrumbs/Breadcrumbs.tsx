import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

interface BreadCrumbsProps {
  style?: React.CSSProperties;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ style }) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const breadcrumbName = pathSnippets[index].replace(/%20/g, " ");
    return {
      path: url,
      breadcrumbName,
    };
  });

  return (
    <Breadcrumb style={style}>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index} className="breadcrumb_item">
          {index === breadcrumbItems.length - 1 ? (
            <span>{item.breadcrumbName}</span>
          ) : (
            <Link to={item.path}>{item.breadcrumbName}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
