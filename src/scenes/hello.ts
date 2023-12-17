import { Scene, GameObjects } from "phaser";
import { store } from "../stores/index";
import { increment } from "../slices/Dummy/Dummy";

export class GameScene extends Scene {
  private textbox: GameObjects.Text | undefined;
  public value: number = store.getState().dummy.value;

  constructor() {
    super("scene-game");
  }

  create() {
    this.textbox = this.add.text(
      window.innerWidth / 2,
      window.innerHeight / 2,
      `Value in Phaser : ${this.value} \nPress any key to increment`,
      {
        color: "#FFF",
        fontFamily: "monospace",
        fontSize: "26px",
      },
    );
    this.textbox.setOrigin(0.5, 0.5);
    document.addEventListener("keydown", () => {
      this.increment();
    });
  }

  increment() {
    store.dispatch(increment(1));
    const newState = store.getState();
    const newValue = newState.dummy.value;
    this.value = newValue;
    this.textbox!.text = `Value in Phaser : ${this.value} \nPress any key to increment`;
  }
}
