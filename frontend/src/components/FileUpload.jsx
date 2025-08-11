import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUpload.css";

export default function FileUpload({ onFileSelected }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelected(acceptedFiles[0]);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] }
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      <p>{isDragActive ? "Drop the PDF here..." : "Drag & drop your resume here, or click to select"}</p>
    </div>
  );
}
