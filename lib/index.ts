import open, * as hub from "ikaloghub/lib";

let emitter = open();
emitter.on("on_lobby_matched", handler);
emitter.on("on_game_start", handler);
emitter.on("on_game_team_color", handler);
emitter.on("on_game_go_sign", handler);
emitter.on("on_game_dead", handler);
emitter.on("on_death_reason_identified", handler);
emitter.on("on_game_killed", handler);
emitter.on("on_game_finish", handler);
emitter.on("on_result_judge", handler);
emitter.on("on_result_detail", handler);
emitter.on("on_result_udemae", handler);
emitter.on("on_result_gears", handler);
emitter.on("on_lobby_matching", handler);
emitter.on("on_game_session_end", handler);
emitter.on("error", e => {
	let el = document.querySelector("#error") as HTMLElement;
	el.innerText = "うまいこといってません";
});

function handler(e: hub.InkEvent) {
	var el = document.querySelector("#result") as HTMLElement;
	el.innerText = JSON.stringify(e) + "\n" + el.innerText;
}
