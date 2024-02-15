import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { toggleEditor } from "@slices/index";
import { phaserConfig } from "@phaserGame/game";
import PasskeyBox from "../../../components/SoundPuzzle/PasskeyBox";
import { InfoBox, ReactPy, Inventory, BackBtn } from "@components/index";
import audiobox from "../../../assets/audiobox.svg";
import {
	toggleHintBox,
	updateSoundParams,
} from "@slices/SoundPuzzle/soundPuzzle";
import SoundPuzzleModule from "@modules/SoundPuzzle.txt";
import CompletionPopUp from "../../../components/CompletionPopUp";
import { setScene } from "@slices/Scene/scene";
import { useNavigate } from "react-router-dom";
import { getClipsOrder } from "@slices/SoundPuzzle/soundPuzzleActions";
const hashmap: { [key: string]: string } = {
	audio_clip_1: "/assets/1.mp3",
	audio_clip_2: "/assets/2.mp3",
	audio_clip_3: "/assets/3.mp3",
	audio_clip_4: "/assets/4.mp3",
	audio_clip_5: "/assets/5.mp3",
	audio_clip_6: "/assets/6.np3",
};

const SoundPuzzle = ({
	switchScene,
}: {
	switchScene: (key: string) => void;
}) => {
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);
	const sound = useAppSelector((state) => state.soundPuzzle);
	const [totalScore, setTotalScore] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const status = useAppSelector((state) => state.status);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
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
	let storedScene = localStorage.getItem("scene");
	if (storedScene == null) {
		localStorage.setItem("scene", "Lobby");
		storedScene = "Lobby";
	}

	useEffect(()=>{
		dispatch(getClipsOrder()).then(res=>{
			console.log(res);
			if(res.type.includes("/getClipsOrder/rejected")){
				switchScene("Lobby");
			}
		})
	})

	const [isPlaying, setIsPlaying] = useState(false);
	const [map, setMap] = useState(storedScene);
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
		// Check if sound.params.play is true
		if (sound.params.play) {
			// Call the function to play audio recordings
			playAudioRecordings(sound.params.audioFiles);
		}
		// You can add cleanup code here if needed

		// Note: If playAudioRecordings returns a cleanup function (e.g., for stopping playback), you can use it in the return statement of useEffect.
	}, [sound.params.play, sound.params.audioFiles]);

	// const defaultInput = `'''Class:Sound\nadd_sound(param) - adds audio files to be played,\nremove_sound - removes audio files from array\nplay_audio() - plays audio files in order'''`;
	const defaultInput = `# Object: Sound\n# play_audio() - function to play multiple audio files in the order of their addition. \n# add_sound("audio_clip_name") - adds audio files to list of files to be played\n# remove_sound("audio_clip_name") - removes the specified audio file from list of audio files to be played\n`;

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
	const switchScene2 = () => {
		navigate("/game");
		localStorage.setItem("scene", "Lobby");
		dispatch(setScene("Lobby" + "Scene"));
		window.location.reload();
	};

	return (
		<>
			<BackBtn />
			{player.inventoryOpen && <Inventory />}
			{sound.isHintBoxOpen && (
				<InfoBox
					text="Music in order is harmony to ears. A quartet is what we seek. Drop the off key notes in the symphony and order the notes to fit the tune. A weapon is in your arsenal to aid you to completion. Press spacebar to use it."
					onClose={() => {
						dispatch(toggleHintBox());
					}}
				/>
			)}
			{sound.isOpenPopUp && (
				<CompletionPopUp
					title1={"Sound Puzzle"}
					title2={"Completed"}
					title3={":" + totalScore.toString()}
					title4={"(+" + score.toString() + ")"}
					onclick={switchScene}
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
			{sound.isPortalKeyOpen && (
				<PasskeyBox
					switchScene={switchScene2}
					score={score}
					setScore={setScore}
					totalScore={totalScore}
					setTotalScore={setTotalScore}
				/>
			)}
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
