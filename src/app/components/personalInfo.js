import CustomInput from "./input";

const PersonalInfo = ({
  profileImage,
  handleImageUpload,
  setProfileImage,
  inputProfile,
}) => {
  return (
    <>
      <h2 className="text-2xl text-customBlue font-semibold mb-4">
        Personal Information
      </h2>
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="flex justify-center mb-3">
            <div className="w-24 h-24 bg-customGray rounded-full relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <img
                  src="/user-vactor.png"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <span className="absolute bottom-0 right-0 bg-white rounded-full w-[28px] h-[28px] p-[5px]">
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer w-[17px] h-full inline-block"
                >
                  <img
                    src="/camera.svg"
                    alt="Camera"
                    className="w-full h-full object-contain"
                  />
                </label>
              </span>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, setProfileImage)}
              />
            </div>
          </div>
        </div>
        {/* Form for Personal Info */}
        <form className="w-full space-y-6">
          <div className="grid md:grid-cols-2 gap-3">
            {inputProfile?.map((field, index) => (
              <CustomInput
                key={index}
                label={field.label}
                type={field.type}
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                labelClass={field.labelClass}
              />
            ))}
          </div>
          <div className="!mt-5">
            <label
              htmlFor=""
              className="text-[17px] font-medium text-customBlue"
            >
              Bio
            </label>
            <textarea
              placeholder="Enter your Bio"
              rows="5"
              className="!mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500     border border-[#CFCFCF] rounded-[25px]"
            ></textarea>
          </div>
          <div className="text-center">
            <button className="md:w-[200px] w-[130px] inline-block py-2.5 md:px-10 px-4 border border-transparent rounded-[25px] shadow-sm text-sm font-medium text-white bg-customBlue !mt-4 mx-3">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalInfo;
