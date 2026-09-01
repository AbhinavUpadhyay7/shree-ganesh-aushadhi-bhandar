function CustomerDetails({
  customer,
  setCustomer
}) {
  function update(field, value) {
    setCustomer((previous) => ({
      ...previous,
      [field]: value
    }));
  }

  return (
    <section className="customer-section">

      <div className="section-heading">

        <div className="section-icon">
          👤
        </div>

        <div>
          <h3>
            Customer Details
          </h3>

          <p>
            Customer and prescription information
          </p>
        </div>

      </div>

      <div className="customer-card">

        <div className="customer-field">

          <label>
            SOLD TO
          </label>

          <input
            value={customer.name}
            onChange={(e) =>
              update(
                "name",
                e.target.value
              )
            }
            placeholder="Customer name"
          />

        </div>

        <div className="customer-field">

          <label>
            MOBILE / WHATSAPP
          </label>

          <input
            type="tel"
            inputMode="numeric"
            value={customer.mobile}
            onChange={(e) =>
              update(
                "mobile",
                e.target.value
              )
            }
            placeholder="10 digit mobile number"
          />

        </div>

        <div className="customer-field">

          <label>
            EMAIL
          </label>

          <input
            type="email"
            value={customer.email}
            onChange={(e) =>
              update(
                "email",
                e.target.value
              )
            }
            placeholder="Customer email"
          />

        </div>

        <div className="customer-field">

          <label>
            PRESCRIBED BY DR.
          </label>

          <input
            value={customer.doctor}
            onChange={(e) =>
              update(
                "doctor",
                e.target.value
              )
            }
            placeholder="Doctor name"
          />

        </div>

      </div>

    </section>
  );
}

export default CustomerDetails;