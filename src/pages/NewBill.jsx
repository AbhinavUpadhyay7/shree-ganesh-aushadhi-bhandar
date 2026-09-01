import { useState } from "react";

import BillHeader from "../components/BillHeader";
import CustomerDetails from "../components/CustomerDetails";
import MedicineTable from "../components/MedicineTable";
import BillSummary from "../components/BillSummary";

import {
  calculateBillTotal
} from "../utils/calculations";

import {
  getNextBillNumber,
  saveBillNumber
} from "../utils/billNumber";

import {
  printBill
} from "../utils/printBill";

import {
  generateBillPDF
} from "../utils/pdfBill";

function createMedicine() {
  return {
    id:
      Date.now() +
      Math.random(),

    name: "",
    company: "",
    batch: "",
    expiry: "",
    qty: 1,
    rate: "",
    discount: 0,
    gst: 0
  };
}

function NewBill() {

  const [
    billNumber,
    setBillNumber
  ] = useState(
    getNextBillNumber()
  );

  const [
    customer,
    setCustomer
  ] = useState({
    name: "",
    mobile: "",
    email: "",
    doctor: ""
  });

  const [
    showHindiName,
    setShowHindiName
  ] = useState(true);

  const [
    shopHindiName,
    setShopHindiName
  ] = useState(
    "श्री गणेश औषधि भंडार"
  );

  const [
    medicineRows,
    setMedicineRows
  ] = useState([
    createMedicine()
  ]);

  const [
    savedBill,
    setSavedBill
  ] = useState(null);

  const totals =
    calculateBillTotal(
      medicineRows
    );

  function createBillObject() {

    const validMedicines =
      medicineRows.filter(
        (medicine) =>
          medicine.name.trim()
      );

    if (
      validMedicines.length === 0
    ) {

      alert(
        "Please add at least one medicine."
      );

      return null;
    }

    const medicines =
      validMedicines.map(
        (medicine) => ({
          ...medicine,

          qty:
            Number(
              medicine.qty
            ) || 0,

          rate:
            Number(
              medicine.rate
            ) || 0,

          discount:
            Number(
              medicine.discount
            ) || 0,

          gst:
            Number(
              medicine.gst
            ) || 0
        })
      );

    const calculated =
      calculateBillTotal(
        medicines
      );

    return {

      billNumber,

      date:
        new Date().toISOString(),

      shop: {

        englishName:
          "Shree Ganesh Aushadhi Bhandar",

        hindiName:
          showHindiName
            ? shopHindiName
            : "",

        mobile:
          "9004793858 / 9421549144",

        address:
          "Your Shop Address"

      },

      customer: {
        ...customer
      },

      medicines:
        calculated.medicines,

      totals: {

        subtotal:
          calculated.subtotal,

        discount:
          calculated.discount,

        gst:
          calculated.gst,

        total:
          calculated.total

      }

    };
  }

  function generateBill() {

    if (savedBill) {
      return;
    }

    const bill =
      createBillObject();

    if (!bill) {
      return;
    }

    localStorage.setItem(
      `shree_ganesh_bill_${bill.billNumber}`,
      JSON.stringify(bill)
    );

    saveBillNumber(
      bill.billNumber
    );

    setSavedBill(
      bill
    );
  }

  function newBill() {

    setBillNumber(
      getNextBillNumber()
    );

    setCustomer({
      name: "",
      mobile: "",
      email: "",
      doctor: ""
    });

    setMedicineRows([
      createMedicine()
    ]);

    setSavedBill(
      null
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function handlePrint() {

    if (!savedBill) {

      alert(
        "Please Generate & Save the bill first."
      );

      return;
    }

    printBill();
  }

  function handlePDF() {

    if (!savedBill) {

      alert(
        "Please Generate & Save the bill first."
      );

      return;
    }

    generateBillPDF();
  }

  function buildWhatsAppMessage(
    bill
  ) {

    const medicineText =
      bill.medicines
        .map(
          (medicine, index) => {

            const amount =
              Number(
                medicine.amount
              ) || 0;

            const discount =
              Number(
                medicine.discountAmount
              ) || 0;

            return `
*${index + 1}. ${medicine.name}*

Company: ${
              medicine.company || "-"
            }
Batch No.: ${
              medicine.batch || "-"
            }
Expiry: ${
              medicine.expiry || "-"
            }
Qty: ${medicine.qty}
Rate: ₹${Number(
              medicine.rate
            ).toFixed(2)}
Discount: ₹${discount.toFixed(2)}
GST: ${medicine.gst}%
Amount: ₹${amount.toFixed(2)}
`;

          }
        )
        .join("\n");

    return `
*SHREE GANESH AUSHADHI BHANDAR*
*${bill.shop.hindiName || "श्री गणेश औषधि भंडार"}*

━━━━━━━━━━━━━━━━━━

*BILL NO.:* ${bill.billNumber}

*DATE:* ${new Date(
      bill.date
    ).toLocaleDateString("en-IN")}

*CUSTOMER:* ${
      bill.customer.name || "-"
    }

*MOBILE:* ${
      bill.customer.mobile || "-"
    }

*EMAIL:* ${
      bill.customer.email || "-"
    }

*PRESCRIBED BY:* ${
      bill.customer.doctor || "-"
    }

━━━━━━━━━━━━━━━━━━

*MEDICINE DETAILS*

${medicineText}

━━━━━━━━━━━━━━━━━━

*SUBTOTAL:* ₹${bill.totals.subtotal.toFixed(
      2
    )}

*TOTAL DISCOUNT:* ₹${bill.totals.discount.toFixed(
      2
    )}

*TOTAL GST:* ₹${bill.totals.gst.toFixed(
      2
    )}

*GRAND TOTAL:* ₹${bill.totals.total.toFixed(
      2
    )}

━━━━━━━━━━━━━━━━━━

बिक्री हुआ दवाई वापस नहीं होगी।

Thank you for visiting us.

*Shree Ganesh Aushadhi Bhandar*
*9004793858 / 9421549144*
`.trim();
  }

  function handleWhatsApp() {

    if (!savedBill) {

      alert(
        "Please Generate & Save the bill first."
      );

      return;
    }

    const mobile =
      String(
        savedBill.customer.mobile ||
          ""
      ).replace(
        /\D/g,
        ""
      );

    if (!mobile) {

      alert(
        "Please enter customer's WhatsApp/mobile number."
      );

      return;
    }

    const whatsappNumber =
      mobile.length === 10
        ? `91${mobile}`
        : mobile;

    const message =
      buildWhatsAppMessage(
        savedBill
      );

    const url =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="app">

      <header className="topbar">

        <div className="topbar-brand">

          <div className="top-logo">
            ✚
          </div>

          <div>

            <div className="top-shop-name">
              Shree Ganesh Aushadhi Bhandar
            </div>

            <div className="top-caption">
              Billing & Invoice System
            </div>

          </div>

        </div>

        <div className="system-status">

          <span></span>

          System Ready

        </div>

      </header>

      <main className="main-container">

        <div
          id="printable-invoice"
          className="billing-card"
        >

          <BillHeader
            billNumber={billNumber}
            shopHindiName={
              shopHindiName
            }
            setShopHindiName={
              setShopHindiName
            }
            showHindiName={
              showHindiName
            }
            setShowHindiName={
              setShowHindiName
            }
          />

          <div className="bill-divider"></div>

          <CustomerDetails
            customer={customer}
            setCustomer={
              setCustomer
            }
          />

          <MedicineTable
            medicineRows={
              medicineRows
            }
            setMedicineRows={
              setMedicineRows
            }
          />

          <BillSummary
            totals={totals}
          />

          <div className="invoice-bottom">

            <div className="return-policy">

              <strong>
                बिक्री हुआ दवाई वापस नहीं होगी।
              </strong>

              <span>
                Please check medicines before leaving the store.
              </span>

            </div>

            <div className="signature">

              <small>
                PROPRIETOR
              </small>

              <strong>
                Shree Ganesh Aushadhi Bhandar
              </strong>

              <span>
                Authorized Signature
              </span>

            </div>

          </div>

        </div>

        <div className="action-panel">

          <button
            type="button"
            className="action-btn whatsapp-btn"
            onClick={
              handleWhatsApp
            }
            disabled={
              !savedBill
            }
          >
            💬 WhatsApp
          </button>

          <button
            type="button"
            className="action-btn print-btn"
            onClick={
              handlePrint
            }
            disabled={
              !savedBill
            }
          >
            🖨️ Print Bill
          </button>

          <button
            type="button"
            className="action-btn pdf-btn"
            onClick={
              handlePDF
            }
            disabled={
              !savedBill
            }
          >
            📄 Save PDF
          </button>

          <button
            type="button"
            className="action-btn save-btn"
            onClick={
              generateBill
            }
            disabled={
              !!savedBill
            }
          >

            {savedBill
              ? `✓ Bill ${savedBill.billNumber} Saved`
              : "💾 Generate & Save Bill"}

          </button>

        </div>

        {savedBill && (

          <div className="success-panel">

            <div className="success-icon">
              ✓
            </div>

            <div className="success-message">

              <strong>
                Bill {savedBill.billNumber} saved successfully
              </strong>

              <span>
                Bill is ready to print, save as PDF or share on WhatsApp.
              </span>

            </div>

            <button
              type="button"
              onClick={newBill}
            >
              + New Bill
            </button>

          </div>

        )}

        <div className="page-footer">

          Shree Ganesh Aushadhi Bhandar

          <span>•</span>

          Professional Billing System

        </div>

      </main>

    </div>
  );
}

export default NewBill;