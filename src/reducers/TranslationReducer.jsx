const SRC_STATES = {
  overview: {
    humidity: "Humidity",
    wind_speed: "Wind",
    Feels_like: "Feels like",
    rain: "Rain",
    Max: "High",
    Min: "Low",
    pressure: "Pressure",
    visibility: "Visibility",
    clouds: "Cloud cover",
    Quick_Stats: "Quick Stats",
    Sun_Cycle: "Sun Cycle",
    sunrise: "Sunrise",
    sunset: "Sunset",
    Daylight_Progress: "Daylight Progress",
    Next_hours: "Next Hours",
    Air_Alerts: "Air & Alerts",
    Air_Quality: "Air Quality",
    Active_Alerts: "Active Alerts",
    no_alerts: "No active alerts",
  },
  hourly: {
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    rain: "Rain",
    title: `Detailed Hourly Conditions — { Location }`,
  },
  sixDays: {
    title: `Forecast Weather in { Location } (Next 6 Days)`,
  },
  sidebar: {
    Ovewview: "Overview",
    Hourly: "Hourly",
    sixDays: "6 Days",
    languages: "languages",
  },
};

export const TranslateInitialState = {
  overview: {
    humidity: "Humidity",
    wind_speed: "Wind",
    Feels_like: "Feels like",
    rain: "Rain",
    Max: "High",
    Min: "Low",
    pressure: "Pressure",
    visibility: "Visibility",
    clouds: "Cloud cover",
    Quick_Stats: "Quick Stats",
    Sun_Cycle: "Sun Cycle",
    sunrise: "Sunrise",
    sunset: "Sunset",
    Daylight_Progress: "Daylight Progress",
    Next_hours: "Next Hours",
    Air_Alerts: "Air & Alerts",
    Air_Quality: "Air Quality",
    Active_Alerts: "Active Alerts",
    no_alerts: "No active alerts",
  },
  hourly: {
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    rain: "Rain",
    title: `Detailed Hourly Conditions — { Location }`,
  },
  sixDays: {
    title: `Forecast Weather in { Location } (Next 6 Days)`,
  },
  sidebar: {
    Ovewview: "Overview",
    Hourly: "Hourly",
    sixDays: "6 Days",
    languages: "languages",
  },
};

export const TRANSLATE_ACTIONS = {
  SET_OVERVIEW: "SET_OVERVIEW",
  SET_HOURLY: "SET_HOURLY",
  SET_SIX_DAYS: "SET_SIX_DAYS",
};

export function TranslationReducer(state, action) {
  switch (action.type) {
    case TRANSLATE_ACTIONS.SET_OVERVIEW:
      return {
        ...state,
        overview: SRC_STATES.overview,
        sidebar: SRC_STATES.sidebar,
      };
    case TRANSLATE_ACTIONS.SET_HOURLY:
      return {
        ...state,
        hourly: SRC_STATES.hourly,
        sidebar: SRC_STATES.sidebar,
      };
    case TRANSLATE_ACTIONS.SET_SIX_DAYS:
      return {
        ...state,
        sixDays: SRC_STATES.sixDays,
        sidebar: SRC_STATES.sidebar,
      };
    default:
      return state;
  }
}
