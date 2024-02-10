import InterceptorX, {
	toggleDudeState,
	toggleInfo_1,
	toggleInfo_2,
	toggleInfo_3,
	toggleInfo_4,
	togglePortalKey,
	updateInterceptParams,
} from "@slices/InterceptorX/InterceptorX";
import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { store } from "@stores/index";
import { Interceptor } from "@slices/index";
export class InterceptorXScene extends Phaser.Scene {
	constructor() {
		super({ key: "InterceptorXScene" });
	}

	player: TutorialPlayer | undefined;
	chests: (Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined)[] =
		[];
	dummyChests: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
	portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	isPortalKeyOpen = store.getState().interceptor.isPortalKeyOpen;
	isDummyOpen = store.getState().interceptor.isDummyOpen;

	preload() {
		this.load.image("tileset_1", "assets/interceptorX/Space station._32_2.png");
		this.load.tilemapTiledJSON("tilemap", "assets/interceptorX/new_map.json");
		this.load.spritesheet("player", "assets/interceptorX/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("playerUI", "assets/interceptorX/playerUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet(
			"playerCloseUI",
			"assets/interceptorX/playerCloseUI.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet("chest", "assets/interceptorX/chests.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 56,
		});
		this.load.spritesheet("chest_2", "assets/interceptorX/chests.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 50,
		});
		this.load.spritesheet("chest_3", "assets/interceptorX/chests.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 8,
		});
		this.load.spritesheet("chest_4", "assets/interceptorX/chests.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 2,
		});
		this.load.spritesheet("portal", "assets/interceptorX/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("dude", "assets/interceptorX/dude.png", {
			frameWidth: 32,
			frameHeight: 48,
			startFrame: 0,
		});
	}

	create() {
		const map = this.make.tilemap({ key: "tilemap" });
		const tileset_1 = map.addTilesetImage("base", "tileset_1");
		const layer1 = map.createLayer("wall", tileset_1!);
		const layer2 = map.createLayer("base", tileset_1!);

		// Function to shuffle an array
		const shuffleArray = <T>(array: T[]): T[] => {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array;
		};

		// Combined array of all positions
		const combinedArray = [
			[65, 576],
			[672, 680],
			[992, 912],
			[1408, 1104],
			[832, 160],
			[416, 352],
			[530, 495],
			[128, 730],
			[660, 832],
			[192, 992],
			[960, 1136],
			[210, 1325],
			[512, 1440],
			[832, 1000],
			[1216, 944],
			[480, 1116],
			[110, 1200],
			[660, 1200],
			[840, 1200],
			[512, 210],
		];

		// Shuffle the combined array
		const shuffledArray = shuffleArray(combinedArray);

		// Separate the shuffled array into dummy chests and chests arrays
		const dummyChestsArray = shuffledArray.slice(0, 16);
		const chestsArray = shuffledArray.slice(16);

		const dummyChestKeys = [
			"chest",
			"chest_2",
			"chest_3",
			"chest_4",
			"chest",
			"chest_2",
			"chest_3",
			"chest_4",
			"chest",
			"chest_2",
			"chest_3",
			"chest_4",
			"chest_2",
			"chest",
			"chest_4",
			"chest_2",
		];

		for (let i = 0; i < dummyChestsArray.length; i++) {
			const dummyChest = this.physics.add.sprite(
				dummyChestsArray[i][0],
				dummyChestsArray[i][1],
				dummyChestKeys[i]
			);
			dummyChest.setScale(1);
			dummyChest.setImmovable(true);

			dummyChest.anims.create({
				key: `${dummyChestKeys[i]}-open`,
				frames: this.anims.generateFrameNumbers(dummyChestKeys[i], {
					frames: [0, 12, 24, 36],
				}),
				frameRate: 10,
				repeat: 0,
			});

			dummyChest.anims.create({
				key: `${dummyChestKeys[i]}-close`,
				frames: this.anims.generateFrameNumbers(dummyChestKeys[i], {
					frames: [36, 24, 12, 0],
				}),
				frameRate: 10,
				repeat: 0,
			});

			this.dummyChests.push(dummyChest);
		}

		const chestKeys = ["chest_2", "chest", "chest_3", "chest_4"];
		let partsLocations = "";
		for (let i = 0; i < chestsArray.length; i++) {
			const chest = this.physics.add.sprite(
				chestsArray[i][0],
				chestsArray[i][1],
				chestKeys[i]
			);
			partsLocations += "(" + chestsArray[i][0] + "," + chestsArray[i][1] + ")";
			chest.setScale(1);
			chest.setImmovable(true);
			// chest.setTint(0xff0000);

			chest.anims.create({
				key: `${chestKeys[i]}-open`,
				frames: this.anims.generateFrameNumbers(chestKeys[i], {
					frames: [0, 12, 24, 36],
				}),
				frameRate: 10,
				repeat: 0,
			});

			chest.anims.create({
				key: `${chestKeys[i]}-close`,
				frames: this.anims.generateFrameNumbers(chestKeys[i], {
					frames: [36, 24, 12, 0],
				}),
				frameRate: 10,
				repeat: 0,
			});

			this.chests.push(chest);
		}

		store.dispatch(updateInterceptParams({ partsLocation: partsLocations }));
		this.portal = this.physics.add.sprite(320, 1290, "portal");
		this.portal.setImmovable(true);
		this.portal.setSize(32, 32);

		// console.log(store.getState().interceptor.noOfCollectedItem);
		// if (store.getState().interceptor.noOfCollectedItem == 4) {
		// 	this.portal.setVisible(true);
		// } else {
		// 	this.portal.setVisible(false);
		// }

		const dude = this.physics.add.sprite(32 * 9, 32 * 10, "dude");
		dude.setImmovable(true);
		dude.setSize(32, 32);

		this.portal.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1,
		});
		this.portal.anims.play("idle", true);

		this.player = new TutorialPlayer(
			this,
			32 * 15 - 16,
			32 * 15 - 16,
			"player"
		);

		this.physics.add.collider(this.player, this.portal, () => {
			if (!store.getState().interceptor.isPortalKeyOpen) {
				store.dispatch(togglePortalKey());
			}
		});

		this.physics.add.collider(this.player, dude, () => {
			if (!store.getState().interceptor.isDude) {
				store.dispatch(toggleDudeState());
			}
		});

		const isInfoStates = [
			store.getState().interceptor.isInfoOpen_1,
			store.getState().interceptor.isInfoOpen_2,
			store.getState().interceptor.isInfoOpen_3,
			store.getState().interceptor.isInfoOpen_4,
		];
		const toggleInfoActions = [
			toggleInfo_1,
			toggleInfo_2,
			toggleInfo_3,
			toggleInfo_4,
		];

		this.physics.add.collider(
			this.player!,
			this.chests as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[],
			(player, chestObject) => {
				if (chestObject instanceof Phaser.GameObjects.Sprite) {
					const chest =
						chestObject as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
					const index = this.chests.indexOf(chest);
					console.log(index);
					if (index !== -1 && !isInfoStates[index]) {
						console.log(index, "wassupppp");
						store.dispatch(toggleInfoActions[index]());
						chest.anims.play(`${chestKeys[index]}-open`, true);
					}
					this.chests[index] = undefined;
					chest.setVisible(false);
					this.time.delayedCall(700, () => {
						chest.anims.play(`${chestKeys[index]}-close`, true);
						// chest.destroy();
					});
				}
			}
		);

		this.physics.add.collider(
			this.player!,
			this.dummyChests,
			(player, dummyChestObject) => {
				if (dummyChestObject instanceof Phaser.GameObjects.Sprite) {
					const dummyChest =
						dummyChestObject as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
					const index = this.dummyChests.indexOf(dummyChest);

					if (index !== -1) {
						dummyChest.anims.play(`${dummyChestKeys[index]}-open`, true);

						this.time.delayedCall(700, () => {
							dummyChest.anims.play(`${dummyChestKeys[index]}-close`, true);
						});
					}
				}
			}
		);

		layer1!.setCollisionBetween(0, 1500);

		this.physics.add.collider(this.player!, layer1!);
		this.physics.add.collider(this.player!, layer2!);
		map.setCollisionFromCollisionGroup(true, true, layer1!);
		map.setCollisionFromCollisionGroup(true, true, layer2!);

		const camera = this.cameras.main.setZoom(1.5, 1.5);
		camera.startFollow(this.player, false, 0.5, 0.5);
	}
}
