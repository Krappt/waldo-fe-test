import PropTypes from 'prop-types';
import Pizza from '@components/Pizza';
import getPizzaImages from '@utils/getPizzaImages';
import styles from './Menu.module.scss';

function Menu(props) {
  const {
      items,
      addItem,
  } = props;

  return (
    <div className={styles.list}>
        { items.map((pizzaSize) => <Pizza
            key={pizzaSize.name}
            data={pizzaSize}
            image={getPizzaImages[pizzaSize.name]}
            addItem={addItem}
        />)}
    </div>
  );
}

Menu.propTypes = {
    items: PropTypes.array,
    addItem: PropTypes.func.isRequired,
};

Menu.defaultProps = {
    items: [],
};

export default Menu;
