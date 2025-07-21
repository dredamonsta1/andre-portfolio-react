import React from "react";
import styles from "./ResumeViewer.module.css";

const ResumeViewer = () => {
  // This component assumes your resume PDF is in the `public` folder.
  // It's best practice to avoid spaces in filenames for the web.
  // Consider renaming "AndreResume-ATS-2025-PDF copy.pdf" to something like "Andre-Wilkinson-Resume.pdf"
  const pdfUrl = "/Andre-Wilkinson-Resume-2025.pdf";

  return (
    <div className={styles.viewerContainer}>
      <div className={styles.downloadBar}>
        <a
          href={pdfUrl}
          download="Andre-Wilkinson-Resume.pdf" // This prompts the user to download the file
          className={styles.downloadButton}
        >
          Download PDF
        </a>
      </div>
      <iframe src={pdfUrl} title="My Resume" className={styles.pdfViewer} />
    </div>
  );
};

export default ResumeViewer;
