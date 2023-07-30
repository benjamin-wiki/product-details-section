import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Product from '../Product'

test('renders product title', () => {
  const mockProduct = {
    id: 1,
    title: 'Mock Product',
    description: 'This is a mock product for testing.',
    price: 100,
    imageURL: 'mockimage.jpg',
    sizeOptions: [
      { id: 1, label: 'S' },
      { id: 2, label: 'M' },
      { id: 3, label: 'L' },
    ],
  }
  const { getByRole } = render(
    <Product product={mockProduct} setCart={() => {}} cart={[]} />
  )

  const titleElement = getByRole('heading', { name: /Mock Product/i })
  expect(titleElement).toBeInTheDocument()
})

test('adds product to cart when "Add to Cart" button is clicked', () => {
  const mockProduct = {
    id: 1,
    title: 'Mock Product',
    description: 'This is a mock product for testing.',
    price: 100,
    imageURL: 'mockimage.jpg',
    sizeOptions: [
      { id: 1, label: 'S' },
      { id: 2, label: 'M' },
      { id: 3, label: 'L' },
    ],
  }
  const setCart = jest.fn()
  const { getByText } = render(
    <Product product={mockProduct} setCart={setCart} cart={[]} />
  )

  const sizeButton = getByText('S')
  fireEvent.click(sizeButton)

  const addToCartButton = getByText(/ADD TO CART/i)
  fireEvent.click(addToCartButton)

  expect(setCart).toBeCalled()
})
