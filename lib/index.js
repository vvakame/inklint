var lib_1 = require("ikaloghub/lib"), hub = lib_1;
var emitter = lib_1.default();
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
emitter.on("error", function (e) {
    var el = document.querySelector("#error");
    el.innerText = "うまいこといってません";
});
function handler(e) {
    var el = document.querySelector("#result");
    el.innerText = JSON.stringify(e) + "\n" + el.innerText;
}
//# sourceMappingURL=index.js.map