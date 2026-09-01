import html2pdf from "html2pdf.js";

export async function generateBillPDF() {
  const element = document.getElementById("printable-invoice");

  if (!element) {
    alert("Invoice not found. Please try again.");
    return;
  }

  try {
    // Wait for browser to finish rendering
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });

    const billNumberElement =
      element.querySelector(".meta-number");

    const billNumber =
      billNumberElement?.textContent?.trim() || "Bill";

    const options = {
      margin: [8, 8, 8, 8],

      filename:
        `Shree-Ganesh-Aushadhi-Bhandar-Bill-${billNumber}.pdf`,

      image: {
        type: "jpeg",
        quality: 0.98
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",

        logging: false,

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
      "PDF generation error:",
      error
    );

    alert(
      "Unable to save PDF Please try again."
    );
  }
}