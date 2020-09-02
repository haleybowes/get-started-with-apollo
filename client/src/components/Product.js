import React, { useState } from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
} from "reactstrap";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ProductCard = styled(Media)`
  flex-basis: calc(100% / 2 - 30px);
  margin: 30px auto;
  cursor: pointer;
  color: grey;
  box-shadow: 0px 8px 10px rgba(158, 147, 166, 0.14),
    0px 3px 14px rgba(158, 147, 166, 0.12), 0px 4px 5px rgba(158, 147, 166, 0.2);
  display: flex;
  border-radius: 6px;
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  .card-title {
    font-weight: 600;
  }
`;

const Product = ({ product }) => {
  let history = useHistory();
  const [clickButton, setClickButton] = useState(false);
  const { color, description, image, name, price, size } = product;

  return (
    <ProductCard>
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardTitle>Price: {price}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <Button
          color="primary"
          size="lg"
          block
          onClick={() => history.push("/check-check")}
        >
          Buy
        </Button>
      </CardBody>
    </ProductCard>
  );
};

export default Product;
