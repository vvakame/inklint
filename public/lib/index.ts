const ikaLogUri = "ws://localhost:9090/ws";

interface InkEvent {
    event: string;
}

interface LobbyMatchedEvent extends InkEvent {
    // event = "on_lobby_matched";
    lobbyType: string; // "public" | ...
    lobbyState: string; // "matched" | ...
}
function isLobbyMatchedEvent(event: InkEvent): event is LobbyMatchedEvent {
    return event.event === "on_lobby_matched";
}

interface OnGameStartEvent extends InkEvent {
    // event = "on_game_start";
    rule: string; // "ガチヤグラ" | ...
    stage: string;
}
function isOnGameStartEvent(event: InkEvent): event is OnGameStartEvent {
    return event.event === "on_game_start";
}

interface OnGameTeamColorEvent extends InkEvent {
    // event = "on_game_team_color";
    myTeamColorHsv: number;
    counterTeamColorHsv: number;
}
function isOnGameTeamColorEvent(event: InkEvent): event is OnGameTeamColorEvent {
    return event.event === "on_game_team_color";
}

interface OnGameGoSignEvent extends InkEvent {
    // event = "on_game_go_sign";
}
function isOnGameGoSignEvent(event: InkEvent): event is OnGameGoSignEvent {
    return event.event === "on_game_go_sign";
}

interface OnGameDeadEvent extends InkEvent {
    // event = "on_game_dead";
}
function isOnGameDeadEvent(event: InkEvent): event is OnGameDeadEvent {
    return event.event === "on_game_dead";
}

interface OnDeathReasonIdentifiedEvent extends InkEvent {
    // event = "on_death_reason_identified";
    reason: string; // ブキID
}
function isOnDeathReasonIdentifiedEvent(event: InkEvent): event is OnDeathReasonIdentifiedEvent {
    return event.event === "on_death_reason_identified";
}

interface OnGameKilledEvent extends InkEvent {
    // event = "on_game_killed";
}
function isOnGameKilledEvent(event: InkEvent): event is OnGameKilledEvent {
    return event.event === "on_game_killed";
}

interface OnGameFinishEvent extends InkEvent {
    // event = "on_game_finish";
}
function isOnGameFinishEvent(event: InkEvent): event is OnGameFinishEvent {
    return event.event === "on_game_finish";
}

interface OnResultJudgeEvent extends InkEvent {
    // event = "on_result_judge";
    judge: string; // "win" | ..
    knockout: boolean;
}
function isOnResultJudgeEvent(event: InkEvent): event is OnResultJudgeEvent {
    return event.event === "on_result_judge";
}

interface OnResultDetailEvent extends InkEvent {
    // event = "on_result_detail";
    kills: number;
    deaths: number;
    rank: number;
    score: number; // ナワバリの時のみ
    udemae: string;
    weapon: string; // ブキ
    won: boolean;
}
function isOnResultDetailEvent(event: InkEvent): event is OnResultDetailEvent {
    return event.event === "on_result_detail";
}

interface OnResultUdemaeEvent extends InkEvent {
    // event = "on_result_udemae";
    udemaeStr: string;
    udemaeExp: number;
}
function isOnResultUdemaeEvent(event: InkEvent): event is OnResultUdemaeEvent {
    return event.event === "on_result_udemae";
}

interface OnResultGearsEvent extends InkEvent {
    // event = "on_result_gears";
}
function isOnResultGearsEvent(event: InkEvent): event is OnResultGearsEvent {
    return event.event === "on_result_gears";
}

interface OnLobbyMatchingEvent extends InkEvent {
    // event = "on_lobby_matching";
    lobbyType: string;
    lobbyState: string;
}
function isOnLobbyMatchingEvent(event: InkEvent): event is OnLobbyMatchingEvent {
    return event.event === "on_lobby_matching";
}

interface OnGameSessionEndEvent extends InkEvent {
    // event = "on_game_session_end";
}
function isOnGameSessionEndEvent(event: InkEvent): event is OnGameSessionEndEvent {
    return event.event === "on_game_session_end";
}

const weaponMap: { [weaponId: string]: string; } = {
    "liter3k_scope_custom": "リッター3Kカスタム",
    "hotblaster_custom": "ホットブラスターカスタム"
};

class Controller {
    ws: WebSocket;

    openWebSocket() {
        this.ws = new WebSocket(ikaLogUri);
        this.ws.onopen = ev => {

        };
        this.ws.onmessage = ev => {
            if (ev && ev.data) {
                let data: InkEvent = this.snakeObjToCamelObj(JSON.parse(ev.data));
                this.debug(data);
                this.emit(data.event, data);
            }
        };
        this.ws.onclose = ev => {
            this.ws = null;
            setTimeout(() => {
                this.openWebSocket();
            }, 3000);
        };
        this.ws.onerror = ev => {

        }
    }

    private debug(data: any) {
        console.log(data);
        let el = document.querySelector("#result");
    }

    private snakeObjToCamelObj(snake: any): any {
        if (typeof snake !== "object" || snake == null) {
            return snake;
        }
        let obj: any = {};
        Object.keys(snake).forEach(key => {
            let v = snake[key];
            obj[snakeToCamel(key)] = this.snakeObjToCamelObj(v);
        });
        return obj;

        function snakeToCamel(key: string) {
            return key.replace(/_(.)/g, (_0, _1) => _1.toUpperCase());
        }
    }

    emit(eventName: string, event: InkEvent) {
        if (isLobbyMatchedEvent(event)) {
        }
    }
}

let controller = new Controller();
controller.openWebSocket();
