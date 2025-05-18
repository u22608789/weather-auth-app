import { Request, Response } from 'express';
import axios from 'axios';

export const getWeather = async (req: Request, res: Response): Promise<void> => {
  const city = req.query.city as string;

  if (!city) {
    res.status(400).json({ message: "City is required" });
    return;
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

    const response = await axios.get(url);
    const { temp_c, condition } = response.data.current;

    res.json({
      city,
      temperature: temp_c,
      condition: condition.text,
      icon: condition.icon
    });
    return;

  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({ message: "Failed to fetch weather" });
    return;
  }
};
