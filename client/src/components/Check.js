import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Buy = styled.section`
  max-width: 80%;
  margin: 30px auto 0;
  text-align: center;
`;

const Check = () => {
  return (
    <Buy>
      <h1>Something nice should go here</h1>
      <Link to="/">Return to products page</Link>
    </Buy>
  );
};

export default Check;
