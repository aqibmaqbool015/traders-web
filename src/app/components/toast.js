import React from "react";
const CustomToast = ({ content, contact, mail }) => {
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
        
      </div>
    </>
  );
};

export default CustomToast;
