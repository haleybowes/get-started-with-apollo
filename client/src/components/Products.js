import React, { useState, useEffect } from "react";
import { useQuery, gql, ApolloConsumer } from "@apollo/client";
import styled from "styled-components";

import Product from "./Product";

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

const Header = styled.section`
  display: flex;
  max-width: 80%;
  margin: 30px auto 0;
  justify-content: space-around;
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

const Button = styled.button`
  border-radius: 20px;
  transition: all 300ms ease-in-out;
  box-shadow: 0px 8px 10px rgba(158, 147, 166, 0.14),
    0px 3px 14px rgba(158, 147, 166, 0.12), 0px 4px 5px rgba(158, 147, 166, 0.2);
  background: white;
  border: 1px solid gray;
  padding: 5px 20px;
  margin: 0 5px;
  color: dimgray;

  &:hover {
    box-shadow: 0px 16px 24px rgba(158, 147, 166, 0.14),
      0px 6px 30px rgba(158, 147, 166, 0.12),
      0px 8px 10px rgba(158, 147, 166, 0.3);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  select {
    border-radius: 20px;
    width: 100%;
    background: white;
    border: 1px solid gray;
    padding: 5px 20px;
    color: dimgray;
  }
`;

const PriceSort = styled.div`
  div {
    display: flex;
  }
`;

const ProductsPage = styled.section`
  color: grey;

  p {
    text-align: center;
  }
`;

const ProductsList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [productList, setProductList] = useState([]);
  const [merchantList, setMerchantList] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (!productList?.length && data?.merchants) {
      const merchants = data?.merchants
        ?.reduce((acc, curr) => {
          if (curr.products.length > 0) {
            return acc.concat(curr.merchant);
          }
          return acc;
        }, [])
        .sort();
      setMerchantList(merchants);
      setProductList(data.merchants);
    }
  }, [productList, !!data?.merchants]);

  const sortProducts = (type) => {
    const products = data.merchants.reduce(
      (acc, curr) => acc.concat(curr.products),
      []
    );

    let sortedProducts;
    switch (type) {
      case "lowHigh":
        sortedProducts = products?.sort((a, b) => a.price - b.price);
        break;
      case "highLow":
        sortedProducts = products?.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = products;
        break;
    }
    return setProductList(sortedProducts);
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

  return (
    <ProductsPage>
      <Header>
        <PriceSort>
          <p>Sort by Price</p>
          <div>
            <Button onClick={() => sortProducts("highLow")}>High to Low</Button>
            <Button onClick={() => sortProducts("lowHigh")}>Low to High</Button>
          </div>
        </PriceSort>
        <ApolloConsumer>
          {(client) => (
            <Form>
              <label>
                <p>Get products by size</p>
                <select
                  value={selectedSize}
                  onChange={async (e) => {
                    const { data } = await client.query({
                      query: GET_PRODUCT,
                      variables: { size: e.target.value },
                    });
                    setProductList(data.getProduct);
                    setSelectedSize(data.getProduct[0].size);
                  }}
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </label>
            </Form>
          )}
        </ApolloConsumer>
        <ApolloConsumer>
          {(client) => (
            <Form>
              <label>
                <p>Filter by merchant</p>
                <select
                  value={selectedMerchant}
                  onChange={async (e) => {
                    const { data } = await client.query({
                      query: GET_MERCHANT,
                      variables: { merchant: e.target.value },
                    });
                    setSelectedMerchant(data.getMerchant.merchant);
                    setProductList(data.getMerchant.products);
                  }}
                >
                  {merchantList?.map((merchant, index) => (
                    <option key={index} value={merchant}>
                      {merchant}
                    </option>
                  ))}
                </select>
              </label>
            </Form>
          )}
        </ApolloConsumer>
      </Header>
      <Products>
        {productList?.map((merchant) => {
          if (!merchant) {
            return null;
          }

          if (merchant?.products) {
            return merchant?.products?.map((product) => (
              <Product key={product.id} product={product} />
            ));
          }

          return <Product key={merchant.id} product={merchant} />;
        })}
      </Products>
    </ProductsPage>
  );
};

export default ProductsList;
