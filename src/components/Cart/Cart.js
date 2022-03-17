import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import getPizzaImages from '@utils/getPizzaImages';
import formatPrice from '@utils/formatPrice';
import styles from './Cart.module.scss';

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <Button variant="text" onClick={onClose}>Close</Button>
            ) : null}
        </DialogTitle>
    );
};

function Cart(props) {
  const {
      cart,
      open,
      onClose,
      removeItem,
  } = props;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
      const finalPrice = cart.reduce((sum, { price }) => sum + price, 0)

      setTotalPrice(parseFloat(finalPrice.toFixed(10)));
  }, [cart]);

  return (
      <Dialog
          open={open}
          onClose={onClose}
          maxWidth="lg"
      >
          <BootstrapDialogTitle className={styles.header} onClose={onClose}>Cart</BootstrapDialogTitle>
          <DialogContent className={styles.root}>
              {!!cart.length && <div className={styles.total}>
                  <span>{cart.length} Pizza(s), Total Price:</span>
                  <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
              </div>}
              {cart.map(({ name, toppings, basePrice, price }, index) => <div key={`${name}_${index}`} className={styles.cartItem}>
                  <img className={styles.img} src={getPizzaImages[name]} alt={name}/>
                  <div className={styles.cartItemInfo}>
                      <div className={styles.cartItemInfoTitle}>
                          <span>{name} Pizza</span>
                          <Button variant="text" onClick={() => removeItem(index) }>Remove</Button>
                      </div>
                      <ul className={styles.toppingsList}>
                          { toppings.map(({ name, selected }) => (selected && <li key={name} className={styles.toppingsListItem}>
                              <span>{name}</span>
                          </li>))}
                      </ul>
                      <div className={styles.price}>{formatPrice(price)}</div>
                  </div>
              </div>)}
              {!cart.length && <div className={styles.empty}>No Items</div>}
          </DialogContent>
      </Dialog>
  );
}

Cart.propTypes = {
    cart: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
};

export default Cart;
