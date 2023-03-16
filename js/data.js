import { getRandomValue, getRandomLocationValue } from "./util.js";

const DEFAULT_PROPS = {
  locationX: {
    min: 35.65,
    max: 35.7,
  },
  locationY: {
    min: 139.7,
    max: 139.8,
  },
  avatars: {
    min: 1,
    max: 8,
  },
  price: {
    min: 1000,
    max: 100000,
  },
  rooms: {
    min: 1,
    max: 10,
  },
  guests: {
    min: 1,
    max: 10,
  },
};

const PROPERTY = {
  offers: 10,
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
    "Wifi",
    "Dishwasher",
    "Parking",
    "Washer",
    "Elevator",
    "Conditioner",
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
  photos: () => {
    return new Array(getRandomValue(2, 10)).fill(null).map((el, index) => {
      return `http://o0.github.io/assets/images/tokyo/hotel${index + 1}.jpg`;
    });
  },
  location: () => {
    return {
      x: getRandomLocationValue(
        DEFAULT_PROPS.locationX.min,
        DEFAULT_PROPS.locationX.max
      ).toFixed(5),
      y: getRandomLocationValue(
        DEFAULT_PROPS.locationY.min,
        DEFAULT_PROPS.locationY.max
      ).toFixed(5),
    };
  },
};

function createAuthor() {
  const address = PROPERTY.location();

  return {
    author: {
      avatar: `img/avatars/user0${getRandomValue(
        DEFAULT_PROPS.avatars.min,
        DEFAULT_PROPS.avatars.max
      )}.png`,
    },
    offer: {
      title: PROPERTY.titles[getRandomValue(0, PROPERTY.titles.length - 1)],
      description:
        PROPERTY.descriptions[
          getRandomValue(0, PROPERTY.descriptions.length - 1)
        ],
      address: address,
      price: getRandomValue(DEFAULT_PROPS.price.min, DEFAULT_PROPS.price.max),
      type: PROPERTY.types[getRandomValue(0, PROPERTY.types.length - 1)],
      rooms: getRandomValue(DEFAULT_PROPS.rooms.min, DEFAULT_PROPS.rooms.max),
      guests: getRandomValue(
        DEFAULT_PROPS.guests.min,
        DEFAULT_PROPS.guests.max
      ),
      checkin: PROPERTY.checkin[getRandomValue(0, PROPERTY.checkin.length - 1)],
      checkout:
        PROPERTY.checkout[getRandomValue(0, PROPERTY.checkout.length - 1)],
      features: PROPERTY.getFeature(),
      photos: PROPERTY.photos(),
      location: address,
    },
  };
}

export const mockData = new Array(PROPERTY.offers).fill(null).map(() => {
  return createAuthor();
});
