"use client";

import { useRef, useState } from "react";

export default function ImageUploader() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const dragCounter = useRef(0);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      setDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragging(false);
    const droppedFiles = e.dataTransfer.files;
    for (let i = 0; i < droppedFiles.length; i++) {
      addFile(droppedFiles[i]);
    }
  };

  const addFile = (file) => {
    const objectURL = URL.createObjectURL(file);
    const isImage = file.type.startsWith("image/");
    setFiles((prev) => [...prev, { id: objectURL, file, isImage }]);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      addFile(selectedFiles[i]);
    }
  };

  const handleDelete = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (size) => {
    if (size > 1048576) return Math.round(size / 1048576) + "mb";
    if (size > 1024) return Math.round(size / 1024) + "kb";
    return size + "b";
  };

  return (
    <div className="bg-base-100 p-8 rounded-3xl space-y-8">
      <h2 className="text-xl font-bold text-center">Upload Images</h2>

      <div
        className={`border-2 border-dashed border-gray-400 rounded-lg p-4 text-center ${
          dragging ? "bg-gray-100" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="mb-2 text-gray-700">Drag &amp; drop your files here</p>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          Select Files
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Files to Upload</h3>
        {files.length === 0 ? (
          <p className="text-gray-500 text-center">No files selected</p>
        ) : (
          <ul className="space-y-2">
            {files.map((fileObj) => (
              <li
                key={fileObj.id}
                className="flex items-center justify-between border p-2 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  {fileObj.isImage && (
                    <img
                      src={fileObj.id}
                      alt={fileObj.file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                  <span className="text-sm">{fileObj.file.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-600">
                    {formatFileSize(fileObj.file.size)}
                  </span>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleDelete(fileObj.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button type="button" className="btn btn-primary">
          Upload Now
        </button>
        <button type="button" className="btn btn-outline">
          Cancel
        </button>
      </div>
    </div>
  );
}
