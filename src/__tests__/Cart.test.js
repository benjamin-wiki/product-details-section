import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Cart from '../Cart'

const mockProducts = [
  {
    imageURL: 'mockimage1.jpg',
    title: 'Mock Product 1',
    size: 'S',
    quantity: 1,
    price: 100,
  },
  {
    imageURL: 'mockimage2.jpg',
    title: 'Mock Product 2',
    size: 'M',
    quantity: 2,
    price: 200,
  },
]

test('renders the cart when isOpen is true', () => {
  const { getByText } = render(
    <Cart products={mockProducts} isOpen={true} onClose={() => {}} />
  )

  const product1 = getByText(/Mock Product 1/i)
  const product2 = getByText(/Mock Product 2/i)

  expect(product1).toBeInTheDocument()
  expect(product2).toBeInTheDocument()
})

test('does not render the cart when isOpen is false', () => {
  const { queryByText } = render(
    <Cart products={mockProducts} isOpen={false} onClose={() => {}} />
  )

  const product1 = queryByText(/Mock Product 1/i)
  const product2 = queryByText(/Mock Product 2/i)

  expect(product1).not.toBeInTheDocument()
  expect(product2).not.toBeInTheDocument()
})

test('calls onClose when close button is clicked', () => {
  const onClose = jest.fn()
  const { getByText } = render(
    <Cart products={mockProducts} isOpen={true} onClose={onClose} />
  )

  const closeButton = getByText('Close')
  fireEvent.click(closeButton)

  expect(onClose).toBeCalled()
})
