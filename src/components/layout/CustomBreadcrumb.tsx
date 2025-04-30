import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

// Map of path segments to human-readable names
const pathMap: Record<string, string> = {
  "/": "Trang chủ",
  profile: "Hồ sơ",
  details: "Đánh giá chi tiết CV",
  admin: "Quản trị",
  dashboard: "Bảng điều khiển",
  users: "Người dùng",
  cvs: "Danh sách CV",
  login: "Đăng nhập",
  signup: "Đăng ký",
};

const CustomBreadcrumb = ({
  currentIsId = false,
}: {
  currentIsId?: boolean;
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Function to format breadcrumb labels
  const getLabel = (path: string) => {
    return (
      pathMap[path] ||
      path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  const validPaths = pathnames.filter(
    (path) =>
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        path
      ) && !/^\d+$/.test(path)
  );

  const displayPaths =
    currentIsId && validPaths.length > 0 ? validPaths.slice(0, -1) : validPaths;

  return (
    <Breadcrumb className="mb-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>

        {displayPaths.map((value, index) => {
          const to = `/${validPaths.slice(0, index + 1).join("/")}`;
          const isLast = index === displayPaths.length - 1;
          const label = getLabel(value);

          return (
            <React.Fragment key={to}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-textDark">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className="text-textNormal" href={to}>
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
