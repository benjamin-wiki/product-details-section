import PropTypes from 'prop-types'

function Cart({ products, isOpen, onClose }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed right-0 top-0 h-full w-64 bg-white overflow-y-scroll">
      <button onClick={onClose}>Close</button>
      {products.map((product, index) => (
        <div key={index}>
          <img src={product.imageURL} alt={product.title} />
          <p>{product.title}</p>
          <p>Size: {product.size}</p>
          <p>
            {product.quantity} x ${product.price.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Cart
