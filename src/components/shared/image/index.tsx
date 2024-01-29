import { component$ } from "@builder.io/qwik";

export interface ImageProps {
  src: string;
  size: {
    width: number;
    height: number;
  };
  alt: string;
  title?: string;
}

export const Image = component$<ImageProps>((data: ImageProps) => {
  const {
    src,
    size: { width, height },
    title,
    alt,
  } = data;
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      title={title || "Image"}
    />
  );
});
