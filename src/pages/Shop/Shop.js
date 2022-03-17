import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import fetchPizzas from '@queries/fetchPizzaSizes';
import Menu from '@components/Menu';
import Cart from '@components/Cart';
import Loader from '@components/Loader';
import styles from './Shop.module.scss';

function Shop() {
  const { loading, error, data } = useQuery(fetchPizzas);
  const [showToast, setShowToast] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const addItem = (cartItem) => {
      setCart([...cart, cartItem]);
      setShowToast(true);
  };

  const removeItem = (index) => {
      const finalCart = [...cart];
      finalCart.splice(index, 1);
      setCart(finalCart);
  };

  const handleCloseToast = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setShowToast(false);
  };

  const handleClickOpenCart = () => {
      setShowCart(true);
  }

  const handleClickCloseCart = () => {
      setShowCart(false);
  }

  if (loading) return <Loader />

  if (error) return <div className={styles.error}>Error. Please, refresh the page</div>

  return (
      <div className={styles.root}>
          <div className={styles.header}>
              <span>Pizza Shop!</span>
              <Button variant="contained" onClick={handleClickOpenCart}>Show my order</Button>
          </div>
          <Menu
              items={data?.pizzaSizes}
              addItem={addItem}
          />
          <Cart
              open={showCart}
              onClose={handleClickCloseCart}
              cart={cart}
              removeItem={removeItem}
          />
          <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={showToast}
              autoHideDuration={3000}
              onClose={handleCloseToast}
          >
              <Alert onClose={handleCloseToast} severity="success">Pizza added to Cart</Alert>
          </Snackbar>
      </div>
  );
}

export default Shop;
