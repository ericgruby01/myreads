export function BookAttribute({ attribute, condition, render, emptyText = "Unknown." }) {

  const emptyEl = <span className="text-slate-600">{emptyText}</span>

  if (!attribute) {
    return emptyEl
  }

  const renderFn = () => (render ? render(attribute) : attribute);

  if (condition && condition(attribute)) {
    return renderFn();
  } else {
    return attribute ? renderFn() : emptyEl;
  }
}
