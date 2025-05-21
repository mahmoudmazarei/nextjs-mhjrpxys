
// app/page.tsx

async function getProducts() {
  const res = await fetch(
    'https://verytop.ir/wp-json/wc/v3/products?consumer_key=ck_d182112caa9d47361973791a8f0ef503cdcca4b1&consumer_secret=cs_56b41ce98d1989fc91dd39e7b082314e6dd86fe4'
  );
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>محصولات فروشگاه</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>
            {p.name} - {p.price} تومان
          </li>
        ))}
      </ul>
    </main>
  );
}
