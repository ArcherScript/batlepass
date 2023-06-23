# Battle Pass Manager

The Battle Pass Manager is a class that manages the progression and rewards of a battle pass. It provides functionality to track the current level, total XP earned, and emit events when certain conditions are met. The manager extends the EventEmitter class from the `node:events` module to handle event emission and listening.

## Installation

To use the Battle Pass Manager, you need to have Node.js installed on your system. You can then import the required modules and classes into your project.

```bash
npm install battlepass
```

## Usage

First, import the necessary classes and types into your project:

```typescript
import {
  BattlePassManager,
  BattlePassEvents,
  BattlePassReward,
} from "./BattlePassManager";
```

### Creating a Battle Pass Manager

To create a new instance of the BattlePassManager class, provide an array of levels in the battle pass. Each level should have an associated XP threshold and optional rewards.

```typescript
const levels = [
  { xp: 100, rewards: [{ name: "Reward 1" }] },
  { xp: 200, rewards: [{ name: "Reward 2" }] },
  { xp: 300, rewards: [{ name: "Reward 3" }] },
  // Add more levels as needed
];

const battlePass = new BattlePassManager(levels);
```

You can also specify the current level and total XP earned as optional parameters:

```typescript
const battlePass = new BattlePassManager(levels, 2, 150);
```

### Listening to Events

The BattlePassManager class extends the EventEmitter class, allowing you to listen for events emitted by the manager.

#### Listening to Battle Pass Events

To listen to any battle pass event, use the `onBattlepassEvent` method. Provide the event name and a callback function to handle the event.

```typescript
battlePass.onBattlepassEvent("levelUp", (reward: BattlePassReward) => {
  console.log(`Level up! Reached level ${reward.level}`);
  console.log("Unlocked rewards:", reward.rewards);
});

battlePass.onBattlepassEvent("maxLevel", () => {
  console.log(
    "Congratulations! You reached the maximum level in the battle pass."
  );
});
```

#### Listening to Specific Events

The BattlePassManager class provides convenience methods to listen to specific events, such as "levelUp" and "maxLevel".

##### Listening to the "levelUp" Event

To listen specifically to the "levelUp" event, use the `onLevelUp` method. Provide a callback function that receives the reward object (`BattlePassReward`) as an argument.

```typescript
battlePass.onLevelUp((reward: BattlePassReward) => {
  console.log(`Level up! Reached level ${reward.level}`);
  console.log("Unlocked rewards:", reward.rewards);
});
```

##### Listening to the "maxLevel" Event

To listen specifically to the "maxLevel" event, use the `onMaxLevel` method. Provide a callback function that does not receive any arguments.

```typescript
battlePass.onMaxLevel(() => {
  console.log(
    "Congratulations! You reached the maximum level in the battle pass."
  );
});
```

### Adding XP

You can add XP to the battle pass using the `addXp` method. Provide the amount of XP to add as a parameter.

```typescript
battlePass.addXp(50);
```

The `addXp` method increments the total XP earned and checks if the added XP causes the player to level up. If a level up occurs, the "levelUp" event is emitted with the corresponding reward information. If the player reaches the maximum level, the "maxLevel" event is emitted.

### Event Documentation

The BattlePassManager

emits the following events:

#### Event: "levelUp"

Emitted when the player levels up in the battle pass.

```typescript
battlePass.on("levelUp", (reward: BattlePassReward) => {
  // Handle level up event
});
```

The event callback function receives the reward object (`BattlePassReward`) as an argument. The reward object contains the level number and an array of rewards for that level.

#### Event: "maxLevel"

Emitted when the player reaches the maximum level in the battle pass.

```typescript
battlePass.on("maxLevel", () => {
  // Handle max level event
});
```

The event callback function does not receive any arguments.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

The Battle Pass Manager is released under the [MIT License](https://opensource.org/licenses/MIT).
