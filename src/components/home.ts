import * as supFunc from "../sup_func";

export function createHome(component: HTMLElement, container: HTMLElement) {
    component.style.backgroundImage = "url('assets/BkgGameplay.png')";
    component.style.backgroundSize = "190% 106.7%";
    component.style.backgroundPosition = "center";
    component.style.backgroundRepeat = "no-repeat";

    if (
        localStorage.getItem("drg_level") == null ||
        localStorage.getItem("drg_level") == undefined ||
        localStorage.getItem("drg_level") == ""
    ) {
        localStorage.setItem("drg_level", "1");
    }

    let game_banner = supFunc.insertImage(
        "game_banner",
        "assets/BkgTitle.png",
        80,
        50,
        45,
        0,
        2,
        container,
        component
    );

    let play_button = supFunc.insertImage(
        "play_button",
        "assets/BtnPlay.png",
        36,
        24,
        50,
        80,
        3,
        container,
        component
    );
    play_button.style.borderRadius = "50%";

    let characters_button = supFunc.insertImage(
        "characters_button",
        "assets/characters_button.png",
        80,
        12,
        50,
        300,
        3,
        container,
        component
    );

    // Leaderboard Button - Duplicated and modified from characters_button
    let leaderboard_button = supFunc.insertImage(
        "leaderboard_button", // Changed ID
        "assets/characters_button.png", // Same asset
        80, // width
        12, // height
        50, // left
        420, // top (original 300 + estimated button height 100 + spacing 20)
        3,  // zIndex
        container,
        component
    );

    var font = new FontFace("CustomFont", "url(assets/Comfortaa-Bold.ttf)");
    font.load().then(function (loaded_face) {
        document.fonts.add(loaded_face);

        let levels_text = supFunc.insertText(
            "levels_text",
            `LEVEL: ${localStorage.getItem("drg_level")}`,
            "yellow",
            5,
            74,
            5,
            50,
            -120,
            1,
            container,
            component
        );
        levels_text.style.fontFamily = "CustomFont";
        levels_text.style.pointerEvents = "none";

        let characters_text = supFunc.insertText(
            "characters_text",
            "CHARACTERS",
            "yellow",
            5,
            74,
            5,
            50,
            638,
            1,
            container,
            component
        );
        characters_text.style.fontFamily = "CustomFont";
        characters_text.style.pointerEvents = "none";

        // Leaderboard Text - Duplicated and modified from characters_text
        let leaderboard_text = supFunc.insertText(
            "leaderboard_text", // Changed ID
            "LEADERBOARD", // Changed text
            "yellow",
            5, // fontSize
            74, // left
            5, // top
            50, // textLeft
            758, // textTop (leaderboard_button.top 420 + (characters_text.textTop 638 - characters_button.top 300))
            1, // zIndex
            container,
            component
        );
        leaderboard_text.style.fontFamily = "CustomFont";
        leaderboard_text.style.pointerEvents = "none";
    });
}
