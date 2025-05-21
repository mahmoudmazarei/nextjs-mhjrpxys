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
    <main className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">لیست محصولات</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
            >
              {product.images?.[0]?.src ? (
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  بدون تصویر
                </div>
              )}

              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-pink-600 font-bold mt-2">{product.price} تومان</p>
            </div>
          ))
        ) : (
          <p>محصولی پیدا نشد.</p>
        )}
      </div>
    </main>
  );
}
