
import { toast } from "@/hooks/use-toast";

// Type definitions
export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'processing' | 'completed' | 'failed';
  reportUrl?: string;
}

// Mock database of files
let mockFiles: UploadedFile[] = [];

// Upload file function
export const uploadFile = async (file: File): Promise<UploadedFile> => {
  // Validate file
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    toast({
      title: "Upload failed",
      description: "File size exceeds the 10MB limit",
      variant: "destructive"
    });
    throw new Error('File size exceeds limit');
  }

  const allowedTypes = ['application/pdf', 'text/csv', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    toast({
      title: "Upload failed",
      description: "File type not supported. Please upload PDF, CSV, or images",
      variant: "destructive"
    });
    throw new Error('File type not supported');
  }

  // Simulate file upload with progress
  await simulateUploadProgress(file);

  // Create a new file record
  const newFile: UploadedFile = {
    id: generateId(),
    name: file.name,
    type: file.type,
    size: file.size,
    uploadDate: new Date().toISOString(),
    status: 'processing'
  };

  // Add to mock database
  mockFiles = [newFile, ...mockFiles];

  toast({
    title: "File uploaded",
    description: "Your file is now being processed",
  });

  // Simulate report generation
  setTimeout(() => {
    const index = mockFiles.findIndex(f => f.id === newFile.id);
    if (index !== -1) {
      mockFiles[index] = {
        ...mockFiles[index],
        status: 'completed',
        reportUrl: `/api/reports/${newFile.id}`
      };
    }
  }, 3000);

  return newFile;
};

// Get all files
export const getFiles = async (): Promise<UploadedFile[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockFiles];
};

// Download report
export const downloadReport = async (fileId: string): Promise<Blob> => {
  // Find file
  const file = mockFiles.find(f => f.id === fileId);
  
  if (!file) {
    toast({
      title: "Download failed",
      description: "File not found",
      variant: "destructive"
    });
    throw new Error('File not found');
  }

  if (file.status !== 'completed') {
    toast({
      title: "Report not ready",
      description: "The report is still being generated",
      variant: "destructive"
    });
    throw new Error('Report not ready');
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));

  // Generate mock report content
  let content = '';
  if (file.type === 'application/pdf') {
    // PDF report (mock)
    content = 'Mock PDF report content';
  } else if (file.type === 'text/csv') {
    // CSV report (mock)
    content = 'id,name,value\n1,item1,100\n2,item2,200';
  } else {
    // Image analysis report (mock)
    content = JSON.stringify({
      filename: file.name,
      filesize: file.size,
      dimensions: '800x600',
      format: file.type,
      analysis: 'Mock image analysis results'
    }, null, 2);
  }

  toast({
    title: "Report downloaded",
    description: `Report for ${file.name} has been downloaded`,
  });

  // Convert to blob
  return new Blob([content], { type: 'text/plain' });
};

// Helper functions
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

async function simulateUploadProgress(file: File): Promise<void> {
  const totalChunks = 10;
  const chunkSize = file.size / totalChunks;
  
  for (let i = 0; i < totalChunks; i++) {
    // Simulate uploading each chunk
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // In a real implementation, you would report progress here
    const progress = ((i + 1) / totalChunks) * 100;
    console.log(`Upload progress: ${Math.round(progress)}%`);
  }
}
