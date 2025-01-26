'use client';
import { useFormContext } from "@/contexts/FormContext";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Calendar, User, Download } from "lucide-react";
import useTemplate from "@/hooks/useTemplate";
import { useUser } from "@/contexts/UserContext";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ResearchDetailPage() {
  const { id, researchId } = useParams();
  const { templateData, loading, error } = useTemplate(id);
  const { user } = useUser();
  const [numPages, setNumPages] = useState(null);

  const research = templateData?.details?.research?.find(
    (data) => data.id === Number(researchId)
  );

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (error) {
    return <div className="text-center py-12">{error}</div>;
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!research) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose prose-lg mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {research.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-sm">{user?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <time dateTime={new Date().toISOString()} className="text-sm">
                {new Date().toLocaleDateString()}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">
                {numPages ? `${numPages} pages` : '5 mins'}
              </span>
            </div>
          </div>
        </div>

        {/* Abstract Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
          <p className="text-lg text-gray-700">{research.abstract}</p>
        </div>

        {/* PDF Viewer Section */}
        <div className="mb-12">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Research Paper</h3>
              <a
                href={research.researchPaper}
                target="_blank"
                download
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Download className="h-5 w-5" />
                Download PDF
              </a>
            </div>
            
            {/* <div className="bg-gray-100 p-4">
              <Document
                file={research.researchPaper}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div className="text-center py-4">Loading PDF...</div>}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={800}
                    className="mb-4 shadow-sm"
                    loading={<div className="text-center py-4">Loading page {index + 1}...</div>}
                  />
                ))}
              </Document>
            </div> */}
          </div>
        </div>
      </article>
    </div>
  );
}
