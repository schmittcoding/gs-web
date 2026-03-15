/* eslint-disable @next/next/no-img-element */
export default function ItemCheckoutThumbnail({
  name,
  src,
}: {
  name: string;
  src: string;
}) {
  return (
    <div className="relative size-10 shrink-0 rounded bg-gray-800 overflow-hidden">
      <img alt={name} src={src} className="object-contain size-full" />
    </div>
  );
}
