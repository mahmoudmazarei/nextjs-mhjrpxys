ck_d182112caa9d47361973791a8f0ef503cdcca4b1
.............
cs_56b41ce98d1989fc91dd39e7b082314e6dd86fe4
..........
https://verytop.ir/wp-json/wc/v3/products?consumer_key=ck_d182112caa9d47361973791a8f0ef503cdcca4b1&consumer_secret=cs_56b41ce98d1989fc91dd39e7b082314e6dd86fe4
 

// app/page.tsx

async function getProducts() {
  const res = await fetch(
   'https://verytop.ir/wp-json/wc/v3/products?consumer_key=ck_d182112caa9d47361973791a8f0ef503cdcca4b1&consumer_secret=cs_56b41ce98d1989fc91dd39e7b082314e6dd86fe4',
    { next: { revalidate: 60 } } // برای کش کردن سمت سرور Next.js
  );
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>محصولات فروشگاه</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
      }}>
        {products.map((p: any) => (
          <div key={p.id} style={{
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '1rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <img
              src={p.images?.[0]?.src}
              alt={p.name}
              style={{ maxWidth: '100%', height: '200px', objectFit: 'contain', marginBottom: '1rem' }}
            />
            <h2 style={{ fontSize: '1.2rem' }}>{p.name}</h2>
            <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{p.price} تومان</p>
          </div>
        ))}
      </div>
    </main>
  );
}
