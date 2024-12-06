"use client";

const WantedList = ({ wanted }) => {
  return (
    <>
      <div className="rounded-[12px] p-2 overflow-hidden gap-2 flex justify-between items-end my-3 border border-customGray">
        <div className="px-2 py-1">
          <div>
            <p className="text-customBlue font-medium text-[17px]">
              {wanted?.make_id?.title} {""}
              {wanted?.model_id?.name}
            </p>
            <p className="text-customDarkGray text-[15px]">
              {wanted?.year} - {wanted?.mileage} Km
            </p>
          </div>
        </div>
        <h4 className="font-medium  text-customOrange text-[22px]">
          £{wanted?.price}
        </h4>
      </div>
    </>
  );
};

export default WantedList;
