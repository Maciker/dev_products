import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface FileData {
  id: string;
  filename: string;
  uploadDate: string;
}

interface FilesResponse {
  files: FileData[];
}

const FileList: React.FC = () => {
  const { data, error, isLoading } = useQuery<FilesResponse, Error>({
    queryKey: ['files'],
    queryFn: async () => {
      const res = await fetch('/api/files');
      if (!res.ok) throw new Error('Failed to fetch files');
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{(error as Error).message}</p>;

  const files = data?.files || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.id} className="flex justify-between items-center">
              <span>
                {file.filename} - Uploaded on {new Date(file.uploadDate).toLocaleString()}
              </span>
              <a
                href={`/api/reports/${file.id}`}
                download={`report-${file.id}.pdf`}
                className="text-blue-500 hover:underline"
              >
                Download Report
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;