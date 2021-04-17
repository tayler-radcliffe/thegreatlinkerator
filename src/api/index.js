import axios from 'axios';

export async function getLinks() {
  try {
    return await axios.get(`/api/links`);
  } catch (error) {
    throw error;
  }
}


export async function createLink( url, comment, date, tags ) {
  try {
    return await axios.post(`/api/links`, {
        url,
        comment,
        date,
        tags
    });

  } catch (error) {
    throw error;
  }
}

export async function getLinksByTagName(tagName) {

  try {
     return await axios.get(`/api/tags/${tagName}/links`)

  } catch (error) {
    throw error;
  }
}

export async function updateCount(linkId) {

  try {
    return await axios.patch(`/api/${linkId}/count`)

  } catch (error) {
    throw error;
  }
}

// export async function deleteLink(linkId) {
//   try {
//     return await axios.delete(`/api/${linkId}`)

//   } catch (error) {
//     throw error;
//   }
// }