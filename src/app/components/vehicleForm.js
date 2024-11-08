
import CustomInput from "./input";
import { SelectInput } from "./select";

const VehicleForm = () => {
    const fuelOptions = ["Petrol", "Diesel", "Electric"];
    const transmissionOptions = ["Manual", "Automatic"];
    const bodyTypeOptions = ["Hatchback", "Sedan", "SUV"];

    return (
        <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Registration" placeholder="Enter registration" />
                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Make" placeholder="Enter make" />
                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Model" placeholder="Enter model" />

                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Mileage" placeholder="Enter mileage" />
                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Price" placeholder="Enter price" />
                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Facebook Post" options={["Yes", "No"]} />

                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Location" options={["Choose Location"]} />
                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Driver" options={["Driver 1", "Driver 2"]} />
                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Body Type" option={bodyTypeOptions} />

                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Date" type="date" />
                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Start Time" type="time" />
                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="End Time" type="time" />

                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Fuel" options={fuelOptions} />
                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Type" placeholder="HATCHBACK" />
                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Doors" placeholder="Enter doors" type="number" />

                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Seats" placeholder="Enter seats" type="number" />
                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Transmission" options={transmissionOptions} />
                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Years" placeholder="Enter years" type="number" />
                    <CustomInput labelClass='text-[16px] font-medium text-customBlue ' label="Engine" placeholder="Enter engine" />

                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Keys" options={transmissionOptions} />
                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Service History" options={transmissionOptions} />
                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Dealer History" options={transmissionOptions} />
                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="V5 Present" options={transmissionOptions} />
                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Prep Needed" options={transmissionOptions} />
                    <SelectInput labelClass='text-[16px] text-customBlue font-medium' label="Mot Expires" options={transmissionOptions} />

                </div>
                <div className='grid md:grid-cols-1 mt-4'>

                    <label htmlFor="message" className="text-[16px] text-customBlue font-medium">Description</label>
                    <textarea id="message" rows="4" className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]" placeholder="Add car description"></textarea>

                </div>

        </div>
    );
};

export default VehicleForm;
