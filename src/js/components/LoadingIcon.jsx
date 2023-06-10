import classNames from "classnames";

export function LoadingIcon({className}) {
  return (
    <div className={classNames("lds-ellipsis", className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
