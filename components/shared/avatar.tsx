import Image from "next/image";
import cx from "classnames";

export default function Avatar({
  height,
  src,
  width,
}: {
  height: number;
  src: string;
  width: number;
}) {
  return (
    <div
      className={cx(
        `h-${height} w-${width}`,
        "overflow-hidden rounded-full border border-gray-200",
      )}
    >
      <Image src={src} alt="Avatar" width={width} height={height} />
    </div>
  );
}
