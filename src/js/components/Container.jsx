import classnames from "classnames";

export function Container({ children, className }) {
  return <div className={classnames("container px-4 mx-auto", className)}>{children}</div>;
}
