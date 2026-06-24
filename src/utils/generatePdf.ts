// src/utils/generatePdf.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Item = {
  name: string;
  stock: number;
  required: number;
  location: string;
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

  doc.setFillColor(204, 0, 0);
  doc.rect(0, 0, pageWidth, 6, 'F');

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
    return raw.replace('Team Lead: ', '').trim();
  };

  const formatStock = (stock: number) => {
    const whole = Math.floor(stock);
    const decimal = Number((stock - whole).toFixed(2));

    if (decimal === 0) return `${whole}`;

    if (whole === 0) {
      if (decimal === 0.25) return '1/4';
      if (decimal === 0.5) return '1/2';
      if (decimal === 0.75) return '3/4';
    }

    if (decimal === 0.25) return `${whole} 1/4`;
    if (decimal === 0.5) return `${whole} 1/2`;
    if (decimal === 0.75) return `${whole} 3/4`;

    return `${stock}`;
  };

  const getOrderAmount = (item: Item) => {
    return Math.max(0, item.required - item.stock);
  };

  const locations = [
    'Refrigerator',
    'Freezer',
    'Dry Storage',
    'Disposables',
    'Soda',
  ];

  let currentY = 92;

  locations.forEach(location => {
    const sectionItems = items.filter(
      item => item.location === location
    );

    if (sectionItems.length === 0) return;

    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(13);
    doc.setTextColor(31, 41, 55);
    doc.text(location, 14, currentY);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Item', 'Stock', 'Required', 'Order', 'Notes']],
      body: sectionItems.map(item => {
        const orderAmount = getOrderAmount(item);

        return [
          item.name,
          formatStock(item.stock),
          formatStock(item.required),
          orderAmount > 0 ? formatStock(orderAmount) : '—',
          formatNotes(item.note || ''),
        ];
      }),
      theme: 'grid',
      margin: {
        left: 14,
        right: 14,
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        valign: 'top',
        textColor: [51, 65, 85],
        lineColor: [226, 232, 240],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [75, 85, 99],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      columnStyles: {
        0: { cellWidth: 62 },
        1: { cellWidth: 24, halign: 'center' },
        2: { cellWidth: 26, halign: 'center' },
        3: { cellWidth: 24, halign: 'center' },
        4: { cellWidth: 44 },
      },
      didParseCell: data => {
        if (data.section !== 'body') return;

        const item = sectionItems[data.row.index];
        const orderAmount = getOrderAmount(item);

        if (orderAmount > 0) {
          data.cell.styles.fillColor = [254, 226, 226];
          data.cell.styles.textColor = [127, 29, 29];

          if (data.column.index === 3) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [254, 202, 202];
          }
        }
      },
    });

    currentY = (doc as any).lastAutoTable.finalY + 12;
  });

  const arrayBuffer = doc.output('arraybuffer');
  const uint8Array = new Uint8Array(arrayBuffer);

  let binary = '';

  uint8Array.forEach(byte => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}