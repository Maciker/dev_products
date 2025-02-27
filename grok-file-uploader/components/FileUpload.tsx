import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    },
    onSuccess: () => {
      setFile(null);
      setError(null);
    },
    onError: (err: Error) => setError(err.message),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) uploadMutation.mutate(file);
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        disabled={!file || uploadMutation.isPending}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {uploadMutation.isSuccess && <p className="text-green-500 mt-2">File uploaded successfully!</p>}
    </div>
  );
};

export default FileUpload;