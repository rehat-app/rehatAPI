const PDFDocument = require('pdfkit');
var fs = require('fs');

function buildPDF(dataCallback, endCallback, data) {
  let doc = new PDFDocument({ margin: 50, bufferPages: true });
  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  generateHeader(doc, data.day, data.date, data.time);
  // generateCustomerInformation(doc, invoice);
  // generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  // doc.pipe(fs.createWriteStream('/'));
}

// Layouting pdf
function generateHeader(doc, day, date, time) {
  doc
    .image('logo.jpg', 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('REHAT Inc.', 110, 57)
    .fontSize(10)
    .text(`Diambil pada: ${day}, ${date} | ${time}`, 200, 65, {
      align: 'right',
    })
    .fontSize(8)
    .text('Essential Attendance Sheet', 200, 80, {
      align: 'right',
    })
    .moveDown();
}
function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      'Top Bangkit Product Based, 2022, Community Empowerment, Thank you.',
      50,
      780,
      { align: 'center', width: 500 }
    );
}

module.exports = { buildPDF };
