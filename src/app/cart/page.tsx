"use client"

import { useEffect, useState } from 'react'

export default function CartPage() {

const [cart, setCart] = useState<{productId:string, qty:number}[]>([])

const [email, setEmail] = useState('')

const [addr, setAddr] = useState({line1:'', city:'', state:'', zip:'', country:'MX'})

useEffect(() => { setCart(JSON.parse(localStorage.getItem('cart')||'[]')) }, [])

const checkout = async () => {

const
 res = await fetch('/api/checkout', { method:'POST', 
headers:{'Content-Type':'application/json'}, body: JSON.stringify({ 
email, shippingAddress: addr, items: cart, ageConfirmed: true }) })

const data = await res.json()

if
 (res.ok) { alert('Pedido creado: '+data.orderId); 
localStorage.removeItem('cart') } else { alert(data.error?.message || 
'Error') }

}

return (<main>

<h1>Carrito</h1>

<pre>{JSON.stringify(cart,null,2)}</pre>

<input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />

<input placeholder="calle" value={addr.line1} onChange={e=>setAddr({...addr,line1:e.target.value})} />

<input placeholder="ciudad" value={addr.city} onChange={e=>setAddr({...addr,city:e.target.value})} />

<input placeholder="estado" value={addr.state} onChange={e=>setAddr({...addr,state:e.target.value})} />

<input placeholder="CP" value={addr.zip} onChange={e=>setAddr({...addr,zip:e.target.value})} />

<button onClick={checkout}>Pagar (MVP sin pasarela)</button>  </main>)
}