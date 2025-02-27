
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";

interface UploadSectionProps {
  onUploadComplete: () => void;
}

export function UploadSection({ onUploadComplete }: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      await uploadFile(selectedFile);
      setSelectedFile(null);
      onUploadComplete();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border p-6 rounded-lg glass-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Upload New File</h2>
        {selectedFile && !isUploading && (
          <Button
            onClick={handleUpload}
            className="glass-button"
            disabled={isUploading}
          >
            <UploadCloud className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        )}
      </div>
      <FileUpload
        onFileSelected={handleFileSelected}
        isUploading={isUploading}
      />
    </div>
  );
}
