import Image from "next/image";
import { Image_base } from "@/networking/network";
import { useRouter } from "next/navigation";

const Wishlist = ({ wishlists }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/detail/${wishlists?._id}`);
  };
  const image = {
    heart: "/heart-fill.svg",
    image: "/vehicle-1.png",
  };
  return (
    <>
      <div onClick={handleClick} className="rounded overflow-hidden cursor-pointer gap-2 my-3">
        <div>
          <Image
            className="w-full object-[initial] rounded-[10px] h-[300px] "
            src={
              wishlists?.vehicleId?.pictures?.length > 0
                ? `${Image_base}${wishlists?.vehicleId?.pictures[0]}`
                : image.image
            }
            alt="Sample image"
            width={300}
            height={300}
          />
        </div>

        <div className="px-2 py-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium  text-customOrange text-[22px]">
              {wishlists?.vehicleId?.price}
            </h4>
            <Image
              className="w-[22px] h-[22px] object-[initial]"
              src={image.heart}
              width={22}
              height={22}
              alt="Sample image"
            />
          </div>

          <p className="text-customBlackLight text-[18px]">
            {wishlists?.vehicleId?.model_id?.name}
          </p>

          <div className="flex justify-between items-center">
            <p className="text-customDarkGray text-[15px]">
              {wishlists?.vehicleId?.year} - {wishlists?.vehicleId?.mileage} km
            </p>
            <p className="text-customDarkGray text-[14px]">
              {wishlists?.vehicleId?.make_id?.createdAt
                ? new Date(
                    wishlists?.vehicleId?.make_id?.createdAt
                  ).toLocaleDateString("en-GB")
                : "7 days ago"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
