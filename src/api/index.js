import axios from 'axios';

export async function getLinks() {
  try {
    const response = await axios.get(`/api/links`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}


export async function createLink( url, comment, date, tags ) {
  try {
    const response = await axios.post(`/api/links`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        comment: comment,
        date: date,
        tags: [tags]
      }),
    });
    const data = await response.json();

    return data;

  } catch (error) {
    throw error;
  }
}

export async function getLinksByTagName(tagName) {

  try {
    const response = await axios.get(`/api/tags/${tagName}/links`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;

  } catch (error) {
    throw error;
  }
}

export async function updateCount(linkId) {

  try {
    const response = await axios.patch(`/api/links/${linkId}/count`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
