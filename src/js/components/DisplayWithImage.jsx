import classNames from "classnames";

export function DisplayWithImage({ children, ImageComponent, imageClassName }) {
  return (
    <div className="display-with-image">
      <h1 className="display-with-image__title">{children}</h1>
      <ImageComponent className={classNames("w-full max-w-xs mx-auto", imageClassName)} />
    </div>
  );
}
