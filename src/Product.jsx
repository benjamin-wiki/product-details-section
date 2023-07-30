import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Product({ product, cart, setCart }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [error, setError] = useState(null)

  const handleSizeClick = (id) => {
    if (selectedSize === id) {
      setSelectedSize(null)
    } else {
      setSelectedSize(id)
    }
  }

  const addToCart = () => {
    if (!selectedSize) {
      setError('Please select a size before adding to cart.')
      return
    }

    setError(null)

    const selectedSizeLabel = product.sizeOptions.find(
      (sizeOption) => sizeOption.id === selectedSize
    )?.label

    const updatedCart = [...cart]
    const itemInCart = updatedCart.find(
      (item) =>
        item.product.id === product.id && item.size === selectedSizeLabel
    )

    if (itemInCart) {
      itemInCart.quantity += 1
    } else {
      updatedCart.push({
        product: {
          id: product.id,
          title: product.title,
          imageURL: product.imageURL,
          price: product.price,
        },
        size: selectedSizeLabel,
        quantity: 1,
      })
    }

    setCart(updatedCart)
  }

  const selectedSizeLabel = product.sizeOptions.find(
    (sizeOption) => sizeOption.id === selectedSize
  )?.label

  return (
    <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-28 space-y-10 lg:space-y-0 pt-10">
      <div className="w-full lg:w-2/5 lg:pl-28">
        <img
          className="object-contain h-96 w-full lg:h-auto lg:w-full"
          src={product.imageURL}
          alt={product.title}
        />
      </div>
      <div className="w-full lg:w-1/2 space-y-4 px-5 lg:px-0 pb-5 lg:pb-0 pr-5 lg:pr-0">
        <h1 className="text-xl sm:text-2xl">{product.title}</h1>
        <p className="text-sm sm:text-sm font-semibold">
          {`$${product.price}`}.00
        </p>
        <p className="text-sm text-font-gray">{product.description}</p>
        <h2 className="text-sm uppercase text-font-gray">
          Size{' '}
          {selectedSizeLabel && (
            <span className="text-black">{selectedSizeLabel}</span>
          )}
          {!selectedSize && <span className="text-red-600">*</span>}
        </h2>

        {error && <p className="text-red-600 my-2">{error}</p>}

        <div className="flex space-x-2">
          {product.sizeOptions.map((sizeOption) => (
            <button
              key={sizeOption.id}
              onClick={() => handleSizeClick(sizeOption.id)}
              className={`w-10 h-10 text-xs text-center ${
                selectedSize === sizeOption.id
                  ? 'border-2 text-font-black border-border-dark-gray'
                  : 'border text-font-gray border-border-light-gray'
              }`}
            >
              {sizeOption.label}
            </button>
          ))}
        </div>

        <button
          onClick={addToCart}
          className="mt-4 border-2 border-border-dark-gray hover:bg-border-dark-gray text-black hover:text-white font-bold py-2 px-4 transition duration-200"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    imageURL: PropTypes.string,
    sizeOptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  setCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
}

export default Product
