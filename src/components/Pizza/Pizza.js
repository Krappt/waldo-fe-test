import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import formatPrice from '@utils/formatPrice';
import styles from './Pizza.module.scss';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
    '&.Mui-expanded:before': {
        opacity: '100%',
    },
    '& .Mui-expanded': {
        margin: 0,
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    '& .Mui-expanded': {
        margin: 0,
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: '5px 15px',
    textAlign: 'left',
}));

const FormControlLabel = styled(MuiFormControlLabel)(() => ({
    '& .MuiTypography-root': {
        fontSize: '13px',
        width: '100%',
    }
}));

function Pizza(props) {
  const { data: { name, maxToppings, basePrice, toppings }, image, addItem } = props;
  const [expanded, setExpanded] = useState(true);
  const [changedToppings, setChangedToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalToppings, setTotalToppings] = useState(0);

  useEffect(() => {
      initToppings();
  }, [toppings]);

  useEffect(() => {
      let finalPrice = basePrice;
      let finalToppings = 0;

      for (let i = 0; i < changedToppings.length; i += 1) {
          const { selected, price } = changedToppings[i];
          if (selected) {
              finalPrice += price;
              finalToppings += 1;
          }
      }

      setTotalToppings(finalToppings);
      setTotalPrice(parseFloat(finalPrice.toFixed(10)));
  }, [changedToppings, basePrice]);

  const initToppings = () => {
      const selectedToppings = [];

      for (let i = 0; i < toppings.length; i += 1) {
          const { topping, defaultSelected } = toppings[i];
          const selected = defaultSelected;
          selectedToppings.push({ ...topping, selected })
      }

      setChangedToppings(selectedToppings);
  }

  const handleChangeAccordion = (event, newExpanded) => {
      setExpanded(newExpanded);
  };

  const handleChangeTopping = (index, checked) => {
      const finalToppings = [...changedToppings];
      const finalTopping = finalToppings[index];
      finalTopping.selected = checked;
      setChangedToppings(finalToppings);
  };

  const handleClickAddToCart = () => {
      addItem({
          name,
          toppings: changedToppings,
          basePrice,
          price: totalPrice,
      });
      initToppings();
  };

  return (
    <Paper className={styles.listItem}>
        <img className={styles.img} src={image} alt={name} />
        <div className={styles.info}>
            <div className={styles.title}>{name} Pizza</div>
            <div className={styles.infoItem}><span className={styles.infoItemTitle}>Base Price:</span> {formatPrice(basePrice)}</div>
            <div className={styles.infoItem}><span className={styles.infoItemTitle}>Price w/Toppings:</span> {formatPrice(totalPrice)}</div>
            <div className={styles.infoItem}><span className={styles.infoItemTitle}>Total Toppings:</span> {totalToppings}</div>
        </div>
        <Accordion expanded={expanded} onChange={handleChangeAccordion}>
            <AccordionSummary>Choose Toppings (max: {maxToppings || 'any'})</AccordionSummary>
            <AccordionDetails>
                <FormGroup className={styles.toppings}>
                    { changedToppings.map(({ name, price, defaultSelected, selected }, index) =>
                        <FormControlLabel
                            className={styles.toppingsItem}
                            key={name}
                            disabled={totalToppings === maxToppings && !selected}
                            control={<Checkbox checked={selected} onChange={(event, checked) => handleChangeTopping(index, checked)} />}
                            label={<div className={styles.toppingsItemLabel}><span>{name}</span><span>{formatPrice(price)}</span></div>}
                        />)}
                </FormGroup>
            </AccordionDetails>
        </Accordion>
        <Button variant="contained" fullWidth onClick={handleClickAddToCart}>Add to Cart</Button>
    </Paper>
  );
}

Pizza.propTypes = {
    data: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
    addItem: PropTypes.func.isRequired,
};

export default Pizza;
