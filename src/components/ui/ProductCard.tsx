import { Heart } from "lucide-react";
import { Button } from "./button";

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl?: string | null;
  imagePlaceholder?: string;
  isNew?: boolean;
  isTake2?: boolean;
}

export function ProductCard({ title, price, imageUrl, imagePlaceholder, isNew, isTake2 }: ProductCardProps) {
  return (
    <div className="bg-white border rounded-sm p-3 hover:shadow-lg transition-shadow group relative">
      {isNew && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 uppercase hexagon-shape">
            New Item
          </div>
        </div>
      )}
      
      <div className="h-48 bg-gray-100 mb-4 flex items-center justify-center relative overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">{imagePlaceholder || "Product Image"}</span>
        )}
        {isTake2 && (
          <div className="absolute -bottom-3 -right-3 z-10 bg-furnco-purple text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white shadow-sm flex flex-col items-center">
            <span>TAKE</span>
            <span className="text-lg leading-none text-furnco-orange">2</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-sm text-gray-800 leading-tight">{title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          Exclusive deal. Inventory is limited, don't miss out on this amazing offer.
        </p>
        <p className="text-furnco-purple font-extrabold text-lg mt-2">{price}</p>
        
        <div className="flex gap-2 mt-4 pt-2">
          <Button className="flex-1 bg-furnco-purple hover:bg-furnco-purple/90 text-white text-xs h-8 rounded-sm">
            Add to Cart
          </Button>
          <Button variant="outline" className="flex-1 text-xs h-8 rounded-sm border-gray-300 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3" /> Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
}