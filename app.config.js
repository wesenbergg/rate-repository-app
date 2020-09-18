/* eslint-disable no-undef */
import 'dotenv/config';

export default {
  name: 'rate-repository-app',
  extra: {
    APOLLO_URI: process.env.APOLLO_URI,
  },
};