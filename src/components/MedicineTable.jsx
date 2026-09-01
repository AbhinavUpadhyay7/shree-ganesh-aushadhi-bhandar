import medicines from "../data/medicines";

import {
  calculateMedicine
} from "../utils/calculations";

function formatExpiry(value) {
  // Sirf numbers rakho
  let digits = String(value || "")
    .replace(/\D/g, "")
    .slice(0, 4);

  // 12 -> 12/
  if (digits.length <= 2) {
    return digits;
  }

  // 1226 -> 12/26
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function MedicineTable({
  medicineRows,
  setMedicineRows
}) {

  function updateMedicine(
    id,
    field,
    value
  ) {
    setMedicineRows((previous) =>
      previous.map((medicine) =>
        medicine.id === id
          ? {
              ...medicine,
              [field]: value
            }
          : medicine
      )
    );
  }

  function addMedicine() {
    setMedicineRows((previous) => [
      ...previous,
      {
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
      }
    ]);
  }

  function removeMedicine(id) {

    if (medicineRows.length === 1) {
      return;
    }

    setMedicineRows((previous) =>
      previous.filter(
        (medicine) =>
          medicine.id !== id
      )
    );
  }

  return (
    <section className="medicine-section">

      <div className="section-heading">

        <div className="section-icon medicine-section-icon">
          💊
        </div>

        <div>

          <h3>
            Medicine Details
          </h3>

          <p>
            Add medicine, batch, expiry and pricing
          </p>

        </div>

      </div>

      <div className="medicine-table-wrapper">

        <table className="medicine-table">

          <thead>

            <tr>

              <th>No.</th>

              <th>Particulars</th>

              <th>Company</th>

              <th>Batch No.</th>

              <th>Ex. Date</th>

              <th>Qty</th>

              <th>Rate</th>

              <th>Disc.</th>

              <th>GST</th>

              <th>Amount</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {medicineRows.map(
              (medicine, index) => {

                const result =
                  calculateMedicine(
                    medicine
                  );

                return (
                  <tr
                    key={medicine.id}
                  >

                    <td className="row-no">
                      {index + 1}
                    </td>

                    {/* MEDICINE */}

                    <td>

                      <input
                        className="medicine-name-input"
                        list={`medicine-list-${medicine.id}`}
                        value={
                          medicine.name
                        }
                        onChange={(e) =>
                          updateMedicine(
                            medicine.id,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Type medicine name"
                        autoComplete="off"
                      />

                      <datalist
                        id={`medicine-list-${medicine.id}`}
                      >

                        {medicines.map(
                          (name) => (
                            <option
                              key={name}
                              value={name}
                            />
                          )
                        )}

                      </datalist>

                    </td>

                    {/* COMPANY */}

                    <td>

                      <input
                        value={
                          medicine.company
                        }
                        onChange={(e) =>
                          updateMedicine(
                            medicine.id,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="Company"
                      />

                    </td>

                    {/* BATCH */}

                    <td>

                      <input
                        value={
                          medicine.batch
                        }
                        onChange={(e) =>
                          updateMedicine(
                            medicine.id,
                            "batch",
                            e.target.value
                          )
                        }
                        placeholder="Batch"
                      />

                    </td>

                    {/* EXPIRY */}

                    <td>

                      <input
                        className="expiry-input"
                        type="text"
                        inputMode="numeric"
                        maxLength={5}
                        value={
                          medicine.expiry
                        }
                        onChange={(e) => {

                          const formatted =
                            formatExpiry(
                              e.target.value
                            );

                          updateMedicine(
                            medicine.id,
                            "expiry",
                            formatted
                          );

                        }}
                        placeholder="MM/YY"
                        aria-label="Expiry date"
                      />

                    </td>

                    {/* QTY */}

                    <td>

                      <input
                        type="number"
                        min="0"
                        value={
                          medicine.qty
                        }
                        onChange={(e) =>
                          updateMedicine(
                            medicine.id,
                            "qty",
                            e.target.value
                          )
                        }
                      />

                    </td>

                    {/* RATE */}

                    <td>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={
                          medicine.rate
                        }
                        onChange={(e) =>
                          updateMedicine(
                            medicine.id,
                            "rate",
                            e.target.value
                          )
                        }
                        placeholder="0.00"
                      />

                    </td>

                    {/* DISCOUNT */}

                    <td>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={
                          medicine.discount
                        }
                        onChange={(e) =>
                          updateMedicine(
                            medicine.id,
                            "discount",
                            e.target.value
                          )
                        }
                      />

                    </td>

                    {/* GST */}

                    <td>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={
                          medicine.gst
                        }
                        onChange={(e) =>
                          updateMedicine(
                            medicine.id,
                            "gst",
                            e.target.value
                          )
                        }
                      />

                    </td>

                    {/* AMOUNT */}

                    <td className="amount-cell">

                      ₹
                      {result.amount.toFixed(
                        2
                      )}

                    </td>

                    {/* DELETE */}

                    <td>

                      <button
                        type="button"
                        className="delete-row"
                        onClick={() =>
                          removeMedicine(
                            medicine.id
                          )
                        }
                        title="Remove medicine"
                      >
                        ×
                      </button>

                    </td>

                  </tr>
                );
              }
            )}

          </tbody>

        </table>

      </div>

      <button
        type="button"
        className="add-medicine"
        onClick={addMedicine}
      >
        ＋ Add Medicine
      </button>

    </section>
  );
}

export default MedicineTable;