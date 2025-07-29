import { Product } from "@/types/product";
import moment from "moment";
import { Calendar, GitFork, Trash2 } from "lucide-react";
import { useRouter } from "next/router";

interface ProductCardInterface {
  product: Product;
}

export default function ProductCard({ product }: ProductCardInterface) {
  const router = useRouter();

  function handleProductCardClick() {
    router.push(`/products/${product.slug}`);
  }

  function handleProductDeleteButton() {
    console.log("Handle product delete for: ", product);
  }

  return (
    <>
      <div
        onClick={handleProductCardClick}
        className="h-48 relative bg-white overflow-hidden rounded-md group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-200"
      >
        {/* Soft Green Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
                radial-gradient(circle at center, #8FFFB0, transparent)
              `,
          }}
        />
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-black/10"></div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleProductDeleteButton();
          }}
          className="absolute cursor-pointer top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:text-red-500 transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <h3 className="font-semibold text-gray-900 text-sm">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-3 h-3 text-gray-600" />
              <span className="text-xs text-gray-600">
                {moment(product.created_at).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
