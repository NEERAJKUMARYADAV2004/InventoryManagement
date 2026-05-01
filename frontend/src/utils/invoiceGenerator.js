export const generateInvoice = (product, user) => {
  const invoiceWindow = window.open('', '_blank');
  const date = new Date().toLocaleDateString();
  const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>STOCKLY - Invoice ${invoiceNumber}</title>
      <style>
        body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 40px; }
        .logo { font-size: 24px; font-weight: 900; color: #2563eb; letter-spacing: -1px; }
        .invoice-details { text-align: right; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 12px; font-weight: 900; text-transform: uppercase; color: #64748b; letter-spacing: 1px; margin-bottom: 10px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th { background: #f8fafc; text-align: left; padding: 15px; font-size: 12px; text-transform: uppercase; color: #64748b; }
        .table td { padding: 15px; border-bottom: 1px solid #f1f5f9; }
        .total-section { margin-top: 40px; text-align: right; border-top: 2px solid #f1f5f9; padding-top: 20px; }
        .total-amount { font-size: 32px; font-weight: 900; color: #1e293b; }
        .footer { margin-top: 60px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px dashed #e2e8f0; padding-top: 20px; }
        .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 150px; color: rgba(0,0,0,0.03); font-weight: 900; z-index: -1; pointer-events: none; }
      </style>
    </head>
    <body>
      <div class="watermark">STOCKLY</div>
      
      <div class="header">
        <div class="logo">STOCKLY</div>
        <div class="invoice-details">
          <div style="font-weight: 900; font-size: 18px;">INVOICE</div>
          <div style="color: #64748b;">${invoiceNumber}</div>
          <div style="color: #64748b;">Date: ${date}</div>
        </div>
      </div>

      <div style="display: flex; gap: 100px;" class="section">
        <div>
          <div class="section-title">Billed To</div>
          <div style="font-weight: 700; font-size: 16px;">${user.name}</div>
          <div style="color: #64748b;">${user.email}</div>
        </div>
        <div>
          <div class="section-title">Issued By</div>
          <div style="font-weight: 700; font-size: 16px;">STOCKLY Inventory</div>
          <div style="color: #64748b;">Premium Management System</div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th style="text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: 700;">${product.title}</td>
            <td>${product.category}</td>
            <td>1</td>
            <td style="text-align: right; font-weight: 700;">$${product.price}</td>
          </tr>
        </tbody>
      </table>

      <div class="total-section">
        <div class="section-title">Grand Total</div>
        <div class="total-amount">$${product.price}</div>
      </div>

      <div class="footer">
        Thank you for choosing STOCKLY. This is a computer-generated invoice.
      </div>

      <script>
        window.onload = () => {
          window.print();
          // Optional: window.close();
        };
      </script>
    </body>
    </html>
  `;

  invoiceWindow.document.write(html);
  invoiceWindow.document.close();
};
