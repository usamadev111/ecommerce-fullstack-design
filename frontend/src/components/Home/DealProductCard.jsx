function DealProductCard({ product }) {
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <div className="flex flex-col items-center rounded border bg-white p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-32 object-contain"
      />

      <h3 className="mt-3 text-center text-sm font-medium">{product.name}</h3>

      <span className="mt-2 rounded-full bg-red-100 px-3 py-1 text-xs text-red-600">
        -{discountPercentage}%
      </span>
    </div>
  );
}

export default DealProductCard;
