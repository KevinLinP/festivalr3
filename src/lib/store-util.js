// stolen from 
// https://github.com/mvolkmann/svelte-session-store/blob/master/src/store-util.js
import {get, writable} from 'svelte/store';

function persist(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function writableSession(key, initialValue) {
  const sessionValue = JSON.parse(sessionStorage.getItem(key));
  if (!sessionValue) persist(key, initialValue);

  const store = writable(sessionValue || initialValue);
  store.subscribe(value => persist(key, value));
  return store;
}