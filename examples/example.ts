import { BattlePassManager } from "../src/BattlePassManager";

// Create a new BattlePassManager with 3 levels
const battlePass = new BattlePassManager([
  {
    xp: 1000,
    rewards: [
      { id: 0, image: "./spaghetti.png", name: "spaghetti" },
      { id: 1, image: "./meatball.png", name: "meatball" },
    ],
  },
  { xp: 2000 },
  { xp: 3000, rewards: [{ id: 2, image: "./fork.png", name: "fork" }] },
]);

battlePass.onLevelUp(({ level, rewards }) => {
  console.log(`You're now level ${level}`);
  if (Array.isArray(rewards)) {
    console.log(`You've received: ${rewards.map((r) => r.name).join(", ")}`);
  }
});

battlePass.onBattlepassEvent("maxLevel", () => {
  console.log("You've reached max level");
});

battlePass.addXp(2000);
console.log("--------------------");
battlePass.addXp(1000);
console.log("--------------------");
battlePass.addXp(500);
battlePass.addXp(500);
