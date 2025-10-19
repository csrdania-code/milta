import { prisma } from '@/lib/db'

export default async function ProductPage({ params }: { params: { id: string }}) {

const p = await prisma.product.findUnique({ where: { id: params.id } })

if (!p || !p.isActive) return <div>No disponible</div>

return (<main>

<h1>{p.name}</h1>

<p>{p.origin} · {p.abv}% · {p.volumeMl} ml</p>

<p>{(p.priceCents/100).toFixed(2)} {p.currency}</p>
<button data-id={p.id} id="add-to-cart">Añadir al carrito</button>
<script dangerouslySetInnerHTML={{__html: `
  document.getElementById('add-to-cart').onclick = () => {
    const id='{p.id}';

const cart = JSON.parse(localStorage.getItem('cart')||'[]');

const idx = cart.findIndex(i => i.productId===id);

if (idx>=0) cart[idx].qty++; else cart.push({productId:id, qty:1});

localStorage.setItem('cart', JSON.stringify(cart));

alert('Añadido');

};

`}} />  </main>)
}