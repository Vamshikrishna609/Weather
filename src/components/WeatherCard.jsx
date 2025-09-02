import { mapWeatherCode } from "../lib/api";

export default function WeatherCard({ place, current }) {
  const { label, emoji } = mapWeatherCode(current.weathercode);

  return (
    <div className="mt-6 rounded-2xl bg-white/15 backdrop-blur p-6 shadow-lg text-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">
            {place.name}
            {place.admin1 ? `, ${place.admin1}` : ""} {place.country ? `• ${place.country}` : ""}
          </h2>
          <p className="text-white/80 text-sm mt-1">Updated: {new Date(current.time).toLocaleString()}</p>
        </div>
        <div className="text-5xl">{emoji}</div>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Temperature" value={`${current.temperature} °C`} />
        <Stat label="Wind Speed" value={`${current.windspeed} km/h`} />
        <Stat label="Wind Dir" value={`${current.winddirection}°`} />
        <Stat label="Condition" value={label} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/10 p-4 text-center">
      <div className="text-sm text-white/70">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
