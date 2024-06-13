import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().trim().required("Name is a required field*"),
    email: yup.string().email("Invalid email format").required("Email is a required field*"),
    country: yup.string().required("Country is a required field*"),
    phone_number: yup.string().required("Phone number is a required field*"),
    // key: yup.string().required("Key is a required field*"),
    // user_type: yup.string().required("User type is a required field*"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is a required field*"),
    confirm_password: yup.string()
      .oneOf([yup.ref('password')], "Passwords must match")
      .required("Confirm password is a required field*"),
});

export default schema;
