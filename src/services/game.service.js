import apiClient from './index';

export async function getChoices() {
  return apiClient
    .get('choices')
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}

export async function getBotChoice() {
  return apiClient
    .get('choice')
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}

export async function getResult(choiceId) {
  return apiClient
    .post('play', { player: choiceId })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}
