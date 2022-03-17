import { gql } from '@apollo/client';

const FETCH_PIZZA_SIZES = gql`
  {
    pizzaSizes {
      name,
      maxToppings,
      basePrice,
      toppings {
        topping {
          name,
          price
        },
        defaultSelected
      }
    }
  }
`;

export default FETCH_PIZZA_SIZES;