import { getRandomValue } from "./getRandomValue.js";

const PROPERTY = {
  titles: [
    "Grand Hyatt",
    "Marriott",
    "Hilton",
    "Four Seasons",
    "Ritz-Carlton",
    "Intercontinental",
    "Sheraton",
    "Westin",
    "Fairmont",
    "Hyatt Regency",
  ],
  types: ["palace", "flat", "house", "bungalow"],
  checkin: ["12:00", "13:00", "14:00"],
  checkout: ["12:00", "13:00", "14:00"],
  features: [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner",
  ],
  getFeature: () => {
    const featuresArr = [];
    for (let i = 0; i < getRandomValue(0, PROPERTY.features.length - 1); i++) {
      featuresArr.push(PROPERTY.features[i]);
    }
    return Array.from(new Set(featuresArr));
  },
  descriptions: [
    "Experience luxury and elegance at its finest at our hotel, where you'll be treated like royalty from the moment you arrive.",
    "Our hotel is the perfect destination for travelers seeking comfortable accommodations and world-class amenities in the heart of the city.",
    "Discover a peaceful oasis in the midst of the bustling city at our hotel, where you can relax and recharge in style.",
    "Indulge in the ultimate comfort and convenience at our hotel, where we cater to your every need with unparalleled hospitality.",
    "Step into a world of sophistication and charm at our hotel, where every detail has been thoughtfully designed with your comfort in mind.",
    "Experience the ultimate in relaxation and rejuvenation at our hotel, where you can unwind in style after a long day of sightseeing or work.",
    "At our hotel, we're dedicated to providing our guests with a memorable experience that will exceed their expectations in every way.",
    "Escape the stresses of daily life and immerse yourself in luxury at our hotel, where every moment is a moment of indulgence.",
    "From our stylish accommodations to our exceptional amenities and services, our hotel is the perfect choice for discerning travelers.",
    "Experience the best of both worlds at our hotel, where you can enjoy the tranquility of a peaceful retreat with the convenience of a prime location.",
  ],
  photos: new Array(getRandomValue(2, 10)).fill(null).map((el, index) => {
    return `http://o0.github.io/assets/images/tokyo/hotel${index + 1}.jpg,`;
  }),
  location: () => {
    return {
      x: getRandomLocationValue(20, 40).toFixed(5),
      y: getRandomLocationValue(60, 80).toFixed(5),
    };
  },
};

function getRandomLocationValue(min, max) {
  return Math.random() * (max - min) + min;
}

function createAuthor() {
  return {
    author: {
      avatar: `img/avatars/user0${getRandomValue(1, 8)}.png`,
      offer: {
        title: PROPERTY.titles[getRandomValue(0, PROPERTY.titles.length - 1)],
        address: PROPERTY.location(),
        price: getRandomValue(100, 100000),
        type: PROPERTY.types[getRandomValue(0, PROPERTY.types.length - 1)],
        rooms: getRandomValue(1, 10),
        guests: getRandomValue(1, 10),
        checkin:
          PROPERTY.checkin[getRandomValue(0, PROPERTY.checkin.length - 1)],
        checkout:
          PROPERTY.checkout[getRandomValue(0, PROPERTY.checkout.length - 1)],
        features: PROPERTY.getFeature(),
        photos: PROPERTY.photos,
        location: PROPERTY.location(),
      },
    },
  };
}

export const mockData = new Array(10).fill(null).map((el) => {
  return createAuthor();
});
