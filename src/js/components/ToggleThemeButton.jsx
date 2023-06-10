import { useTheme } from "../contexts/ThemeContext";
import { Icon } from "./Icon";

export function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-block ml-4"
    >
      <Icon icon={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}
