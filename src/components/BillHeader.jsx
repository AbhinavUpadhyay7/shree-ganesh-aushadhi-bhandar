import logo from "../assets/shree-ganesh-logo.png";

function BillHeader({
  shopHindiName,
  setShopHindiName,
  showHindiName,
  setShowHindiName,
  billNumber
}) {
  const today =
    new Date().toLocaleDateString(
      "en-IN"
    );

  return (
    <>
      <div className="bill-header">

        <div className="brand-area">

          <div className="logo-wrap">

            <img
              src={logo}
              alt="Shree Ganesh Aushadhi Bhandar"
              className="shop-logo"
            />

          </div>

          <div className="shop-info">

            <h1>
              SHREE GANESH
              <br />
              AUSHADHI BHANDAR
            </h1>

            {showHindiName && (
              <h2>
                {shopHindiName ||
                  "श्री गणेश औषधि भंडार"}
              </h2>
            )}

            <div className="shop-tagline">
              Ayurvedic & General Medicines
            </div>

            <div className="shop-contact">

              <span>
                Address: Sai Nagar, Vasai West, Vasai palghar Maharashtra 401202
              </span>

              <span>
                Mobile: 9049738856 / 9421544144
              </span>

            </div>

          </div>

        </div>

        <div className="invoice-meta">

          <div className="meta-label">
            BILL NO.
          </div>

          <div className="meta-number">
            {billNumber}
          </div>

          <div className="meta-label date-label">
            DATE
          </div>

          <div className="meta-date">
            {today}
          </div>

        </div>

      </div>

      <div className="header-controls">

        <label className="hindi-toggle">

          <input
            type="checkbox"
            checked={showHindiName}
            onChange={(e) =>
              setShowHindiName(
                e.target.checked
              )
            }
          />

          <span>
            Show Hindi Shop Name
          </span>

        </label>

        {showHindiName && (
          <input
            className="hindi-name-input"
            value={shopHindiName}
            onChange={(e) =>
              setShopHindiName(
                e.target.value
              )
            }
            placeholder="हिंदी में दुकान का नाम"
          />
        )}

      </div>
    </>
  );
}

export default BillHeader;