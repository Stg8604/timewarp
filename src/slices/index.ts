export { default as DummyReducer } from "./Dummy/Dummy";
export { default as UserReducer } from "./User/User";
export { default as TutorialReducer } from "./Tutorial/tutorial";
export { default as WaterMorseReducer } from "./WaterMorse/waterMorse";
export { default as PlayerReducer } from "./Player/Player";
export { default as EditorReducer } from "./Editor/Editor";
export { default as SceneReducer } from "./Scene/scene";

export {
	loginUser,
	registerUser,
	activateUser,
	getUser,
	forgotPasswordUser,
	resetPasswordUser,
	logoutUser,
} from "./User/UserActions";

export {
	changePlayerMovementSpeed,
	changeFireballPower,
	playerSelector,
} from "./Player/Player";

export { setEditorOptions, toggleEditor } from "./Editor/Editor";
export { userSelector } from "./User/User";
export { editorSelector } from "./Editor/Editor";
