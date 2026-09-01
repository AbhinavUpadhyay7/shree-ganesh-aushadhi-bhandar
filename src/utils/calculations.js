export function calculateMedicine(medicine) {
  const qty = Number(medicine.qty) || 0;
  const rate = Number(medicine.rate) || 0;
  const discount = Number(medicine.discount) || 0;
  const gst = Number(medicine.gst) || 0;

  const subtotal = qty * rate;

  const discountAmount = Math.min(
    discount,
    subtotal
  );

  const taxableAmount = Math.max(
    subtotal - discountAmount,
    0
  );

  const gstAmount =
    taxableAmount * (gst / 100);

  const amount =
    taxableAmount + gstAmount;

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    gstAmount,
    amount
  };
}

export function calculateBillTotal(medicines) {
  let subtotal = 0;
  let discount = 0;
  let gst = 0;
  let total = 0;

  const calculatedMedicines =
    medicines.map((medicine) => {
      const result =
        calculateMedicine(medicine);

      subtotal += result.subtotal;
      discount += result.discountAmount;
      gst += result.gstAmount;
      total += result.amount;

      return {
        ...medicine,
        amount: result.amount,
        discountAmount:
          result.discountAmount,
        gstAmount:
          result.gstAmount,
        calculated: result
      };
    });

  return {
    subtotal,
    discount,
    gst,
    total,
    medicines: calculatedMedicines
  };
}