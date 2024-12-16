import React from "react";
const CustomToast = ({ content, contact, mail, button, className }) => {
  return (
    <>
      <div>
        <p>{content}</p>
        <p>{contact}</p>
        <p>
          <a
            href="mailto:support@trade2trade.co.uk"
            style={{ color: "orange" }}
          >
            {mail}
          </a>
        </p>
        {/* <div className={className}>{button}</div> */}
      </div>
    </>
  );
};

export default CustomToast;
