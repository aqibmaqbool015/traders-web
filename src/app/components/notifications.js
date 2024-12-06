"use client";

const Notifications = () => {
  return (
    <>
      <h2
        className="text-2xl text-customBlue font-semibold mb-4
      capitalize"
      >
        Manage Notification
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <div className="rounded-[12px] p-2 overflow-hidden gap-2 flex justify-between my-3 border border-customGray">
          <div className="px-2 py-1">
            <h4 className="font-medium  text-customOrange text-[22px]">
              Notification
            </h4>
            <p className="text-customDarkGray text-[15px]">
              Turn off the button to disable notifications.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-customText peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-offset-customMessage dark:peer-focus:ring-customBlue rounded-full peer dark:bg-customDarkGray peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-customGray after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-customDarkGray peer-checked:bg-customBlue"></div>
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="md:w-[200px] w-[130px] inline-block py-2.5 md:px-10 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-4 mx-3"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Notifications;
