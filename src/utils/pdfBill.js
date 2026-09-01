import html2pdf from "html2pdf.js";

export async function generateBillPDF() {
  const element = document.getElementById("printable-invoice");

  if (!element) {
    alert("Invoice not found. Please try again.");
    return;
  }

  try {
    const billNumber =
      document.querySelector(".bill-number")?.textContent?.trim() ||
      "bill";

    const options = {
      margin: [8, 8, 8, 8],

      filename: `Shree-Ganesh-Bill-${billNumber}.pdf`,

      image: {
        type: "jpeg",
        quality: 0.98
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",

        scrollX: 0,
        scrollY: 0,

        windowWidth: element.scrollWidth
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },

      pagebreak: {
        mode: ["css", "legacy"]
      }
    };

    await html2pdf()
      .set(options)
      .from(element)
      .save();

  } catch (error) {

    console.error(
      "PDF generation failed:",
      error
    );

    alert(
      "PDF save nahi ho pa raha. Please try again."
    );
  }
}