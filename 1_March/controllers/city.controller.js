const axios = require("axios");
const { redisClient } = require("../helpers/redis");
const { json } = require("express");
const { User } = require("../models/user.model");
const { userCitiesList } = require("../models/city.model");

const API = "http://api.weatherapi.com/v1";

const getCityData = async (req, res) => {
  try {
    const city = req.params.city || req.preferred_city;

    const isCache = await redisClient.get(city);

    if (isCache) {
      return res.send({ data: (isCache) });
    }

    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=7360074b00a94e64a4044639230105&q=${city}`
    );

    const weatherData = response.data;

    redisClient.set(city, JSON.stringify(weatherData),"EX",1800);

    await userCitiesList.findByIdAndUpdate(
      { _id: req.userId },
      { $push: { previousSearches: city } },
      { new: true, upsert: true },
      { setDefaultsOnInsert: true }
    );

    return res.send({ data: weatherData });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { getCityData };
