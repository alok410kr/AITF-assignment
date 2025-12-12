import React from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Eye,
  Droplets,
  MapPin,
  Thermometer
} from 'lucide-react';
import { WeatherData } from '../types';
import { useTranslation } from '../contexts/TranslationContext';

interface WeatherCardProps {
  weatherData: WeatherData;
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, className = '' }) => {
  const { t } = useTranslation();

  const getWeatherIcon = (condition: string, _iconCode: string) => {
    const iconProps = { size: 48, className: "text-white drop-shadow-lg" };

    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun {...iconProps} />;
      case 'clouds':
        return <Cloud {...iconProps} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain {...iconProps} />;
      case 'snow':
        return <CloudSnow {...iconProps} />;
      case 'mist':
      case 'fog':
        return <Cloud {...iconProps} />;
      default:
        return <Sun {...iconProps} />;
    }
  };


  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'from-amber-400 via-orange-500 to-red-500';
      case 'clouds':
        return 'from-slate-400 via-gray-500 to-slate-600';
      case 'rain':
      case 'drizzle':
        return 'from-teal-400 via-cyan-500 to-blue-600';
      case 'snow':
        return 'from-blue-200 via-cyan-300 to-blue-400';
      case 'mist':
      case 'fog':
        return 'from-gray-300 via-gray-400 to-gray-500';
      default:
        return 'from-teal-400 via-cyan-500 to-blue-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative weather-card bg-gradient-to-br ${getWeatherGradient(weatherData.current.condition)} ${className} overflow-hidden rounded-2xl shadow-2xl`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <MapPin size={24} className="text-white drop-shadow-lg" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-lg">
                {weatherData.location.name}
              </h3>
              <p className="text-sm text-white/90 font-medium">
                {weatherData.location.country}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-right bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2"
          >
            <p className="text-xs text-white/90 font-medium">{t.updated}</p>
            <p className="text-sm text-white font-semibold">
              {formatTime(weatherData.timestamp)}
            </p>
          </motion.div>
        </div>

        {/* Main Weather Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-5"
        >
          <div className="flex items-center space-x-5">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {getWeatherIcon(weatherData.current.condition, weatherData.current.icon)}
            </motion.div>
            <div>
              <div className="flex items-baseline">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                  className="text-6xl font-extrabold text-white drop-shadow-2xl"
                >
                  {weatherData.current.temperature}
                </motion.span>
                <span className="text-3xl text-white/90 ml-2 font-bold">°C</span>
              </div>
              <p className="text-lg text-white/95 capitalize mt-2 font-medium drop-shadow-lg">
                {weatherData.current.description}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-right bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
          >
            <div className="flex items-center justify-end space-x-2 text-white/90 mb-2">
              <Thermometer size={20} />
              <span className="text-sm font-medium">{t.feelsLike}</span>
            </div>
            <span className="text-2xl font-bold text-white drop-shadow-lg">
              {weatherData.current.feelsLike}°C
            </span>
          </motion.div>
        </motion.div>

        {/* Enhanced Weather Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          {[
            { icon: Droplets, label: t.humidity, value: `${weatherData.current.humidity}%`, delay: 0.6 },
            { icon: Wind, label: t.wind, value: `${weatherData.current.windSpeed} m/s`, delay: 0.7 },
            { icon: Eye, label: t.visibility, value: `${weatherData.current.visibility} km`, delay: 0.8 }
          ].map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: detail.delay, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center transition-all duration-300 hover:bg-white/20"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center mb-3"
              >
                <detail.icon size={24} className="text-white drop-shadow-lg" />
              </motion.div>
              <p className="text-sm text-white/90 font-medium mb-2">{detail.label}</p>
              <p className="text-xl font-bold text-white drop-shadow-lg">
                {detail.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Forecast */}
        {weatherData.forecast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="border-t border-white/30 pt-6"
          >
            <h4 className="text-lg font-bold text-white mb-5 drop-shadow-lg flex items-center">
              <span className="mr-2">📅</span>
              {t.fiveDayForecast}
            </h4>
            <div className="grid grid-cols-5 gap-3">
              {weatherData.forecast.slice(0, 5).map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.08, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center transition-all duration-300 hover:bg-white/20"
                >
                  <p className="text-sm text-white/95 mb-3 font-bold">
                    {(() => {
                      const dayIndex = new Date(day.date).getDay();
                      const dayNames = [t.days.sun, t.days.mon, t.days.tue, t.days.wed, t.days.thu, t.days.fri, t.days.sat];
                      return dayNames[dayIndex];
                    })()}
                  </p>
                  <div className="text-sm text-white mb-3">
                    <div className="font-bold text-lg drop-shadow-lg">{day.temperature.max}°</div>
                    <div className="text-white/80 text-xs">{day.temperature.min}°</div>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Droplets size={14} className="text-white/80" />
                    <p className="text-sm text-white/90 font-medium">
                      {day.precipitationChance}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WeatherCard;