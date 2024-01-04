import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { store } from "@stores/index";
import { toggleInfo, togglePortalKey } from "@slices/Tutorial/tutorial";

export class TutorialScene extends Phaser.Scene {
	constructor() {
		super({ key: "TutorialScene" });
	}

	player: TutorialPlayer | undefined;
	chest: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	isInfoOpen = store.getState().tutorial.isInfoOpen;

	preload() {
		// Loading all necessary assets
		this.load.image("tileset", "assets/tutorial/tileset.png");
		this.load.tilemapTiledJSON("tilemap", "assets/tutorial/tutorialMap.json");
		this.load.spritesheet("player", "assets/tutorial/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("playerUI", "assets/tutorial/playerUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet(
			"playerCloseUI",
			"assets/tutorial/playerCloseUI.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet("chest", "assets/tutorial/chests.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 56,
		});
		this.load.spritesheet("portal", "assets/tutorial/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
	}

	create() {
		// Creating i.e. adding the map
		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("tileset", "tileset");
		const layer2 = map.createLayer("Layer2", tileset!);
		const layer1 = map.createLayer("Layer1", tileset!);

		// Adding and configuring the chest
		this.chest = this.physics.add.sprite(32 * 10 - 16, 32 * 15 - 16, "chest");
		this.chest.setScale(1);
		this.chest.setImmovable(true);

		// Adding and configuring the portal
		this.portal = this.physics.add.sprite(32 * 26 - 16, 32 * 7 - 16, "portal");
		this.portal.setImmovable(true);
		this.portal.setSize(32, 32);

		// Portal animations
		this.portal.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1,
		});
		this.portal.anims.play("idle", true);

		// Chest animations
		this.chest.anims.create({
			key: "chest-open",
			frames: this.anims.generateFrameNumbers("chest", {
				frames: [0, 12, 24, 36],
			}),
			frameRate: 10,
			repeat: 0,
		});

		this.chest.anims.create({
			key: "chest-close",
			frames: this.anims.generateFrameNumbers("chest", {
				frames: [36, 24, 12, 0],
			}),
			frameRate: 10,
			repeat: 0,
		});

		// Ading the player
		this.player = new TutorialPlayer(
			this,
			32 * 10 - 16,
			32 * 10 - 16,
			"player"
		);

		// Collision callback between player and chest
		this.physics.add.collider(this.player, this.chest, () => {
			if (!store.getState().tutorial.isInfoOpen) {
				store.dispatch(toggleInfo());
			}
		});

		// Collider callback between player and portal
		this.physics.add.collider(this.player, this.portal, () => {
			if (!store.getState().tutorial.isPortalKeyOpen) {
				store.dispatch(togglePortalKey());
			}
		});

		// Listen to updates on info box opening
		store.subscribe(() => {
			const newIsInfoOpen = store.getState().tutorial.isInfoOpen;
			if (!this.isInfoOpen && newIsInfoOpen) {
				this.chest!.anims.play("chest-open", true);
				this.isInfoOpen = true;
			} else if (this.isInfoOpen && !newIsInfoOpen) {
				this.chest!.anims.play("chest-close", true);
				this.isInfoOpen = false;
			}
		});

		// Adding collision between player and map
		this.physics.add.collider(this.player!, layer1!);
		this.physics.add.collider(this.player!, layer2!);
		map.setCollisionFromCollisionGroup(true, true, layer1!);
		map.setCollisionFromCollisionGroup(true, true, layer2!);

		// Configuring camera
		const camera = this.cameras.main.setZoom(1.5, 1.5);
		camera.startFollow(this.player, false, 0.5, 0.5);

		// Debug graphics for collision (DO NOT DELETE)
		// map.renderDebug(this.add.graphics())

		// Other ways to add collision (DO NOT DELETE)
		// map.setCollisionBetween(0,999,true,true,layer1!);
		// layer1?.setCollisionByProperty({ collides: true });
		// layer2?.setCollisionByProperty({ collides: true });
		// layer1?.setCollisionByExclusion([-1]);
		// layer2?.setCollisionByExclusion([-1]);
	}
}
