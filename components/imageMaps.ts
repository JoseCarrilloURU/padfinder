const backdropImageMap = {
  1: require("@/assets/images/icons/1.png"),
  2: require("@/assets/images/icons/2.png"),
  3: require("@/assets/images/icons/3.png"),
  4: require("@/assets/images/icons/4.png"),
};

const mockPosterMap: { [key: number]: any } = {
  1: require("@/assets/images/home/mockPosters/1.jpg"),
  2: require("@/assets/images/home/mockPosters/2.jpg"),
  3: require("@/assets/images/home/mockPosters/3.jpg"),
  4: require("@/assets/images/home/mockPosters/4.jpg"),
};
const searchBGMap: { [key: number]: any } = {
  1: require("@/assets/images/backgrounds/bg_discover.png"),
  2: require("@/assets/images/backgrounds/bg_movies.png"),
  3: require("@/assets/images/backgrounds/bg_tv.png"),
  5: require("@/assets/images/backgrounds/bg_profile.png"),
  6: require("@/assets/images/backgrounds/bg_movies.png"),
  7: require("@/assets/images/backgrounds/bg_tv.png"),
};

const getFlagImageForNumber = (number: number): void => {
  if (number >= 85 && number <= 100) {
    return require("../assets/images/flags/80-100.png");
  } else if (number >= 70 && number <= 84) {
    return require("../assets/images/flags/70-79.png");
  } else if (number >= 40 && number <= 69) {
    return require("../assets/images/flags/69-40.png");
  } else if (number >= 1 && number <= 39) {
    return require("../assets/images/flags/39-0.png");
  } else {
    return;
  }
};
const getFlagVideoForNumber = (number: number): void => {
  if (number >= 85 && number <= 100) {
    return require("../assets/images/flags/Flag4.json");
  } else if (number >= 70 && number <= 84) {
    return require("../assets/images/flags/Flag3.json");
  } else if (number >= 40 && number <= 69) {
    return require("../assets/images/flags/Flag2.json");
  } else if (number >= 1 && number <= 39) {
    return require("../assets/images/flags/Flag1.json");
  } else {
    return require("../assets/images/flags/flag0.png");
  }
};

export {
  backdropImageMap,
  mockPosterMap,
  searchBGMap,
  getFlagImageForNumber,
  getFlagVideoForNumber,
};
