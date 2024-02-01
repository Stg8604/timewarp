import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { toggleEditor } from "@slices/index";
import { phaserConfig } from "@phaserGame/game";
import BackBtn from "../../../components/BackBtn";
import PasskeyBox from "../../../components/SoundPuzzle/PasskeyBox";
import { InfoBox, ReactPy } from "@components/index";
import Inventory from "../../../components/Inventory";
import {
	toggleHintBox,
	updateSoundParams,
} from "@slices/SoundPuzzle/soundPuzzle";
import SoundPuzzleModule from "@modules/SoundPuzzle.txt";
const hashmap: { [key: string]: string } = {
	audio_clip_1: "/assets/1.mp3",
	audio_clip_2: "/assets/2.mp3",
	audio_clip_3: "/assets/3.mp3",
	audio_clip_4: "/assets/4.mp3",
	audio_clip_5: "/assets/5.mp3",
	audio_clip_6: "/assets/6.np3",
};

const SoundPuzzle = () => {
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);
	const sound = useAppSelector((state) => state.soundPuzzle);
	const player = useAppSelector((state) => state.player);
	const config = useAppSelector((state) => state.editor);
	const dispatch = useAppDispatch();
	const state = useAppSelector((state) => state.status);

	const seederParams = [
		{
			moduleName: "sound",
			className: "Sound",
			params: sound.params,
			file: SoundPuzzleModule,
			dispatch: updateSoundParams,
		},
	];
	const [isPlaying, setIsPlaying] = useState(false);

	const playAudioRecordings = (audioFiles: string[]) => {
		if (isPlaying) {
			return;
		}

		for (let i = 0; i < audioFiles.length; i++) {
			if (
				!state.inventory ||
				!state.inventory.find((ele) => ele[0] == audioFiles[i])
			) {
				dispatch(
					updateSoundParams({
						audioFiles: [],
						play: 0,
						inventory: sound.params.inventory,
					})
				);
				setIsPlaying(false);
				return;
			}
		}

		setIsPlaying(true);

		let currentIndex = 0;

		function playNext() {
			if (currentIndex < audioFiles.length) {
				if (state.inventory) {
					if (
						state.inventory.find((ele) => ele[0] == audioFiles[currentIndex])
					) {
						const audio = new Audio(hashmap[audioFiles[currentIndex]]);
						audio.play();
						audio.addEventListener("ended", () => {
							currentIndex++;
							playNext();
						});
					}
				}
			} else {
				// Reset the play state when all audio files are played
				dispatch(
					updateSoundParams({
						audioFiles: [],
						play: 0,
						inventory: sound.params.inventory,
					})
				);
				setIsPlaying(false);
			}
		}

		playNext();
	};
	useEffect(() => {
		if (sound.params.play) {
			playAudioRecordings(sound.params.audioFiles);
		}
	}, [sound]);

	// const defaultInput = `'''Class:Sound\nadd_sound(param) - adds audio files to be played,\nremove_sound - removes audio files from array\nplay_audio() - plays audio files in order'''`;
	const defaultInput = `# Object: Sound\n# play_audio() - function to play multiple audio files in the order of their addition. \n#\t\t\t - per execution the audio file is played only at the last time it is called \n# add_sound("audio_clip_name") - adds audio files to list of files to be played\n# remove_sound("audio_clip_name") - removes the specified audio file from list of audio files to be played\n`;

	useEffect(() => {
		setInitialize(true);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === "e") {
				if (!config.isOpen) {
					dispatch(toggleEditor());
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dispatch, config.isOpen]);

	useEffect(() => {
		setInitialize(true);
	}, []);

	return (
		<>
			<BackBtn />
			{player.inventoryOpen && <Inventory />}
			{sound.isHintBoxOpen && (
				<InfoBox
					text="Music in order is harmony to ears. A quartet is what we seek. Drop the off key notes in the symphony and order the notes in the to fit the tune."
					onClose={() => {
						dispatch(toggleHintBox());
					}}
				/>
			)}
			{!sound.isHintBoxOpen && (
				<div
					onClick={() => {
						dispatch(toggleHintBox());
					}}
					className="absolute hover:scale-105 bg-tutorialUiBlue text-white cursor-pointer  flex justify-center items-center top-[65px] left-5 w-[130px] px-4 py-1 font-pixelifySans rounded-full"
				>
					Hint
				</div>
			)}
			{sound.isPortalKeyOpen && <PasskeyBox />}
			{!initialize && (
				<div className="flex justify-center items-center h-[100vh]">
					<Loader size={100} />
				</div>
			)}
			<ReactPy seederParams={seederParams} defaultInput={defaultInput} />
			<IonPhaser
				ref={gameRef}
				game={phaserConfig}
				initialize={initialize}
				placeholder={"Sound Game"}
			/>
		</>
	);
};

export default SoundPuzzle;
