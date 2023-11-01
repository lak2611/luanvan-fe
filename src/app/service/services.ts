import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001/',
});

export function submitApplication(data: any) {
  return client.post('application', data);
}

export function createRound(data: any) {
  return client.post('round', data);
}

export function createDocType(data: any) {
  return client.post('doc-type', data);
}

export function getAllDocTypes() {
  return client.get('doc-type');
}

export function deleteDocType(id: any) {
  return client.delete(`doc-type/${id}`);
}

export function updateDocType(id: any, data: any) {
  return client.patch(`doc-type/${id}`, data);
}

export function getRoundList() {
  return client.get('round');
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
