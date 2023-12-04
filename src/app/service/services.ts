import axios from "axios";

// export const SERVER_URL = 'http://192.168.1.10:3001/';
export const SERVER_URL = "http://localhost:3001/";

const client = axios.create({
  baseURL: SERVER_URL,
});

client.interceptors.request.use(
  (config) => {
    // add token to request header
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Add your request interceptor error handling logic here
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    // Add your response interceptor logic here
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    // Add your response interceptor error handling logic here
    return Promise.reject(error);
  }
);

export function submitApplication(data: any) {
  return client.post("application", data);
}

export function createRound(data: any) {
  return client.post("round", data);
}

export function createDocType(data: any) {
  return client.post("doc-type", data);
}

export function getAllDocTypes() {
  return client.get("doc-type");
}

export function deleteDocType(id: any) {
  return client.delete(`doc-type/${id}`);
}

export function updateDocType(id: any, data: any) {
  return client.patch(`doc-type/${id}`, data);
}

export function getRoundList() {
  return client.get("round");
}

export function getRound(id: any) {
  return client.get(`round/${id}`);
}

export function updateRound(id: any, data: any) {
  return client.patch(`round/${id}`, data);
}

export function getApplicationByYear(year: number) {
  return client.get(`application/year/${year}`);
}

export function getApplicationById(id: any) {
  return client.get(`application/${id}`);
}

export function login(data: any) {
  return client.post("auth/login", data);
}

export function createNonstudent(data: any) {
  return client.post("nonstudent", data);
}

export function getCurrentNonstudent() {
  return client.get("nonstudent/user");
}

export function updateCurrentNonstudent(data: any) {
  return client.patch("nonstudent/user", data);
}

export function createSponsor(data: any) {
  return client.post("sponsor", data);
}

export function getSponsorList() {
  return client.get("sponsor");
}
export function createComment(data: any) {
  return client.post("comment", data);
}
export function publicResult(data: any) {
  return client.post("round/public-result", data);
}
export function updateAppStatus(id: any, data: any) {
  return client.post(`application/update-status/${id}`, data);
}
