"use client";

import GameButton from "@/components/common/game.button";
import { cn } from "@/lib/utils";
import { IconFile, IconTrash } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { DropzoneProps, useDropzone } from "react-dropzone";

type UploaderProps = DropzoneProps & {
  className?: string;
  error?: boolean;
  name?: string;
  onUploadFile?: (file: File[]) => void;
  placeholder?: string;
  value?: File[];
};

export default function Uploader({
  className,
  error,
  name,
  onUploadFile,
  placeholder,
  value = [],
}: UploaderProps) {
  const [files, setFiles] = useState<File[]>(value);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onUploadFile?.(acceptedFiles);
  };

  const handleRemoveFile = (fileId: string) => {
    const filesUploaded = files.filter(({ name }) => fileId !== name);

    setFiles(filesUploaded);
    onUploadFile?.(filesUploaded);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    onDrop: handleDrop,
    maxSize: 5242880,
  });

  return (
    <section className="space-y-2">
      <div className="relative">
        <input
          type="file"
          name={name}
          className="hidden pointer-events-none"
          style={{ opacity: 0 }}
          ref={hiddenInputRef}
        />
        {files.length > 0 ? (
          <div className="shape-main border border-gray-700 p-4">
            {files.map(({ name }) => (
              <div className="flex justify-between items-center" key={name}>
                <div className="flex gap-3 items-center">
                  <IconFile />
                  <p className="text-white w-75 truncate">{name}</p>
                </div>
                <GameButton
                  className="p-0"
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => handleRemoveFile(name)}
                >
                  <IconTrash />
                </GameButton>
              </div>
            ))}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              "uploader flex items-center flex-col gap-4 w-full bg-gray-900 p-6",
              className,
            )}
            data-error={error}
          >
            <input {...getInputProps()} name={name} />
            <span className="text-gray-500 text-center text-sm">
              {placeholder ??
                "Drag & drop some files here, or click to select files"}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
