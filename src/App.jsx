import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { geocodeCity, getCurrentWeather } from "./lib/api";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [place, setPlace] = useState(null);
  const [current, setCurrent] = useState(null);

  const handleSearch = async (city) => {
    try {
      setErr("");
      setLoading(true);
      setPlace(null);
      setCurrent(null);

      const p = await geocodeCity(city);
      const cw = await getCurrentWeather(p.latitude, p.longitude);

      setPlace(p);
      setCurrent(cw);
    } catch (e) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">🌤️ Weather App</h1>
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="mt-6 text-center">Loading…</p>}
        {err && <p className="mt-6 text-red-200">{err}</p>}
        {place && current && <WeatherCard place={place} current={current} />}

        {!loading && !place && !err && (
          <p className="mt-6 text-white/80 text-center">Search for any city to see current weather.</p>
        )}
      </div>
    </div>
  );
}
