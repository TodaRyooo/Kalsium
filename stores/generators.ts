import { atom } from 'jotai';

export const passwordsAtom = atom<string[]>([]);
export const selectedPasswordAtom = atom<string>("");

export const identityAtom = atom("");
export const notesAtom = atom("");
