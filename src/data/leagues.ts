export type PlayerPosition = "GK" | "DF" | "MC" | "DC";

export interface Player {
  id: string;
  name: string;
  leagueIds: string[];
  position: PlayerPosition;
}

export type JerseyStyle = {
  id: string;
  name: string;
  direction: "vertical" | "horizontal";
  colors: string[]; // 2-3 colors
};

export const JERSEY_STYLES: JerseyStyle[] = [
  { id: "mamas", name: "Mamas FC", direction: "vertical", colors: ["#1a3a2a", "#ffffff", "#1a3a2a"] },
  { id: "fuego", name: "Fuego", direction: "vertical", colors: ["#d37802", "#ffffff", "#000000"] },
  { id: "oceano", name: "Océano", direction: "vertical", colors: ["#e2e2e2", "#df9037"] },
  { id: "sol", name: "Sol", direction: "vertical", colors: ["#ffffff", "#2da80e", "#ffffff"] },
  { id: "noche", name: "Noche", direction: "vertical", colors: ["#11486d", "#000000", "#11486d"] },
];

export interface FieldPlayer {
  playerId: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface Substitution {
  id: string;
  playerOut: string; // player id
  playerIn: string; // player id
}

export interface LeagueConfig {
  id: string;
  name: string;
  colorVar: string; // CSS variable name
  glowClass: string;
  maxOnField: number;
}

export interface FormationState {
  leagueId: string;
  fieldPlayers: FieldPlayer[];
  substitutions: Substitution[];
}

export const LEAGUES: LeagueConfig[] = [
  {
    id: "jrs",
    name: "JRS",
    colorVar: "--league-jrs",
    glowClass: "league-glow-jrs",
    maxOnField: 6,
  },
  {
    id: "pegeche",
    name: "PEGECHE",
    colorVar: "--league-pegeche",
    glowClass: "league-glow-pegeche",
    maxOnField: 6,
  },
  {
    id: "gorditos",
    name: "GORDITOS",
    colorVar: "--league-gorditos",
    glowClass: "league-glow-gorditos",
    maxOnField: 5,
  },
];

export const PLAYERS: Player[] = [
  { id: "duraznito", name: "Duraznito", leagueIds: ["jrs", "pegeche", "gorditos"], position: "DF" },
  { id: "juan", name: "Ruud Gullit", leagueIds: ["jrs", "pegeche", "gorditos"], position: "DF" },
  { id: "mati", name: "Gersinho", leagueIds: ["jrs", "pegeche"], position: "DF" },
  { id: "nico", name: "Hellfire", leagueIds: ["jrs", "pegeche", "gorditos"], position: "DF" },
  { id: "franco", name: "German Lux", leagueIds: ["jrs"], position: "GK" },
  { id: "tomi", name: "Campera", leagueIds: ["jrs", "pegeche", "gorditos"], position: "MC" },
  { id: "lucas", name: "Robinho", leagueIds: ["jrs", "pegeche", "gorditos"], position: "MC" },
  { id: "santi", name: "Aleman", leagueIds: ["jrs", "pegeche", "gorditos"], position: "DC" },
  { id: "leo", name: "Borja", leagueIds: ["jrs", "pegeche"], position: "GK" },
  { id: "fede", name: "Chisito", leagueIds: ["pegeche", "gorditos"], position: "DF" },
  { id: "agus", name: "DPL", leagueIds: ["pegeche", "jrs"], position: "DC" },
  { id: "pablo", name: "FCB", leagueIds: ["pegeche" , "jrs"], position: "MC" },
   { id: "Monkey", name: "Monkey", leagueIds: [ "pegeche", "gorditos"], position: "DC" },
    { id: "Bnnx", name: "Bnnx", leagueIds: ["pegeche" , "jrs"], position: "DC" },
];

export function getPlayersForLeague(leagueId: string): Player[] {
  return PLAYERS.filter((p) => p.leagueIds.includes(leagueId));
}
