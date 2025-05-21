// app/page.tsx

async function getProducts() {
  const res = await fetch(
    'https://verytop.ir/wp-json/wc/v3/products?consumer_key=ck_d182112caa9d47361973791a8f0ef503cdcca4b1&consumer_secret=cs_56b41ce98d1989fc91dd39e7b082314e6dd86fe4
',
    { next: { revalidate: 60 } }
  );
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>لیست محصولات</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
      }}>
        {products && products.length > 0 ? (
          products.map((product: any) => (
            <div key={product.id} style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#f9f9f9'
            }}>
              {product.images?.[0]?.src ? (
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  style={{ maxWidth: '100%', height: '200px', objectFit: 'contain' }}
                />
              ) : (
                <div style={{ height: '200px', backgroundColor: '#eee' }}>بدون تصویر</div>
              )}
              <h2 style={{ fontSize: '1.1rem', marginTop: '1rem' }}>{product.name}</h2>
              <p style={{ color: '#333', fontWeight: 'bold' }}>{product.price} تومان</p>
            </div>
          ))
        ) : (
          <p>محصولی پیدا نشد.</p>
        )}
      </div>
    </main>
  );
}
