const intlFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const formatPrice = (price) => {
    return intlFormat.format(price);
};

export default formatPrice;