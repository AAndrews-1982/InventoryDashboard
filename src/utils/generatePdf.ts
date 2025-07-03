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
  role: 'staff' | 'manager',
  timestamp: string
) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.setTextColor(200, 0, 0);
  doc.text('Inventory Report', 105, 20, { align: 'center' });

  // Meta Info
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text(`View: ${role === 'manager' ? 'Manager' : 'Team Member'}`, 14, 30);
  doc.text(`Timestamp: ${timestamp}`, 14, 36);

  if (role === 'manager') {
    doc.setFontSize(12);
    doc.setTextColor(0, 102, 0);
    doc.text('✔ Manager’s Confirmation: All items reviewed and approved.', 14, 44);
  }

  // Table body formatting for notes
  const formatNotes = (raw: string) => {
    const parts = raw.split(' | ').map(note => note.trim());
    const staffNote = parts.find(n => n.startsWith('Staff:'));
    const managerNote = parts.find(n => n.startsWith('Manager:'));

    return [
      staffNote ? `Staff Notes:\n${staffNote.replace('Staff: ', '')}` : '',
      managerNote ? `Manager Note:\n${managerNote.replace('Manager: ', '')}` : '',
    ].filter(Boolean).join('\n\n');
  };

  // Table Data
  const tableData = items.map(item => [
    item.name,
    item.stock.toString(),
    item.required.toString(),
    item.order.toString(),
    formatNotes(item.note || ''),
  ]);

  autoTable(doc, {
    startY: role === 'manager' ? 50 : 42,
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

  const fileName = `InventoryReport-${timestamp.replace(/[/:]/g, '-')}.pdf`;
  doc.save(fileName);
}
