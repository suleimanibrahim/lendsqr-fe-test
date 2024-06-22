import React from "react";
import Spinner from "react-bootstrap/Spinner";
const SpinnerIcon = ({
  loadingText = "Loading...",
}: {
  loadingText?: string;
}) => {
  return (
    <Spinner animation="border" role="status" size="sm">
      <span className="visually-hidden">{loadingText}</span>
    </Spinner>
  );
};

export default SpinnerIcon;
