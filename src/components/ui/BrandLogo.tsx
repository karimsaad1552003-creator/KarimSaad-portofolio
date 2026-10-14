import Image from "next/image";

export function BrandLogo({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "md" | "lg";
}) {
  const large = size === "lg";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-xl bg-[#071018] ring-1 ring-white/10 ${
        large ? "h-20 px-5" : "h-12 px-3"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        width={large ? 240 : 160}
        height={large ? 80 : 48}
        className={`w-auto object-contain ${large ? "h-14" : "h-8"}`}
      />
    </span>
  );
}
