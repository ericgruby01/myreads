import { useState } from "react";
import { Icon } from "./Icon";
import { useClickAway } from "../hooks/useClickAway";
import { LoadingIcon } from "./LoadingIcon";
import { shelvesConfig } from "../utils/shelvesConfig";

export function MoveToShelfButton({ loading, onMove, selectedShelf }) {
  const [showDropDown, setShowDropDown] = useState(false);

  const ref = useClickAway(() => {
    setShowDropDown(false);
  });

  return (
    <div className="relative flex align-center justify-end" ref={ref}>
      <button type="button" className="mts-select" onClick={() => setShowDropDown(!showDropDown)}>
        {shelvesConfig[selectedShelf]?.label || "Move Book to..."}{" "}
        <Icon icon={showDropDown ? "angle-up" : "angle-down"} />
      </button>

      {showDropDown && (
        <div className="mts-menu">
          <div className="relative">
            {loading && (
              <div className="mts-loading">
                <div>
                  <LoadingIcon className="!block" />
                  <strong className="block text-center">Moving...</strong>
                </div>
              </div>
            )}
            <span className="mts-menu-title">Move book to:</span>
            {Object.values(shelvesConfig).map((item) => {
              const isSameShelf = selectedShelf === item.shelf;
              return (
                <span
                  key={`move_option_${item.shelf}`}
                  onClick={() => (isSameShelf ? false : onMove(item.shelf))}
                  className="mts-menu-item"
                >
                  <Icon icon={isSameShelf ? "check-circle" : "circle"} /> {item.label}
                </span>
              );
            })}
            {selectedShelf && (
              <span onClick={() => onMove("none")} className="mts-menu-item">
                <Icon icon="trash-alt" /> None
                <small className="block text-slate-400">Remove from your collection</small>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
