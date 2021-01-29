import React from 'react';
import axios from 'axios';

const API_BASE_URL = "https://api.exchangeratesapi.io";

// add baseUrl for currency converter API
export default  axios.create( {baseURL: API_BASE_URL});
