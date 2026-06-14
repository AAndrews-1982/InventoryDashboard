// src/utils/generatePdf.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Item = {
  name: string;
  stock: number;
  required: number;
  order: number;
  note?: string;
};

export function generateInventoryPdf(
  items: Item[],
  role: 'teamlead',
  timestamp: string,
  teamLeadName: string
) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.setTextColor(200, 0, 0);
  doc.text('Ruth’s Chicken Inventory Report', 105, 20, {
    align: 'center',
  });

  // Meta Info
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text('View: Team Lead', 14, 30);
  doc.text(`Submitted By: ${teamLeadName}`, 14, 36);
  doc.text(`Timestamp: ${timestamp}`, 14, 42);

  // Confirmation
  doc.setFontSize(12);
  doc.setTextColor(0, 102, 0);
  doc.text(
    'Team Lead Confirmation: All items reviewed and approved.',
    14,
    50
  );

  const formatNotes = (raw: string) => {
    const parts = raw.split(' | ').map(note => note.trim());
    const staffNote = parts.find(n => n.startsWith('Staff:'));
    const teamLeadNote = parts.find(n => n.startsWith('Team Lead:'));

    return [
      staffNote ? `Staff Notes:\n${staffNote.replace('Staff: ', '')}` : '',
      teamLeadNote
        ? `Team Lead Note:\n${teamLeadNote.replace('Team Lead: ', '')}`
        : '',
    ]
      .filter(Boolean)
      .join('\n\n');
  };

  const tableData = items.map(item => [
    item.name,
    item.stock.toString(),
    item.required.toString(),
    item.order.toString(),
    formatNotes(item.note || ''),
  ]);

  autoTable(doc, {
    startY: 56,
    head: [['Item', 'Stock', 'Required', 'Order', 'Notes']],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'top',
    },
    headStyles: {
      fillColor: [204, 0, 0],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      4: { cellWidth: 80 },
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