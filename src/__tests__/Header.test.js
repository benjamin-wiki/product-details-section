import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Header from '../Header'

const mockCart = [
  {
    product: {
      id: 1,
      title: 'Mock Product 1',
      imageURL: 'mockimage1.jpg',
      price: 100,
    },
    size: 'S',
    quantity: 1,
  },
  {
    product: {
      id: 2,
      title: 'Mock Product 2',
      imageURL: 'mockimage2.jpg',
      price: 200,
    },
    size: 'M',
    quantity: 2,
  },
]

test('renders total quantity of items in cart', () => {
  const { getByLabelText } = render(<Header cart={mockCart} />)
  const totalItems = getByLabelText('My Cart ( 3 )')
  expect(totalItems).toBeInTheDocument()
})

test('shows cart when cart button is clicked', () => {
  const { getByLabelText, getByText } = render(<Header cart={mockCart} />)
  const cartButton = getByLabelText('My Cart ( 3 )')
  fireEvent.click(cartButton)

  const product1 = getByText(/Mock Product 1/i)
  const product2 = getByText(/Mock Product 2/i)

  expect(product1).toBeInTheDocument()
  expect(product2).toBeInTheDocument()
})

test('renders message when cart is empty', () => {
  const { getByLabelText, getByText } = render(<Header cart={[]} />)
  const cartButton = getByLabelText('My Cart ( 0 )')
  fireEvent.click(cartButton)

  const emptyCartMessage = getByText(/Your cart is empty/i)
  expect(emptyCartMessage).toBeInTheDocument()
})
