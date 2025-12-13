import { FaMapLocationDot } from "react-icons/fa6";
export default function LocationBadge({ content }) {
  return (
    <div className="absolute">
      <h1 class="ribbon flex justify-center items-center gap-5 glass z-40 ">
        <FaMapLocationDot className="text-red-500 text-4xl" />
        {content}
      </h1>
    </div>
  );
}
