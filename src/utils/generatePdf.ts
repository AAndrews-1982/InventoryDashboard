// src/utils/generatePdf.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Item = {
  name: string;
  stock: number;
  note?: string;
};

export function generateInventoryPdf(
  items: Item[],
  role: 'teamlead',
  timestamp: string,
  teamLeadName: string
) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // Top accent bar
  doc.setFillColor(204, 0, 0);
  doc.rect(0, 0, pageWidth, 6, 'F');

  // Header
  doc.setFontSize(20);
  doc.setTextColor(30, 41, 59);
  doc.text('Ruth’s Chicken Inventory Report', pageWidth / 2, 20, {
    align: 'center',
  });

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('Team Lead Inventory Submission', pageWidth / 2, 27, {
    align: 'center',
  });

  // Info card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 34, pageWidth - 28, 28, 3, 3, 'FD');

  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text('Submitted By', 20, 44);
  doc.text('Timestamp', 20, 55);

  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(teamLeadName, 55, 44);
  doc.text(timestamp, 55, 55);

  // Confirmation
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(14, 68, pageWidth - 28, 12, 3, 3, 'FD');

  doc.setFontSize(10);
  doc.setTextColor(22, 101, 52);
  doc.text(
    'Team Lead Confirmation: All items reviewed and approved.',
    20,
    76
  );

  const formatNotes = (raw: string) => {
    const cleaned = raw.replace('Team Lead: ', '').trim();

    return cleaned || '';
  };

  const tableData = items.map(item => [
    item.name,
    item.stock.toString(),
    formatNotes(item.note || ''),
  ]);

  autoTable(doc, {
    startY: 88,
    head: [['Item', 'Stock', 'Notes']],
    body: tableData,
    theme: 'plain',
    styles: {
      fontSize: 10,
      cellPadding: 4,
      valign: 'middle',
      textColor: [51, 65, 85],
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [248, 250, 252],
      textColor: [71, 85, 105],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'left',
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },
    columnStyles: {
      0: {
        cellWidth: 80,
        fontStyle: 'bold',
        textColor: [15, 23, 42],
      },
      1: {
        cellWidth: 25,
        halign: 'center',
        fontStyle: 'bold',
      },
      2: {
        cellWidth: 75,
      },
    },
    margin: {
      left: 14,
      right: 14,
    },
  });

  const arrayBuffer = doc.output('arraybuffer');
  const uint8Array = new Uint8Array(arrayBuffer);

  let binary = '';

  uint8Array.forEach(byte => {
    binary += String.fromCharCode(byte);
  });

  const pdfBase64 = btoa(binary);

  return pdfBase64;
}