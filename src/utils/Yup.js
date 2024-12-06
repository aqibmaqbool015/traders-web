import * as Yup from "yup";

export const vehicleDetailValidationSchema = Yup.object().shape({
  post_desc: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  make_id: Yup.string().required("Make is required"),
  model_id: Yup.string().required("Model is required"),
  mileage: Yup.number()
    .required("Mileage is required")
    .positive("Mileage must be positive"),
  doors: Yup.number().required("Number of doors is required"),
  type: Yup.string().required("Type is required"),
  seats: Yup.number().required("Number of seats is required"),
  transition: Yup.string().required("Transition type is required"),
  year: Yup.number()
    .required("Year is required")
    .min(1900, "Enter a valid year"),
  owners: Yup.number().required("Number of owners is required"),
  location: Yup.string().required("Location is required"),
  engine: Yup.string().required("Engine details are required"),
  mot_expire: Yup.date().required("MOT expiration date is required"),
  pictures: Yup.mixed().required("Pictures are required"),
  drive: Yup.string(),
  date: Yup.date(),
  start_Time: Yup.string(),
  end_Time: Yup.string(),
  service_History: Yup.string(),
  dealer_History: Yup.string(),
  v5_present: Yup.string(),
  prep_needed: Yup.string(),
  regno: Yup.string().required("Registration number is required"),
  fuel: Yup.string().required("Fuel is required"),
  vehicleKey: Yup.string(),
});
