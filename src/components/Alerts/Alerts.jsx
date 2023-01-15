import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./alerts.css";

function Alerts({ text, variant, closeHandler }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={variant}
        onClose={() => {
          setShow(false);
          closeHandler();
        }}
        dismissible
      >
        {text}
      </Alert>
    );
  }
}

export default Alerts;
