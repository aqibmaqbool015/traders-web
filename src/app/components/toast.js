import React from "react"
const CustomToast = ({ closeToast }) => {
  return (
    <>
      <div>
        <p>Your account registration request is under review.</p>
        <p>
          You can contact us at{" "}
          <a
            href="mailto:support@trade2trade.co.uk"
            style={{ color: "orange" }}
          >
            support@trade2trade.co.uk
          </a>
        </p>
        <button
          onClick={closeToast}
          style={{
            marginTop: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          OK
        </button>
      </div>
    </>
  );
};

export default CustomToast;