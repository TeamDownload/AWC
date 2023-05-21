/* eslint-disable prettier/prettier */
const API_KEY_Weather = '0f19516defde52e001b3416c1ed2e6b2';
const API_KEY_Location = '6d4c53234b970d849f100c3a7acf8b42';
interface userInfo {
  userID: string;
  userEmail: string;
  userPW: string;
}
interface locationInfo {
  latitude: number;
  longitude: number;
}
export const getData = async () => {
  const url = 'http://119.69.23.6:8088/test';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
};

export const postData = async () => {
  const url = 'http://119.69.23.6:8088/posttest';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;',
    },
    body: JSON.stringify({
      email: 'als981209@gmail.com',
      password: 'dasfasdf',
    }),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

export const idCheck = async ({userID, userEmail, userPW}: userInfo) => {
  const url = 'http://119.69.23.6:8088/join';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;',
    },
    body: JSON.stringify({
      id: userID,
      name: userEmail,
      passWord: userPW,
    }),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

export const getWheatherAPI = ({latitude, longitude}: locationInfo) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY_Weather}&units=metric`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

export const getLocationAPI = ({latitude, longitude}: locationInfo) => {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
  return fetch(url, {
    headers: {
      Authorization: `KakaoAK ${API_KEY_Location}`,
    },
  }).then(response => response.json());
};
