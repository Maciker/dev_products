
import React, { useState, useRef } from "react";
import { UploadCloud, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isUploading: boolean;
  accept?: string;
  maxSize?: number; // in bytes
}

export function FileUpload({
  onFileSelected,
  isUploading,
  accept = "application/pdf,text/csv,image/jpeg,image/png",
  maxSize = 10 * 1024 * 1024, // 10MB default
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize) {
      setErrorMessage(`File size exceeds the ${formatFileSize(maxSize)} limit`);
      return false;
    }

    // Check file type
    const allowedTypes = accept.split(",");
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("File type not supported. Please upload a PDF, CSV, or image");
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelected(file);
      } else {
        setSelectedFile(null);
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelected(file);
      } else {
        setSelectedFile(null);
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {!selectedFile && !isUploading && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-all duration-200 ease-in-out",
            "text-center cursor-pointer hover:bg-primary/5",
            isDragging ? "file-drop-active" : "border-muted-foreground/30",
            "animate-fade-in"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Drag and drop your file here</h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse (PDF, CSV, JPEG, PNG)
          </p>
          <Button
            type="button"
            size="sm"
            className="glass-button"
            onClick={(e) => {
              e.stopPropagation();
              handleBrowseClick();
            }}
          >
            Browse Files
          </Button>

          {errorMessage && (
            <div className="mt-4 text-destructive flex items-center justify-center text-sm animate-fade-in">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errorMessage}
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Maximum file size: {formatFileSize(maxSize)}
          </p>
        </div>
      )}

      {selectedFile && !isUploading && (
        <div className="border rounded-lg p-4 animate-scale-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded">
                <UploadCloud className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleRemoveFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="border rounded-lg p-4 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded">
              <UploadCloud className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/4"></div>
            </div>
          </div>
          <div className="mt-3 w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
}
