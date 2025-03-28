import React, { useRef } from "react";
import A4Print from "./A4Print";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const App: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleSendPDF = async () => {
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

      const pdfBlob = pdf.output('blob');

      const formData = new FormData();
      formData.append('invoice', pdfBlob, 'doxios-report.pdf');
      
      formData.append('customerEmail', 'customer@example.com');
      formData.append('invoiceNumber', 'INV-2023-001');

      const response = await fetch('/emailInvoice', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send invoice');
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
      alert('Invoice sent successfully!');
      
    } catch (error) {
      console.error("Error generating or sending PDF:", error);
      alert('Failed to send invoice. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center p-10 bg-gray-100">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <button
        onClick={handleSendPDF}
        className="mt-10 border-2 bg-amber-500 cursor-pointer text-white font-semibold rounded-lg p-4"
      >
        Email Invoice
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
