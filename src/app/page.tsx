import { prisma } from '@/lib/db'

export default async function Page() {

const products = await prisma.product.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } })

return (<main>

<h1>Mezcales</h1>

<ul>{products.map(p => (

<li key={p.id}>

<a href={`/products/${p.id}`}>{p.name}</a> - {'$' + (p.priceCents/100).toFixed(2)} {p.currency}

{p.imageUrl ? <img src={p.imageUrl} alt={p.name} width="160" /> : null}

</li>

))}</ul>  </main>)
}