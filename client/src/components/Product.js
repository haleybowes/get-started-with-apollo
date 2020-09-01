import React, { useState } from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
} from "reactstrap";
import {
  useQuery,
  gql,
  useMutation,
  InMemoryCache,
  makeVar,
  useApolloClient,
} from "@apollo/client";
import styled from 'styled-components';

export const cartItemsVar = makeVar([]);

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users @client
  }
`;

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          read() {
            return cartItemsVar();
          },
        },
      },
    },
  },
});

// const cache = new InMemoryCache({
//   typePolicies: { // Type policy map
//     Product: {
//       fields: { // Field policy map for the Product type
//         isInCart: { // Field policy for the isInCart field
//           read(_, { variables }) { // The read function for the isInCart field
//             return localStorage.getItem('CART').includes(
//               variables.productId
//             );
//           }
//         }
//       }
//     }
//   }
// });

const GET_PRODUCT_DETAILS = gql`
  query ProductDetails($productId: ID!) {
    product(id: $productId) {
      name
      price
      isInCart @client
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      name
    }
  }
`;

const GET_USER = gql`
  query user($name: String) {
    user(name: $name) {
      name
    }
  }
`;

const Dog = ({ breed }) => {
  // const [addUser] = useMutation(ADD_USER);
  // const userQuery = useQuery(GET_USER, {
  //   variables: { name: "Haley" },
  // });
  // const { loading, error, data } = useQuery(GET_USERS);
  // const cartItems = cartItemsVar();
  // if (loading) return null;
  // if (error) return `Error! ${error}`;

  const client = useApolloClient();
  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });

  return (
    <div>
      <h1>hi!</h1>
      {/* <button onClick={() => cartItemsVar([...cartItems, "Rebecca"])}>
        Add to Cart
      </button> */}
      <button onClick={() => addUser({ variables: { name: "Rebecca" } })}>
        Click me!
      </button>
    </div>
  );
};

const ProductCard = styled(Media)`
  flex-basis: calc(100% / 2 - 30px);
  margin: 30px auto;
  cursor: pointer;
  color: grey;
  box-shadow: 0px 8px 10px rgba(158, 147, 166, 0.14), 0px 3px 14px rgba(158, 147, 166, 0.12), 0px 4px 5px rgba(158, 147, 166, 0.2);
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
          onClick={() => setClickButton(!clickButton)}
        >
          Buy
        </Button>
        {clickButton && <Dog breed="Corgi" />}
      </CardBody>
    </ProductCard>
  );
};

export default Product;
