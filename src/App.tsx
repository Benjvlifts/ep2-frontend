import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface Product {
  id: number
  name: string
  price: number
  description: string
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError('Error conectando con el backend')
        setLoading(false)
        console.error(err)
      })
  }, [])

  return (
    <div className="app">
      <header>
        <h1>🏢 Innovatech Chile v2</h1>
        <p>Catálogo de Productos</p>
      </header>
      <main>
        {loading && <p>Cargando productos...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        {!loading && !error && (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong>${product.price.toLocaleString()}</strong>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App