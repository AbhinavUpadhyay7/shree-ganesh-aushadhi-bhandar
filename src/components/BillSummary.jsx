function BillSummary({ totals }) {
  return (
    <div className="summary-wrapper">

      <div className="summary-box">

        <div className="summary-line">

          <span>
            Subtotal
          </span>

          <strong>
            ₹
            {totals.subtotal.toFixed(
              2
            )}
          </strong>

        </div>

        <div className="summary-line">

          <span>
            Total Discount
          </span>

          <strong>
            ₹
            {totals.discount.toFixed(
              2
            )}
          </strong>

        </div>

        <div className="summary-line">

          <span>
            Total GST
          </span>

          <strong>
            ₹
            {totals.gst.toFixed(
              2
            )}
          </strong>

        </div>

        <div className="summary-grand">

          <span>
            GRAND TOTAL
          </span>

          <strong>
            ₹
            {totals.total.toFixed(
              2
            )}
          </strong>

        </div>

      </div>

    </div>
  );
}

export default BillSummary;