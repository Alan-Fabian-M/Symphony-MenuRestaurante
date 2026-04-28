// MenuItemCard is no longer used — menu cards are implemented inline in pages/MenuPage.tsx
// Kept as stub to avoid broken imports.

interface MenuItemCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  index?: number;
}

export function MenuItemCard({ title, description, price, imageUrl }: MenuItemCardProps) {
  return (
    <div className="menu-card p-4">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover mb-3" />
      <div className="flex justify-between items-start">
        <h3 className="text-white/90 font-medium">{title}</h3>
        <span className="text-[#C9A84C] font-semibold text-sm">{price}</span>
      </div>
      <p className="text-white/35 text-xs mt-1">{description}</p>
    </div>
  );
}
