import { generateTile } from "@time-world/core";

console.log(
  generateTile({
    intent: 0.8,
    time: 120,
    action: 0.6,
    emotion: 0.3,
    energy: 0.9,
  })
);