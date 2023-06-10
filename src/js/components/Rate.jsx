import { StarRate } from "./Illustrations/StarRate";

export function Rate({ rate }) {
  return (
    <span className="inline-block flex items-center" title={`Average Rating: ${rate.toFixed(1)}`}>
      <StarRate/>
      {rate.toFixed(1)}
    </span>
  );
}
