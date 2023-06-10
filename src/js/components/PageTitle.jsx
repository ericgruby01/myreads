import { Icon } from "./Icon";

export function PageTitle({ title, icon }) {
  return (
    <h1 className="page-title">
      <Icon icon={icon} /> {title}
    </h1>
  );
}
