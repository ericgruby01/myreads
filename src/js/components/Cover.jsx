import classNames from "classnames";
import { Logo } from "./Illustrations/Logo";

export function Cover({ src, alt, title, imgClassName, fallBackClassName }) {
  return src ? (
    <img src={src} alt={alt} title={title} className={imgClassName} />
  ) : (
    <div className={classNames("no-cover", fallBackClassName)}>
        <div>
            <Logo className="max-w-full opacity-50" showLetters={false}/>
            <p className="opacity-60">Cover not available</p>
        </div>
    </div>
  );
}
