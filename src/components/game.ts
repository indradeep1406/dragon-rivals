import * as supFunc from "../sup_func";
import { hero_values, boss_values } from "../sprite_values";

export function createGame(component: HTMLElement, container: HTMLElement) {
    component.style.backgroundImage = "url('assets/GameBG.jpg')";
    component.style.backgroundSize = "100% 100%";
    component.style.backgroundRepeat = "no-repeat";

    if (!localStorage.getItem("drg_hero")) {
        localStorage.setItem("drg_hero", "hero1");
    }
    if (!localStorage.getItem("drg_boss")) {
        localStorage.setItem("drg_boss", "boss1");
    }

    if (
        localStorage.getItem("drg_coins") === null ||
        localStorage.getItem("drg_coins") === undefined ||
        localStorage.getItem("drg_coins") === ""
    ) {
        localStorage.setItem("drg_coins", "0");
    }

    if (
        localStorage.getItem("drg_level") === null ||
        localStorage.getItem("drg_level") === undefined ||
        localStorage.getItem("drg_level") === ""
    ) {
        localStorage.setItem("drg_level", "1");
    }

    let hero: string = localStorage.getItem("drg_hero")!;
    let boss: string = localStorage.getItem("drg_boss")!;

    let coins = supFunc.insertImage(
        "coins_image",
        "assets/coins.png",
        20,
        14,
        -150,
        -242,
        1,
        container,
        component
    );
    coins.style.pointerEvents = "none";

    let life_image1 = supFunc.insertImage(
        "life_image1",
        `assets/${hero}.png`,
        12,
        7,
        380,
        -540,
        1,
        container,
        component
    );
    life_image1.style.pointerEvents = "none";

    let life_image2 = supFunc.insertImage(
        "life_image2",
        `assets/${hero}.png`,
        12,
        7,
        280,
        -540,
        1,
        container,
        component
    );
    life_image2.style.pointerEvents = "none";

    let life_image3 = supFunc.insertImage(
        "life_image3",
        `assets/${hero}.png`,
        12,
        7,
        180,
        -540,
        1,
        container,
        component
    );
    life_image3.style.pointerEvents = "none";

    let runner_circle = supFunc.insertImage(
        "runner_circle",
        "assets/RunnerRing.png",
        80,
        53.33,
        50,
        50,
        1,
        container,
        component
    );
    runner_circle.style.pointerEvents = "none";

    let boss_image = supFunc.insertImage(
        "boss_image",
        boss_values[boss].character_sheet,
        39,
        26,
        50,
        50,
        1,
        container,
        component
    );
    boss_image.style.pointerEvents = "none";

    boss_image.style.width = `${
        (container.clientWidth * boss_values[boss].x) / 100
    }px`;
    boss_image.style.height = `${
        (container.clientHeight * boss_values[boss].y) / 100
    }px`;
    boss_image.style.left = `${
        +component.style.left.replace("px", "") +
        +component.style.width.replace("px", "") * 0.5 -
        +boss_image.style.width.replace("px", "") * 0.5
    }px`;
    boss_image.style.top = `${
        +component.style.top.replace("px", "") +
        +component.style.height.replace("px", "") * 0.5 -
        +boss_image.style.height.replace("px", "") * 0.5
    }px`;

    boss_image.style.backgroundSize = `${
        (boss_values[boss].img_width / boss_values[boss].width) * 100
    }% ${(boss_values[boss].img_height / boss_values[boss].height) * 100}%`;
    boss_image.style.backgroundPositionX = `${
        (boss_values[boss].left / boss_values[boss].img_width) * 100
    }%`;
    boss_image.style.backgroundPositionY = `${
        (boss_values[boss].top / boss_values[boss].img_height) * 100
    }%`;

    let runner_image = supFunc.insertImage(
        "runner_image",
        hero_values[hero].character_sheet,
        10,
        7,
        50,
        -288,
        1,
        container,
        component
    );
    runner_image.style.pointerEvents = "none";

    runner_image.style.width = `${
        (container.clientWidth * hero_values[hero].x) / 100
    }px`;
    runner_image.style.height = `${
        (container.clientHeight * hero_values[hero].y) / 100
    }px`;
    runner_image.style.left = `${
        +component.style.left.replace("px", "") +
        +component.style.width.replace("px", "") * 0.5 -
        +runner_image.style.width.replace("px", "") * 0.5
    }px`;
    runner_image.style.top = `${
        +component.style.top.replace("px", "") +
        +component.style.height.replace("px", "") * 0.5 -
        +runner_image.style.height.replace("px", "") *
            (1 - (50 - hero_values[hero].y_rad_o) / 100)
    }px`;

    runner_image.style.backgroundSize = `${
        (hero_values[hero].img_width / hero_values[hero].width) * 100
    }% ${(hero_values[hero].img_height / hero_values[hero].height) * 100}%`;
    runner_image.style.backgroundPositionX = `${
        (hero_values[hero].left / hero_values[hero].img_width) * 100
    }%`;
    runner_image.style.backgroundPositionY = `${
        (hero_values[hero].top / hero_values[hero].img_height) * 100
    }%`;

    let health_bar_backdrop = supFunc.insertImage(
        "health_bar_backdrop",
        "assets/health-bar.png",
        20,
        5,
        49,
        200,
        1,
        container,
        component
    );

    let health_bar = supFunc.insertImage(
        "health_bar",
        "assets/health.png",
        15,
        0.7,
        49.5,
        1120,
        1,
        container,
        component
    );
    health_bar.style.backgroundSize = "100% 100%";
    health_bar.style.backgroundRepeat = "no-repeat";
    health_bar.style.backgroundPositionX = "0px";

    let gameend_backdrop = document.createElement("div");
    gameend_backdrop.id = "gameend_backdrop";
    gameend_backdrop.style.width = "100%";
    gameend_backdrop.style.height = "100%";
    gameend_backdrop.style.left = "0%";
    gameend_backdrop.style.top = "0%";
    gameend_backdrop.style.position = "absolute";
    // gameend_backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    gameend_backdrop.style.backgroundImage = "url('assets/BkgGameplay.png')";
    gameend_backdrop.style.backgroundSize = "190% 106.7%";
    gameend_backdrop.style.backgroundPosition = "center";
    gameend_backdrop.style.backgroundRepeat = "no-repeat";
    gameend_backdrop.style.height =
        +component.style.height.replace("px", "") + "px";
    gameend_backdrop.style.width =
        +component.style.width.replace("px", "") + "px";
    gameend_backdrop.style.left =
        +component.style.left.replace("px", "") +
        // +component.style.width.replace("px", "") * 0.1 +
        "px";
    gameend_backdrop.style.top =
        +component.style.top.replace("px", "") +
        // +component.style.height.replace("px", "") * 0.1 +
        "px";
    gameend_backdrop.style.zIndex = "2";
    gameend_backdrop.style.display = "none";
    component.appendChild(gameend_backdrop);

    let gameend_coins = supFunc.insertImage(
        "reward_coins_image",
        "assets/coins.png",
        20,
        14,
        0,
        -15,
        3,
        container,
        component
    );
    gameend_coins.style.pointerEvents = "none";
    gameend_coins.style.display = "none";

    let home_button = supFunc.insertImage(
        "home_button",
        "assets/HomeBtn.png",
        40,
        26.67,
        50,
        150,
        3,
        container,
        component
    );
    home_button.style.display = "none";

    let next_button = supFunc.insertImage(
        "next_button",
        "assets/BtnNext.png",
        50,
        15,
        50,
        90,
        3,
        container,
        component
    );
    next_button.style.display = "none";

    var font = new FontFace("CustomFont", "url(assets/Comfortaa-Bold.ttf)");
    font.load().then(function (loaded_face) {
        document.fonts.add(loaded_face);

        let tap_to_play_text = supFunc.insertText(
            "tap_to_play_text",
            "TAP TO PLAY",
            "yellow",
            8,
            74,
            5,
            50,
            650,
            1,
            container,
            component
        );
        tap_to_play_text.style.fontFamily = "CustomFont";
        tap_to_play_text.style.pointerEvents = "none";

        let coins = supFunc.insertText(
            "coins",
            "0",
            "yellow",
            8,
            74,
            5,
            18,
            -820,
            1,
            container,
            component
        );
        coins.style.fontFamily = "CustomFont";
        coins.style.pointerEvents = "none";

        let reward_header = supFunc.insertText(
            "reward_header",
            "REWARD",
            "yellow",
            8,
            74,
            5,
            50,
            -600,
            2,
            container,
            component
        );
        reward_header.style.fontFamily = "CustomFont";
        reward_header.style.pointerEvents = "none";
        reward_header.style.display = "none";

        let reward_coins = supFunc.insertText(
            "reward_coins",
            "0",
            "yellow",
            8,
            74,
            5,
            60,
            -190,
            2,
            container,
            component
        );
        reward_coins.style.fontFamily = "CustomFont";
        reward_coins.style.pointerEvents = "none";
        reward_coins.style.display = "none";
    });
}
