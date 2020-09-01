import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

import Product from "./Product";
import Nav from "./Nav";

const GET_PRODUCTS = gql`
  {
    merchants {
      guid
      merchant
      products {
        id
        name
        price
        description
        color
        size
        image
      }
    }
  }
`;

const GET_PRODUCT = gql`
  {
    products {
      id
      name
      price
      description
      color
      size
      image
    }
  }
`;

const FIND_PRODUCT = gql`
  query getProduct($size: String) {
    getProduct(size: $size) {
      id
      name
      price
      description
      color
      size
      image
    }
  }
`;

const GET_MERCHANT = gql`
  query getMerchant($merchant: String) {
    getMerchant(merchant: $merchant) {
      guid
      merchant
      products {
        id
        name
        price
        description
        color
        size
        image
      }
    }
  }
`;

const Products = styled.section`
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 50px auto;
`;

const Loading = styled.section`
  text-align: center;

  h3 {
    font-size: 2rem;
    margin: 100px auto;
  }
`;

const ProductsPage = styled.section``;

const ProductsList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const hey = useQuery(GET_PRODUCT);
  const merchantQuery = useQuery(GET_MERCHANT, {
    variables: { merchant: "CORPULSE" },
  });
  const findProduct = useQuery(FIND_PRODUCT, {
    variables: { size: "S" },
  });

  const getProduct = useQuery(GET_PRODUCT, {
    variables: { size: "S" },
  });

  const sortProducts = (type, merchants) => {
    const products = merchants.reduce(
      (acc, curr) => acc.concat(curr.products),
      []
    );

    switch (type) {
      case "lowHigh":
        return products.sort((a, b) => a.price - b.price);
      case "highLow":
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  if (loading) {
    return (
      <Loading>
        <h3>Loading...</h3>
      </Loading>
    );
  }

  if (error || !data?.merchants || data?.merchants?.length <= 0) {
    return (
      <Loading>
        <h3>No products available</h3>
      </Loading>
    );
  }

  const merchantList = data.merchants
    .reduce((acc, curr) => {
      return acc.concat(curr.merchant);
    }, [])
    .sort();

  return (
    <ProductsPage>
      <Nav>
        <button onClick={() => getProduct()}>Click me!</button>
      </Nav>
      <Products>
        {data.merchants.map((merchant) => {
          return merchant.products.map((product) => (
            <Product key={product.id} product={product} />
          ));
        })}
      </Products>
    </ProductsPage>
  );
};

export default ProductsList;
