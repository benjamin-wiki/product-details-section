import { useState } from 'react'
import PropTypes from 'prop-types'

function Header({ cart }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  const toggleCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <header className="flex justify-end items-center py-0 px-8 bg-header-gray ">
      <div className={`relative`}>
        <button
          onClick={toggleCartOpen}
          className={`flex items-center p-2 text-gray-500 text-xs whitespace-nowrap ${
            isCartOpen ? 'bg-white border-r border-l border-gray-300' : ''
          } box-border`}
        >
          <span className="md:inline hidden">My Cart ( {totalItems} )</span>
          <span className="md:hidden inline">🛒</span>
        </button>

        {isCartOpen && (
          <div className="absolute right-0 w-80 bg-white border-r border-b border-l border-gray-300">
            {totalItems > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 my-2">
                  <img
                    src={item.product?.imageURL}
                    alt={item.product?.title}
                    className="w-24 object-cover object-center p-4"
                  />

                  <div>
                    <h2 className="text-sm">{item.product?.title}</h2>
                    <p>
                      {item.quantity} x $
                      {item.product?.price
                        ? item.product.price.toFixed(2)
                        : '0.00'}
                    </p>
                    <p>Size: {item.size}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-2">Your cart is empty</p>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        imageURL: PropTypes.string,
        price: PropTypes.number,
      }).isRequired,
      size: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default Header
