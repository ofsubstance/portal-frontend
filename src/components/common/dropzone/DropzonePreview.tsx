import { RiCloseLine as RemoveIcon } from "react-icons/ri";

interface DropzonePreviewProps {
  variant: "image" | "video";
  media: File | string | null;
  height?: number;
  onRemoveClick: () => void;
}

export default function DropzonePreview({
  media,
  variant,
  height,
  onRemoveClick,
}: DropzonePreviewProps) {
  if (!media) return null;

  const isImage = variant === "image";

  return (
    <div className="relative w-fit">
      {isImage ? (
        <img
          src={typeof media === "string" ? media : URL.createObjectURL(media)}
          alt="preview"
          className="rounded-md object-cover"
          style={{ height }}
        />
      ) : (
        <video controls className="aspect-video w-full rounded-md">
          <source
            src={typeof media === "string" ? media : URL.createObjectURL(media)}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}

      <button
        onClick={onRemoveClick}
        className="absolute right-4 top-4 flex aspect-square items-center justify-center rounded-full bg-red-500 p-1.5 text-white shadow transition-colors hover:bg-red-700"
      >
        <RemoveIcon size={20} />
      </button>
    </div>
  );
}
