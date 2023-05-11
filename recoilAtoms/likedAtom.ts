import { atom } from "recoil";

export const likedTracks = atom({
  key: "likedTracks",
  default: []
});

export const recommendedTracks = atom({
  key: "recommendedTracks",
  default: []
});