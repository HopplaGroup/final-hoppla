import { Ham, Percent, ShoppingBag, ShoppingCart } from "lucide-react";
import ProductCard from "./product-card";
import * as m from "@/paraglide/messages.js";

type SmartPageProps = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
};

const wendysProducts = [
    {
        id: 111,
        title: "ჰოპლას პაკეტი",
        price: 12.36,
        originalPrice: 12.36,
        discount: 16,
        rating: 4.5,
        imageUrl:
            "https://th.bing.com/th/id/OIG4.KeXE6XBxcYDvz1dCGynj?pid=ImgGn",
    },
    {
        id: 4,
        title: "კრუასანი",
        price: 3.0,
        originalPrice: 3.0,
        discount: 13,
        rating: 4.3,
        className: "",
        imageUrl:
            "https://www.koneserzysmaku.pl/media/products/f5ec0156fed5edbd75c7d80d5656ce00/images/thumbnail/large_Capture0067-4224-Edit.jpg?lm=1684566428",
    },
    {
        id: 3,
        title: 'ჩიფსი "დორიტოსი" ნაჩო',
        price: 3.35,
        originalPrice: 3.75,
        discount: 13,
        rating: 4.7,
        imageUrl:
            "https://th.bing.com/th/id/OIG4.FVvx6fpO7zyAhOLSoCTD?pid=ImgGn",
    },
    {
        id: 1,
        title: "წყალი სნო",
        price: 1.49,
        originalPrice: 1.75,
        discount: 16,
        rating: 4.5,
        imageUrl:
            "https://scontent.ftbs1-2.fna.fbcdn.net/v/t39.30808-6/327769889_507635761478344_8321317109972212056_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=XeHS3GTzH7YQ7kNvgF3UXNs&_nc_ht=scontent.ftbs1-2.fna&oh=00_AYAZZviWa0eoC689LFKVID59UVzputJyDlItZ5mIlp0azA&oe=66C018E8",
    },
    {
        id: 2,
        title: "სველი ხელსახოცი",
        price: 2.29,
        originalPrice: 2.8,
        discount: 15,
        rating: 4.8,
        imageUrl:
            "https://www.shopmassystoresbb.com/wp-content/uploads/2021/04/0869742053541.png",
    },
    {
        id: 5,
        title: 'USB კაბელი "ტენე"',
        price: 27.3,
        originalPrice: 27.3,
        discount: 10,
        rating: 4.6,
        imageUrl:
            "https://imageproxy.wolt.com/menu/menu-images/6596baf589763551300c9d2b/b9e2b6aa-af9e-11ee-a3a2-369445b2de39_100037.jpg?w=600",
    },
    {
        id: 6,
        title: 'ორცხობილა "ბრუსკეტი"',
        price: 4.1,
        originalPrice: 4.1,
        discount: 13,
        rating: 4.9,
        imageUrl:
            "https://imageproxy.wolt.com/menu/menu-images/618b813b51d4a5abf985f1b6/8734f10a-593b-11ee-a7df-5689d5316052_3800205873358.jpg?w=600",
    },
    {
        id: 7,
        title: "ჩიფსი წიწაკით /პრინგლსი",
        price: 12.7,
        originalPrice: 12.7,
        discount: 14,
        rating: 4.2,
        imageUrl:
            "https://imageproxy.wolt.com/menu/menu-images/618b813b51d4a5abf985f1b6/f887bf82-593a-11ee-a72d-aebd662823ba_5053990161669.jpg?w=600",
    },
];

export default function SmartPage({ params, searchParams }: SmartPageProps) {
    return (
        <>
            <section className="pt-5 relative">
                <div className="container">
                    <div className="grid grid-cols-12 gap-y-11 border rounded-md xl:h-[300px] overflow-hidden">
                        <div className="col-span-12 xl:col-span-8 py-12 px-4 lg:px-11  max-lg:rounded-2xl lg:rounded-l-2xl flex flex-col justify-between">
                            <h2 className="font-manrope font-bold text-2xl sm:text-4xl leading-10 text-black mb-9">
                                {m.watery_due_jan_learn()}
                            </h2>
                            <div className="flex flex-col min-[700px]:flex-row max-[700px]:gap-4 min-[700px]:items-center py-4 pr-3 lg:pr-10 pl-3 lg:pl-6 bg-gray-100 rounded-md mb-14 w-full xl:w-[calc(100%-45px)]">
                                <div className="flex items-center gap-4 pr-6 max-[700px]:pl-6 min-[700px]:border-r border-gray-200 ">
                                    <button className="p-3 rounded-full bg-primary/5 transition-all duration-500 hover:bg-indigo-100">
                                        <ShoppingBag className="text-primary" />
                                    </button>
                                    <p className="font-medium text-black">
                                        {m.real_solid_kestrel_propel()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 px-6 min-[700px]:border-r border-gray-200 ">
                                    <button className="p-3 rounded-full bg-primary/5 transition-all duration-500 hover:bg-indigo-100">
                                        <Ham className="text-primary" />
                                    </button>
                                    <p className="font-medium text-black">
                                        {m.aware_cuddly_gadfly_edit()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 pl-6  ">
                                    <button className="p-3 rounded-full bg-primary/5 transition-all duration-500 hover:bg-indigo-100">
                                        <Percent className="text-primary" />
                                    </button>
                                    <p className="font-medium text-black">
                                        {m.agent_east_scallop_lift()}
                                    </p>
                                </div>
                            </div>

                            {/* <a
                                href="javascript:;"
                                className="flex items-center rounded-full py-3 px-5 min-[550px]:w-max w-full justify-center shadow-sm shadow-transparent bg-primary transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700"
                            >
                                <ShoppingCart className="text-white" />
                                <span className="px-2 font-semibold text-base text-white">
                                    Shop Now
                                </span>
                            </a> */}
                        </div>
                        <div className="col-span-12 xl:col-span-4 w-full">
                            <img
                                src="https://imageproxy.wolt.com/venue/6596b98cf0e99ea2566b52b5/98817e18-ab09-11ee-a522-9e386e72aced_0958618c_5ed0_11ee_bb98_f6e76923db1c_wolt___smart_cover_new.jpg"
                                // src="https://pagedone.io/asset/uploads/1701234779.png"
                                alt="Warehouse image"
                                className="w-full h-full object-cover max-lg:rounded-md lg:rounded-r-md"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                {wendysProducts.map((product) => (
                    <ProductCard
                        // className={product.className}
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        discount={product.discount}
                        rating={product.rating}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </div>
        </>
    );
}
