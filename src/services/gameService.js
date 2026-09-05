import { loadCollection, saveCollection, generateId } from "./storage";
import { seedGames } from "../data/seedGames";

const KEY = "gv_games";

export function getGames() {
  return loadCollection(KEY, seedGames);
}

export function getGameById(id) {
  return getGames().find((g) => g.id === id) || null;
}

export function createGame(data) {
  const games = getGames();
  const newGame = { ...data, id: generateId("g") };
  saveCollection(KEY, [...games, newGame]);
  return newGame;
}

export function updateGame(id, data) {
  const games = getGames().map((g) => (g.id === id ? { ...g, ...data } : g));
  saveCollection(KEY, games);
}

export function deleteGame(id) {
  const games = getGames().filter((g) => g.id !== id);
  saveCollection(KEY, games);
}
