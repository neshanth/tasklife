import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

function Alerts({ text, variant }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {text}
      </Alert>
    );
  }
}

export default Alerts;
