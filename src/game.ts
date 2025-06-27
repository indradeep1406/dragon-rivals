import { createComponent } from "./components";
import { clearLocalStorageByGameID } from "./sup_func";

export function startGame(type: string) {
    if (type === "new") {
        createComponent("home");
    } else {
        let location = localStorage.getItem("drg_current_location");
        if (location === "home") {
            createComponent("home");
        } else if (location === "game") {
            createComponent("game");
        } else if (location === "characters") {
            createComponent("characters");
        } else {
            console.log("error");
            clearLocalStorageByGameID("drg");
        }
    }
}
