
import React from "react";
import { Download, FileText, Image, FileSpreadsheet, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UploadedFile } from "@/lib/api";

interface FileCardProps {
  file: UploadedFile;
  onDownload: (file: UploadedFile) => void;
  isDownloading: boolean;
}

export function FileCard({ file, onDownload, isDownloading }: FileCardProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getFileIcon = () => {
    if (file.type === "application/pdf") {
      return <FileText className="h-5 w-5" />;
    } else if (file.type === "text/csv") {
      return <FileSpreadsheet className="h-5 w-5" />;
    } else if (file.type.startsWith("image/")) {
      return <Image className="h-5 w-5" />;
    } else {
      return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusIcon = () => {
    if (file.status === "completed") {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (file.status === "processing") {
      return <Clock className="h-4 w-4 text-amber-500" />;
    } else {
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusText = () => {
    if (file.status === "completed") {
      return "Report ready";
    } else if (file.status === "processing") {
      return "Processing...";
    } else {
      return "Processing failed";
    }
  };

  return (
    <div className={cn(
      "border rounded-lg p-4 transition-all duration-200",
      "hover:shadow-sm",
      "glass-card animate-scale-in"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary/10 rounded mt-1">
            {getFileIcon()}
          </div>
          <div>
            <p className="font-medium text-sm line-clamp-1">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </p>
            <div className="mt-1 flex items-center">
              {getStatusIcon()}
              <span className="ml-1 text-xs">
                {getStatusText()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(file.uploadDate)}
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "transition-all",
            file.status === "completed" ? "opacity-100" : "opacity-50 cursor-not-allowed"
          )}
          disabled={file.status !== "completed" || isDownloading}
          onClick={() => file.status === "completed" && onDownload(file)}
        >
          {isDownloading ? (
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin mr-2"></div>
              <span>Downloading...</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Download className="h-3 w-3 mr-1" />
              <span>Download</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
