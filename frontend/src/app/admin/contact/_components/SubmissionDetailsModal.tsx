// app/admin/contact/_components/SubmissionDetailsModal.tsx
"use client";

import React, { useState } from 'react';
import { ContactSubmission, ContactSubmissionStatus } from "@prisma/client";
import { Send, Trash } from "lucide-react";
import SubmissionStatusBadge from './SubmissionStatusBadge';
import SubmissionTypeBadge from './SubmissionTypeBadge';
import { updateSubmissionStatus, sendResponseEmail, deleteSubmission } from "../_actions/submissions";

type SubmissionDetailsModalProps = {
  submission: ContactSubmission;
  isOpen: boolean;
  onClose: () => void;
};

export default function SubmissionDetailsModal({ 
  submission, 
  isOpen, 
  onClose 
}: SubmissionDetailsModalProps) {
  const [responseText, setResponseText] = useState("");
  
  if (!isOpen) return null;

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const formData = new FormData();
    formData.append("submissionId", submission.id);
    formData.append("status", e.target.value);
    await updateSubmissionStatus(formData);
  };

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("submissionId", submission.id);
    formData.append("responseText", responseText);
    await sendResponseEmail(formData);
    onClose();
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this submission?")) {
      const formData = new FormData();
      formData.append("submissionId", submission.id);
      await deleteSubmission(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Message Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p>{submission.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p>{submission.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Type</p>
            <SubmissionTypeBadge type={submission.type} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <div className="flex items-center space-x-2">
              <SubmissionStatusBadge status={submission.status} />
              <select 
                className="text-xs border rounded p-1"
                onChange={handleStatusChange}
                defaultValue=""
              >
                <option value="">Change status</option>
                {Object.values(ContactSubmissionStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Date</p>
            <p>{new Date(submission.createdAt).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500 mb-2">Message</p>
          <div className="bg-gray-50 p-4 rounded border text-sm whitespace-pre-wrap">
            {submission.message}
          </div>
        </div>
        
        <form onSubmit={handleSendResponse} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Send Response
          </label>
          <textarea
            rows={5}
            className="w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm"
            placeholder="Type your response here..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            required
          ></textarea>
          
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Send Response</span>
            </button>
          </div>
        </form>
        
        <div className="flex justify-between mt-6 pt-4 border-t">
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 bg-red-50 text-red-600 px-3 py-2 rounded-md hover:bg-red-100 transition-colors"
          >
            <Trash className="w-4 h-4" />
            <span>Delete</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}