import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { store } from "@stores/index";
import { toggleInfo } from "@slices/computer/computer";
import { toggleComputerPortalKey } from "@slices/computer/computer";
import { PuzzleIds } from "@utils/PuzzleIds/puzzleId";
import { CommonCollectables } from "@sprites/CommonCollectables";

export class ComputerScene extends Phaser.Scene {
	constructor() {
		super({ key: "EmailScene" });
	}

	player: TutorialPlayer | undefined;
	map!: Phaser.Tilemaps.Tilemap;
	layer2!: Phaser.Tilemaps.TilemapLayer | null;
	Edge34!: Phaser.Tilemaps.TilemapLayer | null;
	Edge38!: Phaser.Tilemaps.TilemapLayer | null;
	Edge36!: Phaser.Tilemaps.TilemapLayer | null;
	Edge811!: Phaser.Tilemaps.TilemapLayer | null;
	Edge1011!: Phaser.Tilemaps.TilemapLayer | null;
	Edge710!: Phaser.Tilemaps.TilemapLayer | null;
	Edge610!: Phaser.Tilemaps.TilemapLayer | null;
	Edge26!: Phaser.Tilemaps.TilemapLayer | null;
	Edge56!: Phaser.Tilemaps.TilemapLayer | null;
	Edge59!: Phaser.Tilemaps.TilemapLayer | null;
	Edge15!: Phaser.Tilemaps.TilemapLayer | null;
	Edge12!: Phaser.Tilemaps.TilemapLayer | null;
	Edge48!: Phaser.Tilemaps.TilemapLayer | null;
	portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	switch: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	isInfoOpen = store.getState().computer.isInfoOpen;
	isSwitchOn = store.getState().computer.isSwitchOn;
	isLeverDown = store.getState().computer.isLeverDown;
	isPortalKeyOpen = store.getState().computer.isPortalKeyOpen;
	chest: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	collectablesLoc: { x: number; y: number }[] = [
		{ x: 215, y: 1040 },
		{ x: 400, y: 350 },
		{ x: 1480, y: 540 },
	];

	preload() {
		this.load.image("tileset_1", "assets/computer/Space station._32_2.png");
		this.load.image("tileset_2", "assets/computer/Tiles.png");
		this.load.image("tileset_3", "assets/computer/level_tileset.png");
		this.load.image("tileset_4", "assets/computer/numbers.png");

		this.load.tilemapTiledJSON("tilemap", "assets/computer/computerMap.json");
		this.load.spritesheet("player", "assets/computer/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("playerUI", "assets/computer/playerUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet(
			"playerCloseUI",
			"assets/computer/playerCloseUI.png",
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

		this.load.spritesheet("switch", "assets/computer/dungeon_sheet.png", {
			frameWidth: 16,
			frameHeight: 16,
			startFrame: 121,
		});

		this.load.image("1", "assets/collectables/1.png");
		this.load.image("2", "assets/collectables/2.png");
		this.load.image("3", "assets/collectables/3.png");
	}

	create() {
		this.map = this.make.tilemap({ key: "tilemap" });
		const tileset_1 = this.map.addTilesetImage(
			"Space station._32_2",
			"tileset_1"
		);
		const tileset_2 = this.map.addTilesetImage("Tiles", "tileset_2");
		const tileset_3 = this.map.addTilesetImage("level_tileset", "tileset_3");
		const tileset_4 = this.map.addTilesetImage("numbers", "tileset_4");
		const layer1 = this.map.createLayer("Tile Layer 1", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.layer2 = this.map.createLayer("Layer2", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.layer2!.setDepth(100);

		const layer4 = this.map.createLayer("computer", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge34 = this.map.createLayer("Edge34", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge38 = this.map.createLayer("Edge38", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge36 = this.map.createLayer("Edge36", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge811 = this.map.createLayer("Edge811", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge1011 = this.map.createLayer("Edge1011", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge710 = this.map.createLayer("Edge710", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge610 = this.map.createLayer("Edge610", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge26 = this.map.createLayer("Edge26", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge56 = this.map.createLayer("Edge56", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge59 = this.map.createLayer("Edge59", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge15 = this.map.createLayer("Edge15", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge12 = this.map.createLayer("Edge12", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);
		this.Edge48 = this.map.createLayer("Edge48", [
			tileset_1!,
			tileset_2!,
			tileset_3!,
			tileset_4!,
		]);

		this.player = new TutorialPlayer(
			this,
			32 * 18 - 16,
			32 * 18 - 16,
			"player"
		);

		this.player.setDepth(102);
		this.switch = this.physics.add.sprite(32 * 30 - 16, 32 * 17 - 16, "switch");
		this.switch.setScale(4.5);
		this.switch.setImmovable(true);
		this.switch.setDepth(102);

		// Adding and configuring the chest
		this.chest = this.physics.add.sprite(32 * 10 - 16, 32 * 17 - 16, "chest");
		this.chest.setScale(1);
		this.chest.setImmovable(true);
		this.chest.setDepth(102);

		// // Adding and configuring the portal
		// this.portal = this.physics.add.sprite(32 * 26 - 16, 32 * 7 - 16, "portal");
		// this.portal.setImmovable(true);
		// this.portal.setSize(32, 32);
		// this.portal.setDepth(102);
		// // Adding and configuring the portal
		// this.portal = this.physics.add.sprite(32 * 32 - 16, 32 * 17 - 16, "portal");
		// this.portal.setImmovable(true);
		// this.portal.setSize(32, 32);

		// Portal animations
		// this.portal.anims.create({
		// 	key: "idle",
		// 	frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 7 }),
		// 	frameRate: 10,
		// 	repeat: -1,
		// });
		// this.portal.anims.play("idle", true);

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

		// Add switch animations
		this.switch.anims.create({
			key: "switch-open",
			frames: this.anims.generateFrameNumbers("switch", {
				frames: [0, 1, 2, 3, 4],
			}),
			frameRate: 10,
			repeat: 0,
		});

		this.switch.anims.create({
			key: "switch-close",
			frames: this.anims.generateFrameNumbers("switch", {
				frames: [4, 3, 2, 1],
			}),
			frameRate: 10,
			repeat: 0,
		});

		this.physics.add.collider(this.player, this.switch, () => {
			if (!store.getState().computer.isPortalKeyOpen) {
				store.dispatch(toggleComputerPortalKey());
			}
			// this.switch!.anims.play("switch-open", true)
		});

		this.physics.add.collider(this.player, this.chest, () => {
			if (!store.getState().computer.isInfoOpen) {
				store.dispatch(toggleInfo());
			}
		});

		// this.physics.add.collider(this.player, this.portal, () => {
		// 	if (!store.getState().computer.isPortalKeyOpen) {
		// 		store.dispatch(toggleComputerPortalKey());
		// 	}
		// });

		store.subscribe(() => {
			const newIsInfoOpen = store.getState().computer.isInfoOpen;
			if (!this.isInfoOpen && newIsInfoOpen) {
				this.isInfoOpen = true;
			} else if (this.isInfoOpen && !newIsInfoOpen) {
				this.isInfoOpen = false;
			}
		});

		store.subscribe(() => {
			this.toggleLayers(
				store.getState().computer.params.userEdgeList as Edge[]
			);

			const newIsInfoOpen = store.getState().computer.isPortalKeyOpen;
			if (!this.isPortalKeyOpen && newIsInfoOpen) {
				this.switch!.anims.play("switch-close", true);
				this.isPortalKeyOpen = true;
			} else if (this.isPortalKeyOpen && !newIsInfoOpen) {
				this.switch!.anims.play("switch-open", true);
				this.isPortalKeyOpen = false;
			}
		});

		store.subscribe(() => {
			const newIsLeverDown = store.getState().computer.isInfoOpen;
			if (!this.isLeverDown && newIsLeverDown) {
				this.isLeverDown = true;
			} else if (this.isLeverDown && !newIsLeverDown) {
				this.isLeverDown = false;
			}
		});

		layer1!.setCollisionBetween(0, 1500);
		layer4!.setCollisionBetween(0, 1500);

		this.physics.add.collider(this.player!, layer1!);
		this.physics.add.collider(this.player!, this.layer2!);
		this.physics.add.collider(this.player!, layer4!);
		// map.setCollisionFromCollisionGroup(true, true, layer1!);
		// map.setCollisionFromCollisionGroup(true, true, layer2!);

		const camera = this.cameras.main.setZoom(1.5, 1.5);
		camera.startFollow(this.player, false, 0.5, 0.5);

		new CommonCollectables(
			this,
			this.collectablesLoc,
			2,
			PuzzleIds.MST_PUZZLE,
			this.player
		);
	}

	// update() {
	// 	if (
	// 		this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown
	// 	) {
	// 		this.toggleLayers();
	// 	}
	// }

	toggleLayers(wires: Edge[]) {
		this.Edge34!.setDepth(0);
		this.Edge38!.setDepth(0);
		this.Edge36!.setDepth(0);
		this.Edge811!.setDepth(0);
		this.Edge1011!.setDepth(0);
		this.Edge710!.setDepth(0);
		this.Edge610!.setDepth(0);
		this.Edge26!.setDepth(0);
		this.Edge56!.setDepth(0);
		this.Edge59!.setDepth(0);
		this.Edge15!.setDepth(0);
		this.Edge12!.setDepth(0);
		this.Edge48!.setDepth(0);

		const turnOn: { [Key: string]: Phaser.Tilemaps.TilemapLayer | null } = {
			"3,4": this.Edge34,
			"3,8": this.Edge38,
			"3,6": this.Edge36,
			"8,11": this.Edge811,
			"10,11": this.Edge1011,
			"7,10": this.Edge710,
			"6,10": this.Edge610,
			"2,6": this.Edge26,
			"5,6": this.Edge56,
			"5,9": this.Edge59,
			"1,5": this.Edge15,
			"1,2": this.Edge12,
			"4,8": this.Edge48,
		};

		for (const wire of wires) {
			const wireParsed: string =
				String(wire.source) + "," + String(wire.target);
			if (turnOn[wireParsed]) {
				turnOn[wireParsed]!.setDepth(101);
			}
		}
	}
}
