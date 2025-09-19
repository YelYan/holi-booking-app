export const hotelTypes = [
  "Budget",
  "Boutique",
  "Luxury",
  "Ski Resort",
  "Business",
  "Family",
  "Romantic",
  "Hiking Resort",
  "Cabin",
  "Beach Resort",
  "Golf Resort",
  "Motel",
  "All Inclusive",
  "Pet Friendly",
  "Self Catering",
];

export const hotelFacilities = [
  "Free WiFi",
  "Parking",
  "Airport Shuttle",
  "Family Rooms",
  "Non-Smoking Rooms",
  "Outdoor Pool",
  "Spa",
  "Fitness Center",
  "Jacuzzi",
];

export const loginformControls = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        componentType : "input",
        type : "email",
        validation : {required : true}
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        componentType : "input",
        type : "password",
        validation : {required : true, maxLength : 20, minLength : 6}
    },
]
export const registerformControls = [
    {
        name : "name",
        label : "Name",
        placeholder : "Enter your name",
        componentType : "input",
        type : "text",
        validation : {required : true}
    },
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        componentType : "input",
        type : "email",
        validation : {required : true}
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        componentType : "input",
        type : "password",
        validation : {required : true, maxLength : 20, minLength : 6}
    },
]
export const forgotPasswordformControls = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        componentType : "input",
        type : "email",
        validation : {required : true}
    },
]
export const resetPasswordFormControls = [
  {
    name: "password",
    label: "New Password",
    placeholder: "Enter your new password",
    componentType: "input",
    type: "password",
    validation: { required: true, minLength: 6 },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your new password",
    componentType: "input",
    type: "password",
    validation: { required: true, minLength: 6 },
  },
];


export const detailsSectionFormControls = [
    {
        name : "name",
        label : "Name",
        placeholder : "Enter your Name",
        componentType : "input",
        type : "text",
        validation : {required : true}
    },
    {
        name : "city",
        label : "City",
        placeholder : "Enter your City",
        componentType : "input",
        type : "text",
        validation : {required : true}
    },
    {
        name : "country",
        label : "Country",
        placeholder : "Enter your Country",
        componentType : "input",
        type : "text",
        validation : {required : true}
    },
    {
        name : "description",
        label : "Description",
        placeholder : "Enter your Description",
        componentType : "textarea",
        type : "text",
        validation : {required : true}
    },
    {
        name : "pricePerNight",
        label : "Price Per Night",
        placeholder : "Enter your price",
        componentType : "input",
        type : "number",
        validation : {required : true}
    },
    {
      name: "starRating",
      label: "Star Rating",
      placeholder: "Select Star Rating",
      componentType: "select",
      validation : {required : true},
      options: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
      ],
    },
    {
      name: "type",
      label: "Hotel Types",
      placeholder: "Select Hotel Types",
      componentType: "select",
      validation : {required : true},
      options: hotelTypes.map((type) => ({
        value: type,
        label: type,
      })),
    },
]

export const guestsSectionFormControls = [
      {
        name : "adultCount",
        label : "AdultCount",
        placeholder : "Enter your Adult count",
        componentType : "input",
        type : "number",
        validation : {required : true}
    },
    {
        name : "childCount",
        label : "ChildCount",
        placeholder : "Enter your child count",
        componentType : "input",
        type : "number",
        validation : {required : true}
    },
]





