const GEO_BASE = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_BASE = "https://api.open-meteo.com/v1/forecast";

export async function geocodeCity(name) {
  const url = `${GEO_BASE}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch geocoding");
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }
  const r = data.results[0];
  return {
    latitude: r.latitude,
    longitude: r.longitude,
    name: r.name,
    country: r.country,
    admin1: r.admin1 ?? "",
    timezone: r.timezone ?? "auto",
  };
}

export async function getCurrentWeather(lat, lon) {
  const url = `${WEATHER_BASE}?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");
  const data = await res.json();
  return data.current_weather; // { temperature, windspeed, winddirection, weathercode, time }
}

// Simple weather code mapping for user-friendly text & emoji
export function mapWeatherCode(code) {
  const table = [
    { codes: [0], label: "Clear sky", emoji: "☀️" },
    { codes: [1, 2], label: "Partly cloudy", emoji: "🌤️" },
    { codes: [3], label: "Overcast", emoji: "☁️" },
    { codes: [45, 48], label: "Fog", emoji: "🌫️" },
    { codes: [51, 53, 55], label: "Drizzle", emoji: "🌦️" },
    { codes: [61, 63, 65], label: "Rain", emoji: "🌧️" },
    { codes: [66, 67], label: "Freezing rain", emoji: "🧊🌧️" },
    { codes: [71, 73, 75, 77], label: "Snow", emoji: "❄️" },
    { codes: [80, 81, 82], label: "Rain showers", emoji: "🌧️" },
    { codes: [85, 86], label: "Snow showers", emoji: "🌨️" },
    { codes: [95, 96, 99], label: "Thunderstorm", emoji: "⛈️" },
  ];
  const found = table.find((t) => t.codes.includes(Number(code)));
  return found || { label: "Unknown", emoji: "🌈" };
}
