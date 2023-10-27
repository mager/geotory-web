import Image from "next/image";

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
    <div className="overflow-hidden rounded-lg border-2 border-gray-200">
      <Image src={src} alt="Avatar" width={width} height={height} />
    </div>
  );
}
