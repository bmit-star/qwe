import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPDF(elementId: string, fileName: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  const canvas = await html2canvas(element, {
    backgroundColor: '#0f0c29',
    scale: 2,
    useCORS: true,
    logging: false,
    windowWidth: element.scrollWidth,
  });

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const imgScaledWidth = imgWidth * ratio;
  const imgScaledHeight = imgHeight * ratio;

  if (imgScaledHeight > pdfHeight) {
    const pageHeight = pdfHeight;
    let position = 0;
    let page = 0;
    while (position < imgScaledHeight) {
      if (page > 0) pdf.addPage();
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = imgWidth;
      sliceCanvas.height = Math.min(imgHeight, Math.ceil((pageHeight / ratio) * (imgWidth / pdfWidth)));
      const ctx = sliceCanvas.getContext('2d');
      if (ctx) {
        const sourceY = Math.floor(position / ratio * (imgWidth / pdfWidth));
        ctx.drawImage(canvas, 0, sourceY, imgWidth, sliceCanvas.height, 0, 0, imgWidth, sliceCanvas.height);
        pdf.addImage(sliceCanvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pdfWidth, pageHeight);
      }
      position += pageHeight;
      page++;
    }
  } else {
    pdf.addImage(imgData, 'JPEG', (pdfWidth - imgScaledWidth) / 2, 0, imgScaledWidth, imgScaledHeight);
  }

  pdf.save(`${fileName}.pdf`);
}
