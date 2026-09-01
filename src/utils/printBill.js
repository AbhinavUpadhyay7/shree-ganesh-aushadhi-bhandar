export function printBill() {
  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    const invoice =
      document.getElementById(
        "printable-invoice"
      );

    if (!invoice) {
      alert("Bill not found.");
      return;
    }

    // Mobile browsers cannot reliably open
    // the native print dialog using window.print().
    // Use the browser's print support if available.
    if (typeof window.print === "function") {
      window.print();
    } else {
      alert(
        "Mobile browser printing is not supported. Please use Save PDF and then Print the PDF."
      );
    }

    return;
  }

  // Desktop / Laptop
  window.print();
}