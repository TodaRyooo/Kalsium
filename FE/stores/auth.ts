import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const tokenAtom = atomWithStorage<string | null>("kalsium_token", null);
export const currentUserAtom = atom<{ id: string; username: string } | null>(null);
