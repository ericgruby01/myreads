import { Icon } from "../../components/Icon";
import { PageTitle } from "../../components/PageTitle";

export function Credits() {
  return (
    <>
      <PageTitle title="Credits" icon="react" />
      <p className="mb-3">
        <strong>Developed by:</strong> Eric Gruby
      </p>
      <p className="mb-3">
        <strong>Icons:</strong>{" "}
        <a
          href="https://iconscout.com/unicons"
          target="_blank"
          className="link"
        >
          Unicons by IconScout <Icon icon="external-link-alt" />
        </a>
      </p>
      <p className="mb-3">
        <strong>Logo & Illustrations:</strong>{" "}
        <a href="http://freepik.com/" target="_blank" className="link">
          Freepik <Icon icon="external-link-alt" />
        </a>
      </p>
      <p className="mb-3">
        <strong>СSS:</strong>{" "}
        <a href="https://tailwindcss.com/" target="_blank" className="link">
          Tailwind <Icon icon="external-link-alt" />
        </a>
      </p>
      <p className="mb-3">
        <strong>
          Thanks{" "}
          <a href="http://udacity.com/" target="_blank" className="link">
            Udacity <Icon icon="external-link-alt" />
          </a>
        </strong>{" "}
        for teaching me React back in 2018.
      </p>
    </>
  );
}
