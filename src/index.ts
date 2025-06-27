import { startGame } from "./game";
import { clearChildren, clearLocalStorageByGameID } from "./sup_func";

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", resizeCanvas);

const update_duration = 4000;

const canvas: HTMLElement = document.getElementById("canvas") as HTMLElement;

function resizeCanvas() {
    const container: HTMLElement = document.getElementById(
        "canvas-container"
    ) as HTMLElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const aspectRatio = 2 / 3;
    let canvasWidth, canvasHeight;

    if (containerWidth / containerHeight > aspectRatio) {
        canvasWidth = Math.floor(containerHeight * aspectRatio);
        canvasHeight = containerHeight;
    } else {
        canvasWidth = containerWidth;
        canvasHeight = Math.floor(containerWidth / aspectRatio);
    }

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    canvas.style.left = `${Math.floor(
        (containerWidth - canvasWidth) / 2
    ).toString()}px`;
    canvas.style.top = `${Math.floor(
        (containerHeight - canvasHeight) / 2
    ).toString()}px`;

    setUp();
}

setInterval(() => {
    localStorage.setItem("drg_date_time", new Date().toString());
}, 1000);

setInterval(() => {
    if (localStorage.getItem("drg_restart") === "true") {
        setUp();
    }
}, 1000);

function setUp() {
    clearChildren(canvas);
    if (
        localStorage.getItem("drg_date_time") &&
        (localStorage.getItem("drg_current_location") === "home" ||
            localStorage.getItem("drg_current_location") === "game" ||
            localStorage.getItem("drg_current_location") === "characters") &&
        localStorage.getItem("drg_sound_fx") &&
        localStorage.getItem("drg_music")
    ) {
        const lastDateTimeObj = new Date(
            localStorage.getItem("drg_date_time")!
        );
        const currentDateTimeObj = new Date();
        const diff = currentDateTimeObj.getTime() - lastDateTimeObj.getTime();

        if (diff < update_duration) {
            startGame("restore");
        } else {
            localStorage.setItem("drg_date_time", new Date().toString());
            localStorage.setItem("drg_current_location", "home");
            localStorage.setItem("drg_restart", "false");
            startGame("restore");
        }
    } else {
        clearLocalStorageByGameID("drg");

        localStorage.setItem("drg_date_time", new Date().toString());
        localStorage.setItem("drg_current_location", "home");
        localStorage.setItem("drg_restart", "false");
        localStorage.setItem("drg_sound_fx", "true");
        localStorage.setItem("drg_music", "true");

        startGame("new");
    }
}
