import { jwtDecode } from 'jwt-decode';

function getTokenObj() {
  try {
    let token = localStorage.getItem('token');
    if (!token) {
      return {};
    }
    let tokenObj: any = jwtDecode(token);
    return tokenObj;
  } catch (error) {
    return {};
  }
}

export function isAdmin() {
  let tokenObj = getTokenObj();
  if (tokenObj.role === 'admin') {
    return true;
  }
  return false;
}

export function isNonstudent() {
  let tokenObj = getTokenObj();
  if (tokenObj.role === 'nonstudent') {
    return true;
  }
  return false;
}
