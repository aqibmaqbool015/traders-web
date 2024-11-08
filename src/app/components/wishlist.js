import Link from "next/link";
import { cards } from "../constant";

const Wishlist = () => {
    const image = {
        heart: '/heart-fill.svg',
    }
    return (
        <>
            <h2 className="text-2xl text-customBlue font-semibold mb-4">Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {cards.map((item, index) => (
                    <div key={index} className="rounded overflow-hidden gap-2 my-3">
                        <Link href='/detail'>
                            <img className="w-full object-[initial]" src={item.image} alt="Sample image" />
                        </Link>

                        <div className="px-2 py-1">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium  text-customOrange text-[22px]">{item.title}</h4>
                                <img className="w-[22px] h-[22px] object-[initial]" src={image.heart} alt="Sample image" />
                            </div>

                            <p className="text-customBlackLight text-[18px]">{item.description}</p>

                            <div className="flex justify-between items-center">
                                <p className="text-customDarkGray text-[15px]">{item.distance}</p>
                                <p className="text-customDarkGray text-[14px]">{item.days}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}

export default Wishlist;