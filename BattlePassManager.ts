import { EventEmitter } from "node:events";
import { Level } from "./Level";
import { Reward } from "./Reward";

/**
 * The available events for the BattlePassManager class.
 */
export type BattlePassEvents = "levelUp" | "maxLevel";

/**
 * Represents a reward at a specific level in the battle pass.
 */
export type BattlePassReward = {
  level: number;
  rewards?: Reward[];
};

/**
 * Manages the progression and rewards of a battle pass.
 */
export class BattlePassManager extends EventEmitter {
  /**
   * An array of levels in the battle pass.
   */
  public levels: Level[];

  /**
   * The current level in the battle pass.
   */
  public curLevel: number;

  /**
   * The total XP earned in the battle pass.
   */
  public totalXp: number;

  /**
   * Creates a new instance of the BattlePassManager class.
   * @param levels An array of levels in the battle pass.
   * @param curLevel The current level in the battle pass. Defaults to 0.
   * @param totalXp The total XP earned in the battle pass. Defaults to 0.
   */
  constructor(levels: Level[], curLevel: number = 0, totalXp: number = 0) {
    super();
    this.levels = levels;
    this.curLevel = curLevel;
    this.totalXp = totalXp;
  }

  private emitBattlepassEvent(
    eventName: BattlePassEvents,
    ...args: any[]
  ): void {
    super.emit(eventName, ...args);
  }

  /**
   * Registers a callback for a battle pass event.
   * @param eventName The name of the battle pass event to listen for.
   * @param callback The callback function to invoke when the event is emitted.
   */
  public onBattlepassEvent(
    eventName: BattlePassEvents,
    callback: (...args: any[]) => void
  ): void {
    super.on(eventName, callback);
  }

  /**
   * Registers a callback for the "levelUp" event.
   * @param callback The callback function to invoke when the player levels up.
   *                 It receives the reward object as an argument.
   */
  public onLevelUp(callback: (reward: BattlePassReward) => void): void {
    super.on("levelUp", callback);
  }

  /**
   * Registers a callback for the "maxLevel" event.
   * @param callback The callback function to invoke when the player reaches the maximum level.
   *                 It does not receive any arguments.
   */
  public onMaxLevel(callback: (...args: any[]) => void): void {
    super.on("maxLevel", callback);
  }

  /**
   * Adds XP to the battle pass and emits levelUp and maxLevel events if necessary.
   * @param value The amount of XP to add.
   * @fires BattlePassManager#levelUp
   * @fires BattlePassManager#maxLevel
   */
  public addXp(value: number) {
    this.totalXp += value;

    while (
      this.curLevel < this.levels.length &&
      this.totalXp >= this.levels[this.curLevel].xp
    ) {
      let reachedMaxLevel = this.curLevel >= this.levels.length - 1;
      this.curLevel++;

      const battlePassReward: BattlePassReward = {
        level: this.curLevel,
        rewards: this.levels[this.curLevel - 1].rewards,
      };

      /**
       * Emitted when the player levels up in the battle pass.
       * @event BattlePassManager#levelUp
       * @param {string} reward - The JSON string representation of the BattlePassReward object.
       */
      this.emitBattlepassEvent("levelUp", battlePassReward);

      /**
       * Emitted when the player reaches the maximum level in the battle pass.
       * @event BattlePassManager#maxLevel
       */
      if (reachedMaxLevel) {
        this.emitBattlepassEvent("maxLevel");
      }
    }
  }
}
