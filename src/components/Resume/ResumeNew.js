import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import pdf from "../../Assets/Resume.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scale = width > 900 ? 1.6 : width > 600 ? 1.0 : 0.62;

  return (
    <main className="resume-page">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Résumé</h2>
          <div className="idx">PDF · 1 page</div>
        </div>

        <div className="resume-actions">
          <a
            className="btn"
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            download="Andrew_Ho_Resume.pdf"
          >
            Download CV
          </a>
          <a className="btn ghost" href={pdf} target="_blank" rel="noopener noreferrer">
            Open in new tab
          </a>
        </div>

        <div className="resume-doc">
          <Document
            file={pdf}
            loading={<div className="resume-loading">Loading résumé…</div>}
            error={<div className="resume-loading">Couldn&rsquo;t load the PDF — try the download button above.</div>}
          >
            <Page
              pageNumber={1}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </main>
  );
}

export default ResumeNew;
