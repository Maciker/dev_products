
import React, { useState } from "react";
import { FileCard } from "@/components/ui/file-card";
import { UploadedFile, downloadReport } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface FileListProps {
  files: UploadedFile[];
}

export function FileList({ files }: FileListProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (file: UploadedFile) => {
    if (downloadingId) return; // Prevent multiple downloads at once
    
    try {
      setDownloadingId(file.id);
      const blob = await downloadReport(file.id);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${file.name}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the report",
        variant: "destructive"
      });
    } finally {
      setDownloadingId(null);
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg animate-fade-in">
        <p className="text-muted-foreground">No files uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          onDownload={handleDownload}
          isDownloading={downloadingId === file.id}
        />
      ))}
    </div>
  );
}
