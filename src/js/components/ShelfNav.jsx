import classNames from "classnames";

import { shelvesConfig } from "../utils/shelvesConfig";
import { Icon } from "./Icon";

export function ShelfNav({ activeTab, onChange }) {
    return <div className="shelf-nav-container">
    {Object.values(shelvesConfig).map(({ icon, shelf, label }) => (
      <span
        key={`nav_${shelf}`}
        className={classNames(
          "shelf-nav-item",
          activeTab === shelf && "bg-slate-200 dark:bg-indigo-950"
        )}
        onClick={() => onChange(shelf)}
      >
        <span className="block sm:inline-block"><Icon icon={icon}/></span> {label}
      </span>
    ))}
  </div>
}