import { useEffect, useRef, useState } from "react";

import DropzonePreview from "./DropzonePreview";
import mediaUploadImg from "@/assets/mediaUpload.svg";
import { twMerge } from "tailwind-merge";

interface DropzoneProps {
  className?: string;
  maxSizeMB?: number;
  imageTypes?: string[];
  videoTypes?: string[];
  onChange?: (file: File | null) => void;
  defaultValue?: File | null;
  compact?: boolean;
  previewHeight?: number;
  variant?: "image" | "video";
  error?: boolean;
}

export default function Dropzone({
  className,
  maxSizeMB = 5,
  imageTypes = ["image/jpeg", "image/png"],
  videoTypes = ["video/mp4"],
  onChange,
  defaultValue,
  compact = false,
  variant = "image",
  previewHeight,
  error,
}: DropzoneProps) {
  const [preview, setPreview] = useState<File | string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (typeof preview === "string") return;
    onChange?.(preview);
  }, [preview]);

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
        setPreview(file);
      } else {
        // Display error message within the component
        alert("Invalid file type. Please choose a valid file type.");
      }
    } else {
      // Display error message within the component
      alert(`File size exceeds the maximum limit of ${maxSizeMB}MB.`);
    }
  };

  const handleRemoveMedia = () => {
    setPreview(null);
  };

  const handelClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={twMerge("w-full", className)}
      onDragEnter={handlePreventDefault}
      onDragLeave={handlePreventDefault}
      onDragOver={handlePreventDefault}
      onDrop={handleDrop}
    >
      <DropzonePreview
        variant={variant}
        media={preview}
        height={previewHeight}
        onRemoveClick={handleRemoveMedia}
      />

      {!preview && (
        <div
          onClick={handelClick}
          className={twMerge(
            "border-divider flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded border-2 border-dashed bg-white p-4 transition-colors hover:bg-slate-50",
            compact && "py-8",
            error && "border-red-300 bg-red-50 hover:bg-red-100"
          )}
        >
          {!compact && (
            <img src={mediaUploadImg} alt="Upload" className="-mt-6 h-44" />
          )}

          <p className="mb-2 text-sm">
            <span className="font-semibold">Click to upload {variant}</span> or
            drag and drop
          </p>

          <p className="text-xs">
            {variant === "image" ? "JPEG or PNG" : "MP4"} (MAX. {maxSizeMB}MB)
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={
              variant === "image" ? imageTypes.join(",") : videoTypes.join(",")
            }
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
