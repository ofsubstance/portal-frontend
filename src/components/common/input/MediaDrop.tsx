import { useEffect, useRef, useState } from "react";

import { Button } from "@mui/material";
import { RiDeleteBin3Line as RemoveIcon } from "react-icons/ri";
import mediaUploadImg from "@/assets/mediaUpload.svg";

interface MediaDropProps {
  maxSizeMB?: number;
  imageTypes?: string[];
  videoTypes?: string[];
  onChange?: (file: File | null) => void;
  value?: File | null;
  compact?: boolean;
  variant: "image" | "video";
}

interface MediaPreviewProps {
  variant: "image" | "video";
  media: File | string | null;
  onRemoveClick: () => void;
}

function MediaPreview({ media, variant, onRemoveClick }: MediaPreviewProps) {
  if (!media) return null;

  const isImage = variant === "image";

  return (
    <div className="relative">
      {isImage ? (
        <img
          src={typeof media === "string" ? media : URL.createObjectURL(media)}
          alt="preview"
          className="w-full rounded-md aspect-video object-cover "
        />
      ) : (
        <video controls className="w-full rounded-md aspect-video">
          <source
            src={typeof media === "string" ? media : URL.createObjectURL(media)}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
      <Button
        fullWidth
        onClick={onRemoveClick}
        variant="contained"
        color="error"
        startIcon={<RemoveIcon />}
        sx={{
          mt: 2,
        }}
      >
        Remove
      </Button>
    </div>
  );
}

function MediaDrop({
  maxSizeMB = 5,
  imageTypes = ["image/jpeg", "image/png"],
  videoTypes = ["video/mp4"],
  onChange = () => {},
  value,
  compact = false,
  variant,
}: MediaDropProps) {
  const [mediaPreview, setMediaPreview] = useState<File | string | null>(null);
  const inputId = useRef(`file-drop-input-${variant}-${Date.now()}`);

  useEffect(() => {
    if (value) {
      setMediaPreview(value);
    }
  }, [value]);

  useEffect(() => {
    if (typeof mediaPreview === "string") return;
    onChange(mediaPreview);
  }, [mediaPreview]);

  const handlePreventDefault = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      validateFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      validateFile(file);
    }
  };

  const validateFile = (file: File) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size <= maxSizeBytes) {
      const allowedTypes = variant === "image" ? imageTypes : videoTypes;
      if (allowedTypes.includes(file.type)) {
        setMediaPreview(file);
      } else {
        // Display error message within the component
        alert("Invalid file type. Please choose a valid file type.");
      }
    } else {
      // Display error message within the component
      alert(`File size exceeds the maximum limit of ${maxSizeMB}MB.`);
    }
  };

  const handleRemoveMedia = () => setMediaPreview(null);

  return (
    <div
      data-testid="file-drop"
      className="w-full"
      onDragEnter={handlePreventDefault}
      onDragLeave={handlePreventDefault}
      onDragOver={handlePreventDefault}
      onDrop={handleDrop}
    >
      <MediaPreview
        variant={variant}
        media={mediaPreview}
        onRemoveClick={handleRemoveMedia}
      />

      {!mediaPreview && (
        <div>
          <label
            htmlFor={inputId.current}
            className="cursor-pointer overflow-hidden w-full p-4 flex flex-col items-center justify-center border-2 border-divider border-dashed rounded bg-white hover:bg-slate-50 transition-colors"
          >
            {!compact && (
              <img src={mediaUploadImg} alt="Upload" className="-mt-6 h-44" />
            )}

            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload {variant}</span>{" "}
              or drag and drop
            </p>

            <p className="text-xs">
              {variant === "image" ? "JPEG or PNG" : "MP4"} (MAX. {maxSizeMB}MB)
            </p>
            <input
              id={inputId.current}
              type="file"
              accept={
                variant === "image"
                  ? imageTypes.join(",")
                  : videoTypes.join(",")
              }
              onChange={handleFileInputChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default MediaDrop;
