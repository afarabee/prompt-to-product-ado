import { useState, useCallback } from 'react';

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string;
  uploadDate: string;
}

export const useFileUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>(() => {
    const saved = localStorage.getItem('project-config-files');
    return saved ? JSON.parse(saved) : [];
  });

  const saveFiles = useCallback((newFiles: UploadedFile[]) => {
    setFiles(newFiles);
    localStorage.setItem('project-config-files', JSON.stringify(newFiles));
  }, []);

  const uploadFile = useCallback((file: File) => {
    return new Promise<UploadedFile>((resolve, reject) => {
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('File size exceeds 10MB limit'));
        return;
      }

      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 
                           'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                           'text/plain'];
      
      if (!allowedTypes.includes(file.type)) {
        reject(new Error('File type not supported. Please use PDF, PNG, JPG, DOCX, or TXT files.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          data: reader.result as string,
          uploadDate: new Date().toISOString(),
        };

        const updatedFiles = [...files, newFile];
        saveFiles(updatedFiles);
        resolve(newFile);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }, [files, saveFiles]);

  const deleteFile = useCallback((id: string) => {
    const updatedFiles = files.filter(file => file.id !== id);
    saveFiles(updatedFiles);
  }, [files, saveFiles]);

  const downloadFile = useCallback((file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return {
    files,
    uploadFile,
    deleteFile,
    downloadFile,
    formatFileSize,
  };
};