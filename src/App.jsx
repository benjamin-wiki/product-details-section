import { useState, useEffect } from 'react'
import Product from './product'
import Header from './header'

function App() {
  const [product, setProduct] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetch(
      'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product'
    )
      .then((response) => response.json())
      .then((data) => setProduct(data))
  }, [])

  if (!product) {
    return 'Loading...'
  }

  return (
    <div>
      <Header cart={cart} />
      <Product product={product} setCart={setCart} cart={cart} />
    </div>
  )
}

export default App
