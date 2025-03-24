interface InvoiceDetails {
  [key: string]: string;
}

const getTotalAmountAndAddToInvoice = (invoiceDetails: InvoiceDetails): InvoiceDetails => {
  // Define the terms we want to check for
  const amountTerms = ['billAmount', 'transactionAmount', 'txnAmount', 'amount']; // Add any other terms you want to check

  // Initialize a variable to hold the found total amount
  let totalAmount: string | null = null;

  // Check for each of the amount terms in the invoiceDetails object
  for (let key in invoiceDetails) {
    if (amountTerms.some(term => new RegExp(term, 'i').test(key))) {
      totalAmount = invoiceDetails[key];  // Assign the first found amount value
      break; // Stop once we find the first matching amount
    }
  }

  // If an amount was found, add it to the invoice details as 'total'
  if (totalAmount) {
    invoiceDetails['total'] = totalAmount;
  }

  // Return the updated invoice details
  return invoiceDetails;
};

// Example usage:
const data = {
  "1-correlationId": "2CZqc-160408360",
  "invoiceCreatedAt": "14 MAR 2025 02:41 PM",
  "6-transactionAmount": "100.0",
  "4-requestTransactionTime": "10/03/2025 16:04:08",
  "5-transactionStatus": "successful",
  "invoiceId": "TL-20250314-1009",
  "serviceName": "AEPS Cash Withdrawal",
  "3-transactionType": "CW",
  "2-intTranId": "CWBT6979837100325160408661I",
  "7-billAmount": "150.0"
};

const updatedData = getTotalAmountAndAddToInvoice(data);
console.log(updatedData);

// Expected output: 
// {
//   "1-correlationId": "2CZqc-160408360",
//   "invoiceCreatedAt": "14 MAR 2025 02:41 PM",
//   "6-transactionAmount": "100.0",
//   "4-requestTransactionTime": "10/03/2025 16:04:08",
//   "5-transactionStatus": "successful",
//   "invoiceId": "TL-20250314-1009",
//   "serviceName": "AEPS Cash Withdrawal",
//   "3-transactionType": "CW",
//   "2-intTranId": "CWBT6979837100325160408661I",
//   "7-billAmount": "150.0",
//   "total": "150.0" // Added the total key
// }
