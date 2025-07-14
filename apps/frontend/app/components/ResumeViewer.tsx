'use client';

import React from 'react';
import { jsPDF } from 'jspdf';

type ResumeViewerProps = {
  resumeId: string; // 👈 Accept resumeId as a prop (even if not used yet)
};

const ResumeViewer: React.FC<ResumeViewerProps> = ({ resumeId }) => {
  const handleDownload = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: [0.7, 0.5, 1.2, 0.5],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    const logoUrl = '/ekip-logo.png';
    const logoBlob = await fetch(logoUrl).then((res) => res.blob());
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Logo = reader.result;

      html2pdf()
        .set(opt)
        .from(element)
        .toPdf()
        .get('pdf')
        .then((rawPdf: any) => {
          const pdf = rawPdf as jsPDF;
          const totalPages = (pdf as any).internal.getNumberOfPages();
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const leftMargin = 0.7;
          const rightMargin = 0.7;

          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.addImage(base64Logo as string, 'PNG', pageWidth - 1.6, 0.25, 1.4, 1.4);
            pdf.setDrawColor(200);
            pdf.setLineWidth(0.03);
            pdf.line(leftMargin,pageHeight - 0.75,pageWidth - rightMargin,pageHeight - 0.75);
            pdf.setFontSize(10);
            pdf.setTextColor(80);
            pdf.text('EKIP IT Solutions', 0.7, pageHeight - 0.5);
            pdf.text('www.ekipit.com', pageWidth / 2, pageHeight - 0.5, { align: 'center' });
            pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 0.5, pageHeight - 0.5, { align: 'right' });
          }

          pdf.save('resume.pdf');
        });
    };

    reader.readAsDataURL(logoBlob);
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        display: 'block',
        margin: '1rem auto',
        padding: '0.6rem 1.2rem',
        backgroundColor: '#0077b6',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      Download PDF
    </button>
  );
};

export default ResumeViewer;