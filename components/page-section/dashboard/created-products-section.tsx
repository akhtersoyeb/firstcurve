import ProductCard from "@/components/product/product-card";
import { useProducts } from "@/hooks/queries/products";

export default function CreatedProductsSection() {
  const createdProducts = useProducts();

  if (createdProducts.data && createdProducts.data.length === 0) {
    return <></>;
  }

  if (createdProducts.data && createdProducts.data.length > 0) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recently Created Products
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8">
          Discover the latest product created by you.
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdProducts.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

  if (createdProducts.error) {
    return (
      <div>Failed to load created products. Sorry for the bad UI btw.</div>
    );
  }

  return <></>;
}
