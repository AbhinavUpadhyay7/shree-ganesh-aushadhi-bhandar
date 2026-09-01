const BILL_NUMBER_KEY =
  "shree_ganesh_next_bill_number";

export function getNextBillNumber() {
  const stored =
    localStorage.getItem(
      BILL_NUMBER_KEY
    );

  const number =
    stored !== null
      ? Number(stored)
      : 1;

  return String(number).padStart(3, "0");
}

export function saveBillNumber(
  currentBillNumber
) {
  const current =
    Number(currentBillNumber);

  localStorage.setItem(
    BILL_NUMBER_KEY,
    String(current + 1)
  );
}