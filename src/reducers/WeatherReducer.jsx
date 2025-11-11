export const initialState = {
  rain: false,
  snow: false,
  lightning: false,
  wind: false,
  clouds: false,
  timeOfDay: "", // 'day' , 'night' , 'sunset' , 'sunrise'
};

export const WEATHER_ACTIONS = {
  SET_RAIN: "SET_RAIN",
  SET_SNOW: "SET_SNOW",
  SET_LIGHTNING: "SET_LIGHTNING",
  SET_WIND: "SET_WIND",
  SET_CLOUDS: "SET_CLOUDS",
  SET_TIME_OF_DAY: "SET_TIME_OF_DAY",
  RESET_WEATHER: "RESET_WEATHER",
};

export function weatherReducer(state, action) {
  switch (action.type) {
    case WEATHER_ACTIONS.SET_RAIN:
      return { ...state, rain: action.payload };
    case WEATHER_ACTIONS.SET_TIME_OF_DAY:
      return { ...state, timeOfDay: action.payload };
    case WEATHER_ACTIONS.SET_SNOW:
      return { ...state, snow: action.payload };
    case WEATHER_ACTIONS.SET_LIGHTNING:
      return { ...state, lightning: action.payload };
    case WEATHER_ACTIONS.SET_WIND:
      return { ...state, wind: action.payload };
    case WEATHER_ACTIONS.SET_CLOUDS:
      return { ...state, clouds: action.payload };
    case WEATHER_ACTIONS.RESET_WEATHER:
      return { ...initialState };
    default:
      return state;
  }
}
