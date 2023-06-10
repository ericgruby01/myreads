import classNames from "classnames";

export function Icon({ icon }) {
  return <i className={classNames('uil', `uil-${icon}`)}></i>;
}
