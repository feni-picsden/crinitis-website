import getConfig from 'next/config'

const { publicRuntimeConfig } = 'production';

const wpDomain = 'https://cr.crinitis.com.au';

let endpointWpAPI = wpDomain + '/wp-json/wp/v2'; // change this to AWS API Gateway URL once deployed
let endpointCrinzAPI = 'http://ec2-13-236-210-139.ap-southeast-2.compute.amazonaws.com/staging/api/v1/';
let awsApiEndPoint = endpointCrinzAPI;
let dashifyEndpoint = 'http://localhost:4001/api/v1/';

if (publicRuntimeConfig === "production") { //live
  dashifyEndpoint = 'https://api.dashify.com.au/api/v1/';
  endpointWpAPI = 'https://039cjq8ztj.execute-api.ap-southeast-2.amazonaws.com/prod';
  awsApiEndPoint = endpointWpAPI + '/';
}
if (publicRuntimeConfig === "development") { //live
  dashifyEndpoint = 'https://api.dashify.com.au/api/v1/';
}

const wpStaticBase = 'https://static.crinitis.com.au/';

export default {
  authToken: 'Basic YWRtaW46Q3IxbjF0MXMyMDE4',
  wpDomain: wpDomain,
  awsApiEndPoint: awsApiEndPoint,
  dashifyEndpoint: dashifyEndpoint,
  endpoint: endpointWpAPI,
  crinzEndPoint: endpointCrinzAPI,
  wpStaticBase: wpStaticBase,
  wpCakeBaseUrl: wpStaticBase + 'images/cakes/',
  sitename: '',
  paginationPostsPerPage: 2,
  categoriesPerPage: 99,
  postsPerPage: 99,
  gstPercentage: 10,
  cakeVipDiscountPercentage: 7,
  dateFormat: 'DD/MM/YYYY',
  PostTypes: ['menu', 'events', 'location', 'blog'], // add new post types here, otherwise page it will return a 404,
  googleCaptchaKey: '6LeIhH8UAAAAAJ9dTlmopM3Z07YAyA_T5eq_DuFr',
  call_us_link: 'tel:0280267700',
  telephone_local: '(02) 8026 7700',
  telephone_int: '+61 2 8026 7700',
  legal_name: 'Crinz Media Pty Ltd',
  email_primary: 'info@crinitis.com.au',
  pizzaChallengeAcceptForm: '#accept',
  gtmId: "GTM-MR6DDT5",
  paypal: {
    sandbox_flag: false,
  },
  freshchat: {
    token: '51d42422-b4ef-46d1-a6dc-6894fc12f610'
  },
  site_links: {
    home: '/',
    vip: '/la-famiglia',
    menu: '/menu',
    locations: '/locations',
    whats_on: '/whats-on',
    events: '/events',
    event_page: {
      birthday: {
        read_more: wpStaticBase + 'docs/event-booklet.pdf',
        book_now: '/event-booking',
      },
      corporate: {
        read_more: wpStaticBase + 'docs/event-booklet.pdf',
        book_now: '/event-booking',
      },
      wedding: {
        read_more: wpStaticBase + 'docs/event-booklet.pdf',
        book_now: '/event-booking',
      }
    },
    pizza_challenges: '/pizza-challenges',
    pizza_classes: '/pizza-classes',
    event_enquiry: '/event-enquiry',
    event_booking: '/event-booking',
    careers: '/careers',
    gallery: '/gallery',
    about: '/about',
    contact: '/contact',
    patisserie: '/lapatisserie',
    patisserie_cart: '/lapatisserie-cart',
    book_now: '/reservation',
    order_now: '/order-online',
    gift_card: '/gifts',
    birthday_package: '/birthday-package',
    privacy: '/privacy',
    policy: '/policy',
    crinitis_group: 'https://crinitigroup.com.au/',
    order_for_pickup: 'https://orders.crinitis.com.au',
    contest: '/contest',
    datenight: '/datenight'
  },
  social_links: {
    facebook: 'https://www.facebook.com/crinitis',
    twitter: 'https://twitter.com/crinitis?lang=en',
    instagram: 'https://instagram.com/crinitis',
    youtube: 'https://www.youtube.com/channel/UC748r_VelgryFEEpoWTrBMA',
    linkedin: 'https://au.linkedin.com/in/criniti-group-933038164',
  },
  docs: {
    metro_mania: wpStaticBase + 'docs/t%26c-metro-mania.pdf',
    two_mates: wpStaticBase + 'docs/t%26c-2mates.pdf',
    kids_pizza_class: wpStaticBase + 'docs/kids-pizza-classes.pdf',
    team_pizza_class: wpStaticBase + 'docs/team-pizza-classes.pdf',
  },
  genders: [
    {
      value: 'M',
      label: 'Male'
    },
    {
      value: 'F',
      label: 'Female'
    },
  ],
  hearFrom: [
    {
      value: 'Family or Friends',
      label: 'Family or Friends'
    },
    {
      value: 'Advertisements',
      label: 'Advertisements'
    },
    {
      value: 'Newsletters',
      label: 'Newsletters'
    },
    {
      value: 'Facebook',
      label: 'Facebook'
    },
    {
      value: 'Instagram',
      label: 'Instagram'
    },
    {
      value: 'Radio or TV',
      label: 'Radio or TV'
    },
    {
      value: 'Google Search',
      label: 'Google Search'
    },
    {
      value: 'Other',
      label: 'Other'
    },
  ],
  retailerSource: [
    {
      value: 'F45',
      label: 'F45'
    },
    {
      value: 'Retailer',
      label: 'Retailer'
    },
    {
      value: 'Residents',
      label: 'Residents'
    },
    {
      value: 'Plus Fitness',
      label: 'Plus Fitness'
    },
    {
      value: 'Bankwest Stadium',
      label: 'Bankwest Stadium'
    },
  ],
  easter_kids_pizza: {
    pizza_qty: makeArrayRange(1, 15),
    booking_time: ['11:30 AM'],
    price: 25,
    vip_price: 25,
  },
  kids_pizza: {
    pizza_qty: makeArrayRange(10, 25),
    booking_time: ['11:30 AM', '02:00 PM', '03:30 PM'],
    price: 45,
    vip_price: 39,
  },
  team_pizza: {
    pizza_qty: makeArrayRange(10, 80),
    price: 89,
  },
  event_type: [
    {
      value: '21st Birthday',
      label: '21st Birthday'
    }, {
      value: '30th Birthday',
      label: '30th Birthday'
    }, {
      value: '40th Birthday',
      label: '40th Birthday'
    }, {
      value: '50th Birthday',
      label: '50th Birthday'
    }, {
      value: '60th Birthday',
      label: '60th Birthday'
    }, {
      value: 'Other Birthday',
      label: 'Other Birthday'
    }, {
      value: 'Engagement',
      label: 'Engagement'
    }, {
      value: 'Wedding',
      label: 'Wedding'
    }, {
      value: 'Bucks Party',
      label: 'Bucks Party'
    }, {
      value: 'Hen\'s Party',
      label: 'Hen\'s Party'
    }, {
      value: 'Christening',
      label: 'Christening'
    }, {
      value: 'Fundraiser',
      label: 'Fundraiser'
    }, {
      value: 'Corporate Function',
      label: 'Corporate Function'
    }, {
      value: 'Corporate Christmas Party',
      label: 'Corporate Christmas Party'
    }, {
      value: 'Other',
      label: 'Other'
    },
  ],
  Budget: [
    {
      value: 'Under 1k',
      label: 'Under 1k'
    }, {
      value: 'Under 2.5k',
      label: 'Under 2.5k'
    }, {
      value: 'Under 5k',
      label: 'Under 5k'
    }, {
      value: '6k - 10k',
      label: '6k - 10k'
    }, {
      value: '11k - 20k',
      label: '11k - 20k'
    }, {
      value: 'Over 20k',
      label: 'Over 20k'
    },
  ],
  gift_vouchers_price: [
    {
      value: 50,
      label: '$50'
    },
    {
      value: 100,
      label: '$100'
    },
    {
      value: 150,
      label: '$150'
    },
  ],
  cake_order_types: [
    {
      value: 1,
      label: 'Reservation'
    },
    {
      value: 2,
      label: 'Pick Up'
    },
  ],
  cake_order_booking_time: [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
    '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM'
  ],
  balloon_color: [
    'Black', 'White', 'Red', 'Green', 'Yellow', 'Orange', 'Electric Blue', 'Baby Blue', 'Hot Pink', 'Baby Pink',
    'Purple', 'Silver', 'Gold'
  ],
  quantity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  pizzaChallenge: {
    booking_time: ["11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM",
      "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
      "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"],
    participants: [1, 2, 3],
    challenges: [
      {
        value: 1,
        label: "Metro Mania",
      },
      {
        value: 2,
        label: "2 Mates, 2 Metres",
      },
    ],
  },
  bookingAndDeposite: {
    menuType: [
      {
        value: 49,
        label: '$49'
      },
      {
        value: 59,
        label: '$59'
      },
      {
        value: 79,
        label: '$79'
      },
    ],
    dessert: ['Tiramisu', 'Creme Brulee', 'Ricotta CheeseCake', 'Gelato Cup (3 scoop)'],
    children: makeArrayRange(0, 500),
    adults: makeArrayRange(0, 500),
    guests: makeArrayRange(20, 500),
    beverage: ['Non-Alcohol 2 hours ($18pp)', 'Non-Alcohol 3 hours($29pp)', 'Standard 2 hours($39pp)',
      'Standard 3 hours($48pp)', 'Premium 2 hours($49pp)', 'Premium 3 hours($62pp)', 'On Consumption'],
  },
  birthdayPackage: {
    timeOfDay: ['Lunch', 'Dinner'],
    cake_location: ['CrinitisManly'],
    specific_cakes: [1], //[18, 1, 14, 13, 69, 70]
    min: 14,
    max: 20,
    menu_allow_after: 14,
    guests: makeArrayRange(14, 20), //min , max
    numberOfBalloon: makeArrayRange(1, 99),
    menuType: [
      {
        value: 49,
        label: '$49pp'
      },
      {
        value: 59,
        label: '$59pp'
      },
      {
        value: 79,
        label: '$79pp'
      },
    ],
  },
  nye: {
    allowLocation: [4, 7, 9],
    specialLocation: 4,
    adults: makeArrayRange(1, 20), //min , max
    kids: makeArrayRange(0, 20),
    normalAdultPrice: 190,
    normalKidsPrice: 45,
    placeType: [
      {
        value: 190,
        label: 'Inside $190pp'
      },
      {
        value: 250,
        label: 'Outside $250pp'
      },
    ],
    selectionType: [
      'Lamb Cutlets',
      'Spaghetti Marinara',
      'Gnocchi Pumpkin',
      'Chicken Funghi',
      'Veal Saltimbocca',
    ],
  },
  exclusiveOffer: {
    timeOfDay: ['Lunch', 'Dinner'],
    guests: makeArrayRange(1, 19),
    couponCode: '5624',
  },
  crinitisEski: {
    item_id: 72,
    price: 45,
    allow_location_ids: [3, 4, 5, 6, 7, 13, 16],
    qtys: makeArrayRange(1, 5),
  },
  Validation: {
    EmailValidate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    CardExpiryValidate: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
    NumberValidation: /^[0-9\b]+$/,
    message: {
      MESSAGE_TERM_AND_CONDITION: "Please checked Terms & Conditions...!!!",
      MESSAGE_CAPTCHA_REQUIRED: "Captcha Required...!!!",
      MESSAGE_INVALID_PAYMENT_TYPE: "Invalid payment type",
      MESSAGE_FIELDS_INVALID: "Highlighted fields is invalid",
      MESSAGE_FIELDS_REQUIRED: "Please fill up highlighted fields...!!!",
      MESSAGE_TIMEOUT: 5000,
    },

  }
}

function makeArrayRange(min, max) {
  let array = [];
  for (let i = min; i <= max; i++) {
    array.push(i);
  }
  return array;
}