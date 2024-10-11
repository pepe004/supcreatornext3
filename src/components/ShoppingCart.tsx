import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { databases } = useAppwrite()

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await databases.listDocuments('cart')
        setCartItems(response.documents)
      } catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }

    fetchCartItems()
  }, [databases])

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await databases.updateDocument('cart', itemId, { quantity: newQuantity })
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ))
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      await databases.deleteDocument('cart', itemId)
      setCartItems(cartItems.filter(item => item.id !== itemId))
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  <Button onClick={() => removeItem(item.id)} className="ml-4">Remove</Button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
            <Button className="mt-4 w-full">Proceed to Checkout</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ShoppingCart