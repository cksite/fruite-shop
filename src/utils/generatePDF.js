
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (billData, customer) => {
  try {
    const doc = new jsPDF();

    // Define styles
    const titleFontSize = 16;
    const subtitleFontSize = 14;
    const bodyFontSize = 12;
    const smallFontSize = 10;
    const margin = 14;

    // Add shop name and address
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(titleFontSize);
    const shopName = 'Maa Veshnavi Fruit Merchant';
    const shopAddress = 'Chatra Road Dobhi, Gaya';
    const pageWidth = doc.internal.pageSize.width;
    const shopNameWidth = doc.getTextWidth(shopName);
    const shopAddressWidth = doc.getTextWidth(shopAddress);

    doc.text(shopName, (pageWidth - shopNameWidth) / 2, 16);
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'normal');
    doc.text(shopAddress, (pageWidth - shopAddressWidth) / 2, 22);

    // Add a line below the shop details
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margin, 26, pageWidth - margin, 26);

    // Add date and time
    doc.setFontSize(smallFontSize);
    doc.text(`Date: ${new Date().toLocaleString()}`, margin, 34);

    // Add customer details
    doc.setFontSize(bodyFontSize);
    doc.text(`Customer Name: ${customer.name}`, margin, 44);
    doc.text(`Customer Address: ${customer.address}`, margin, 50);

    // Add a line before the table
    doc.line(margin, 54, pageWidth - margin, 54);

    // Define table columns
    const tableColumn = ["Fruit", "Quantity", "Unit Price", "Total Price"];
    
    // Generate table rows
    const tableRows = billData.map(item => [
      item.name,
      item.quantity,
      `Rs ${item.price.toFixed(2)}`,
      `Rs ${(item.quantity * item.price).toFixed(2)}`
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 56,
      margin: { horizontal: margin },
      theme: 'striped',
      headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
      styles: { fontSize: smallFontSize, cellPadding: 4, valign: 'middle' },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 30 }, 2: { cellWidth: 30 }, 3: { cellWidth: 40 } }
    });

    // Calculate and add total price
    const total = billData.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    doc.setFontSize(bodyFontSize);
    doc.text(`Total Price: Rs ${total.toFixed(2)}`, margin, doc.autoTable.previous.finalY + 10);

    // Add contact information and owner details
    const contactInfo = 'Contact: 1234567890';
    const ownerName = 'Owner: your name';
    doc.setFontSize(smallFontSize);
    doc.setFont('helvetica', 'normal');
    
    // Add contact info on the left side
    doc.text(contactInfo, margin, doc.autoTable.previous.finalY + 20);
    // Add owner info on the left side, aligned with contact info
    doc.text(ownerName, margin, doc.autoTable.previous.finalY + 26);

    // Add thank you note centered at the bottom
    doc.setFontSize(smallFontSize);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for visiting!', (pageWidth / 2), doc.internal.pageSize.height - 20, { align: 'center' });

    // Save the PDF
    doc.save(`${customer.name}_${total.toFixed(2)}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export default generatePDF;
