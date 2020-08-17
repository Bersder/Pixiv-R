import axios from 'axios'
import qs from 'qs';

const BASE_URL = ''
axios.defaults.timeout = 300000;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response)
      switch (err.response.status) {
        case 401:
          console.warn('not authorized')
          break
        case 404:
          console.warn(err.response.config.url + ' not find')
      }
    return Promise.reject(err)
  }
);

export function fetch(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL + url, { params: params })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export function post(url: string, data = {}, op = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } }) {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL + url, qs.stringify(data), op)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export function post_form(url: string, data: FormData, op = { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 100000 }) {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL + url, data, op)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}