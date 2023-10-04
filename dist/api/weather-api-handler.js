var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const axios = require("axios")
import axios from "axios";
const apiUrl = "https://api.tomorrow.io/v4/timelines";
const apiKey = "w9BoCLoyhHCmQ9wIDoyd2n0x9rLHnKTg";
const fields = "temperature";
// const fields = "temperature,humidity,windSpeed,rainIntensity"
export default class WeatherApiHandler {
    static getWeatherInsightsFromApi(location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${apiUrl}?location=${location}&fields=${fields}&startTime=now&endTime=nowPlus72h&apikey=${apiKey}`;
                console.log("Url: ", url);
                const result = yield axios.get(url);
                return result;
            }
            catch (error) {
                console.error("Error in fetching data: ", error);
                throw new Error("Error occured while fetching data from server");
            }
        });
    }
}
