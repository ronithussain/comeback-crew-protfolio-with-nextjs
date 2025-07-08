import { products } from "../public/data/data.json"
import CardCarousel from "./CardCarousel";

const TopSellers = () => {

    const cards = products.slice(4, 12).map((item) => ({
        image: item.image,
        text: item.text,
        price: `$${item.price}`, // ডলার সাইন সহ প্রাইস দেখানোর জন্য টেমপ্লেট স্ট্রিং ব্যবহার।
        id: item.id,
        category: item.category,
        inStock: item.inStock,
    }))
    console.log(cards)

    return (
        <div>
            <CardCarousel title="Top Sellers" cards={cards} />
        </div>
    );
};

export default TopSellers;