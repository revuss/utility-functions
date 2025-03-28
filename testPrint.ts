import React, { useRef } from "react";
import A4Print from "./A4Print";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const App: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2, 
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 5; 

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save("doxios-report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center p-10 bg-gray-100">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <button
        onClick={handleDownloadPDF}
        className="mt-10 border-2 bg-amber-500 cursor-pointer text-white font-semibold rounded-lg p-4"
      >
        Download PDF
      </button>

      <div className="fixed top-[-1000px] left-[-1000px]">
        <div ref={printRef}>
          <A4Print />
        </div>
      </div>
    </div>
  );
};

export default App;
