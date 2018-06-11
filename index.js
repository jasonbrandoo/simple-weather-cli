#!/usr/bin/env node

const axios = require('axios');
const program = require('commander');
const inquirer = require('inquirer');

require('dotenv').config();

const key = process.env.API_KEY;

program.version('1.0.0').description('Simple Weather App');

program
  .command('find')
  .alias('f')
  .description('Find City')
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'cities',
          message: 'Find your city'
        }
      ])
      .then(answer => {
        const city = answer;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${
          city.cities
        }&APPID=${key}`;

        axios
          .get(url)
          .then(response => {
            const mainCity = 'City - ' + response.data.name;
            const mainWeather = 'Weather - ' + response.data.weather[0].main;
            const mainTemp = 'Temp - ' + response.data.main.temp;
            const mainPressure = 'Pressure - ' + response.data.main.pressure;
            const mainHumidity = 'Humidity - ' + response.data.main.humidity;

            console.log(
              mainCity +
                '\n' +
                mainWeather +
                '\n' +
                mainTemp +
                '\n' +
                mainPressure +
                '\n' +
                mainHumidity
            );
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  });

program.parse(process.argv);
