import { loadCollection, saveCollection, generateId } from "./storage";
import { seedTournaments } from "../data/seedTournaments";

const KEY = "gv_tournaments";

export function getTournaments() {
  return loadCollection(KEY, seedTournaments);
}

export function getTournamentById(id) {
  return getTournaments().find((t) => t.id === id) || null;
}

export function createTournament(data) {
  const tournaments = getTournaments();
  const newTournament = { participants: 0, ...data, id: generateId("t") };
  saveCollection(KEY, [...tournaments, newTournament]);
  return newTournament;
}

export function updateTournament(id, data) {
  const tournaments = getTournaments().map((t) => (t.id === id ? { ...t, ...data } : t));
  saveCollection(KEY, tournaments);
}

export function deleteTournament(id) {
  const tournaments = getTournaments().filter((t) => t.id !== id);
  saveCollection(KEY, tournaments);
}
