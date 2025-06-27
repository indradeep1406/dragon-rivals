import * as supFunc from "../sup_func";

export function createCharacters(
    component: HTMLElement,
    container: HTMLElement
) {
    component.style.backgroundImage = "url('assets/BkgGameplay.png')";
    component.style.backgroundSize = "190% 106.7%";
    component.style.backgroundPosition = "center";
    component.style.backgroundRepeat = "no-repeat";

    if (
        localStorage.getItem("drg_hero") === null ||
        localStorage.getItem("drg_hero") === undefined ||
        localStorage.getItem("drg_hero") === ""
    ) {
        localStorage.setItem("drg_hero", "hero1");
    }

    let heroes: Array<string> = [];
    if (
        localStorage.getItem("drg_chars") === null ||
        localStorage.getItem("drg_chars") === undefined ||
        localStorage.getItem("drg_chars") === ""
    ) {
        localStorage.setItem("drg_chars", "1");
        heroes = ["1"];
    } else {
        heroes = localStorage.getItem("drg_chars")!.split(",");
    }

    if (
        localStorage.getItem("drg_coins") === null ||
        localStorage.getItem("drg_coins") === undefined ||
        localStorage.getItem("drg_coins") === ""
    ) {
        localStorage.setItem("drg_coins", "0");
    }

    let home_button = supFunc.insertImage(
        "home_button",
        "assets/HomeBtn.png",
        25,
        16.67,
        50,
        260,
        1,
        container,
        component
    );

    let header = supFunc.insertImage(
        "header",
        "assets/BkgHeader.png",
        100,
        10,
        50,
        -330,
        1,
        container,
        component
    );

    let coins_image = supFunc.insertImage(
        "coins_image",
        "assets/Coins.png",
        15,
        12,
        0,
        -130,
        1,
        container,
        component
    );
    coins_image.style.pointerEvents = "none";

    let scroller_backdrop = document.createElement("div");
    scroller_backdrop.id = "scroller_backdrop";
    scroller_backdrop.style.position = "absolute";
    scroller_backdrop.style.width = `${+container.style.width.replace(
        "px",
        ""
    )}px`;
    scroller_backdrop.style.left = `${
        +container.style.left.replace("px", "") +
        +container.style.width.replace("px", "") / 2 -
        +scroller_backdrop.style.width.replace("px", "") / 2
    }px`;
    scroller_backdrop.style.height = `${
        +container.style.height.replace("px", "") * 0.4
    }px`;
    scroller_backdrop.style.top = `${
        +container.style.top.replace("px", "") +
        +container.style.height.replace("px", "") * 0.36
    }px`;
    scroller_backdrop.style.zIndex = "1";
    scroller_backdrop.style.whiteSpace = "nowrap";
    scroller_backdrop.style.overflowX = "auto";
    scroller_backdrop.style.overflowY = "auto";

    component.appendChild(scroller_backdrop);

    let black_overlay = document.createElement("div");
    black_overlay.id = "black_overlay";
    black_overlay.style.position = "absolute";
    black_overlay.style.backgroundImage = "url('assets/BkgGameplay.png')";
    black_overlay.style.backgroundSize = "190% 2134%";
    black_overlay.style.backgroundPositionX = "50%";
    black_overlay.style.backgroundPositionY = "75%";
    black_overlay.style.width = component.style.width;
    black_overlay.style.height = `${
        (+component.style.height.replace("px", "") * 5) / 100
    }px`;
    black_overlay.style.top = `${
        +component.style.top.replace("px", "") +
        (+component.style.height.replace("px", "") * 73) / 100
    }px`;
    black_overlay.style.left = `${
        +component.style.left.replace("px", "") +
        +component.style.width.replace("px", "") / 2 -
        +black_overlay.style.width.replace("px", "") / 2
    }px`;
    black_overlay.style.zIndex = "10";
    black_overlay.style.pointerEvents = "none";

    component.appendChild(black_overlay);

    let char1_image = document.createElement("div");
    char1_image.id = "char1_image";
    char1_image.style.width = `${
        +component.style.width.replace("px", "") * 0.4
    }px`;
    char1_image.style.height = `${
        +component.style.height.replace("px", "") * 0.36
    }px`;
    char1_image.style.backgroundImage = "url('assets/card_bg.png')";
    char1_image.style.backgroundSize = "100% 100%";
    char1_image.style.backgroundPosition = "center";
    char1_image.style.backgroundRepeat = "no-repeat";
    char1_image.style.zIndex = "2";
    char1_image.style.display = "inline-block";
    char1_image.style.margin = "2%";
    char1_image.style.justifyContent = "center";
    scroller_backdrop.appendChild(char1_image);

    let char1_hero_image = document.createElement("div");
    char1_hero_image.id = "char1_hero_image";
    char1_hero_image.style.width = "80%";
    char1_hero_image.style.height = "60%";
    char1_hero_image.style.position = "relative";
    char1_hero_image.style.left = "9%";
    char1_hero_image.style.top = "19%";
    char1_hero_image.style.backgroundImage = "url('assets/hero1.png')";
    char1_hero_image.style.backgroundSize = "100% 100%";
    char1_hero_image.style.backgroundPosition = "center";
    char1_hero_image.style.backgroundRepeat = "no-repeat";
    char1_hero_image.style.zIndex = "3";
    char1_hero_image.style.pointerEvents = "none";
    char1_image.appendChild(char1_hero_image);

    let char2_image = document.createElement("div");
    char2_image.id = "char2_image";
    char2_image.style.width = `${
        +component.style.width.replace("px", "") * 0.4
    }px`;
    char2_image.style.height = `${
        +component.style.height.replace("px", "") * 0.36
    }px`;
    char2_image.style.backgroundImage = "url('assets/card_bg.png')";
    char2_image.style.backgroundSize = "100% 100%";
    char2_image.style.backgroundPosition = "center";
    char2_image.style.backgroundRepeat = "no-repeat";
    char2_image.style.zIndex = "2";
    char2_image.style.display = "inline-block";
    char2_image.style.margin = "2%";
    scroller_backdrop.appendChild(char2_image);

    let char2_hero_image = document.createElement("div");
    char2_hero_image.id = "char2_hero_image";
    char2_hero_image.style.width = "100%";
    char2_hero_image.style.height = "70%";
    char2_hero_image.style.position = "relative";
    char2_hero_image.style.left = "1%";
    char2_hero_image.style.top = "13%";
    char2_hero_image.style.backgroundImage = "url('assets/hero2.png')";
    char2_hero_image.style.backgroundSize = "100% 100%";
    char2_hero_image.style.backgroundPosition = "center";
    char2_hero_image.style.backgroundRepeat = "no-repeat";
    char2_hero_image.style.zIndex = "3";
    char2_hero_image.style.pointerEvents = "none";
    char2_image.appendChild(char2_hero_image);

    let char3_image = document.createElement("div");
    char3_image.id = "char3_image";
    char3_image.style.width = `${
        +component.style.width.replace("px", "") * 0.4
    }px`;
    char3_image.style.height = `${
        +component.style.height.replace("px", "") * 0.36
    }px`;
    char3_image.style.backgroundImage = "url('assets/card_bg.png')";
    char3_image.style.backgroundSize = "100% 100%";
    char3_image.style.backgroundPosition = "center";
    char3_image.style.backgroundRepeat = "no-repeat";
    char3_image.style.zIndex = "3";
    char3_image.style.display = "inline-block";
    char3_image.style.margin = "2%";
    scroller_backdrop.appendChild(char3_image);

    let char3_hero_image = document.createElement("div");
    char3_hero_image.id = "char3_hero_image";
    char3_hero_image.style.width = "60%";
    char3_hero_image.style.height = "50%";
    char3_hero_image.style.position = "relative";
    char3_hero_image.style.left = "20%";
    char3_hero_image.style.top = "23%";
    char3_hero_image.style.backgroundImage = "url('assets/hero3.png')";
    char3_hero_image.style.backgroundSize = "100% 100%";
    char3_hero_image.style.backgroundPosition = "center";
    char3_hero_image.style.backgroundRepeat = "no-repeat";
    char3_hero_image.style.zIndex = "3";
    char3_hero_image.style.pointerEvents = "none";
    char3_image.appendChild(char3_hero_image);

    let char4_image = document.createElement("div");
    char4_image.id = "char4_image";
    char4_image.style.width = `${
        +component.style.width.replace("px", "") * 0.4
    }px`;
    char4_image.style.height = `${
        +component.style.height.replace("px", "") * 0.36
    }px`;
    char4_image.style.backgroundImage = "url('assets/card_bg.png')";
    char4_image.style.backgroundSize = "100% 100%";
    char4_image.style.backgroundPosition = "center";
    char4_image.style.backgroundRepeat = "no-repeat";
    char4_image.style.zIndex = "3";
    char4_image.style.display = "inline-block";
    char4_image.style.margin = "2%";
    scroller_backdrop.appendChild(char4_image);

    let char4_hero_image = document.createElement("div");
    char4_hero_image.id = "char4_hero_image";
    char4_hero_image.style.width = "85%";
    char4_hero_image.style.height = "65%";
    char4_hero_image.style.position = "relative";
    char4_hero_image.style.left = "6%";
    char4_hero_image.style.top = "10%";
    char4_hero_image.style.backgroundImage = "url('assets/hero4.png')";
    char4_hero_image.style.backgroundSize = "100% 100%";
    char4_hero_image.style.backgroundPosition = "center";
    char4_hero_image.style.backgroundRepeat = "no-repeat";
    char4_hero_image.style.zIndex = "3";
    char4_hero_image.style.pointerEvents = "none";
    char4_image.appendChild(char4_hero_image);

    let char5_image = document.createElement("div");
    char5_image.id = "char5_image";
    char5_image.style.width = `${
        +component.style.width.replace("px", "") * 0.4
    }px`;
    char5_image.style.height = `${
        +component.style.height.replace("px", "") * 0.36
    }px`;
    char5_image.style.backgroundImage = "url('assets/card_bg.png')";
    char5_image.style.backgroundSize = "100% 100%";
    char5_image.style.backgroundPosition = "center";
    char5_image.style.backgroundRepeat = "no-repeat";
    char5_image.style.zIndex = "3";
    char5_image.style.display = "inline-block";
    char5_image.style.margin = "2%";
    scroller_backdrop.appendChild(char5_image);

    let char5_hero_image = document.createElement("div");
    char5_hero_image.id = "char5_hero_image";
    char5_hero_image.style.width = "70%";
    char5_hero_image.style.height = "53%";
    char5_hero_image.style.position = "relative";
    char5_hero_image.style.left = "15%";
    char5_hero_image.style.top = "22%";
    char5_hero_image.style.backgroundImage = "url('assets/hero5.png')";
    char5_hero_image.style.backgroundSize = "100% 100%";
    char5_hero_image.style.backgroundPosition = "center";
    char5_hero_image.style.backgroundRepeat = "no-repeat";
    char5_hero_image.style.zIndex = "3";
    char5_hero_image.style.pointerEvents = "none";
    char5_image.appendChild(char5_hero_image);

    let char6_image = document.createElement("div");
    char6_image.id = "char6_image";
    char6_image.style.width = `${
        +component.style.width.replace("px", "") * 0.4
    }px`;
    char6_image.style.height = `${
        +component.style.height.replace("px", "") * 0.36
    }px`;
    char6_image.style.backgroundImage = "url('assets/card_bg.png')";
    char6_image.style.backgroundSize = "100% 100%";
    char6_image.style.backgroundPosition = "center";
    char6_image.style.backgroundRepeat = "no-repeat";
    char6_image.style.zIndex = "3";
    char6_image.style.display = "inline-block";
    char6_image.style.margin = "2%";
    scroller_backdrop.appendChild(char6_image);

    let char6_hero_image = document.createElement("div");
    char6_hero_image.id = "char6_hero_image";
    char6_hero_image.style.width = "70%";
    char6_hero_image.style.height = "55%";
    char6_hero_image.style.position = "relative";
    char6_hero_image.style.left = "15%";
    char6_hero_image.style.top = "22%";
    char6_hero_image.style.backgroundImage = "url('assets/hero6.png')";
    char6_hero_image.style.backgroundSize = "100% 100%";
    char6_hero_image.style.backgroundPosition = "center";
    char6_hero_image.style.backgroundRepeat = "no-repeat";
    char6_hero_image.style.zIndex = "3";
    char6_hero_image.style.pointerEvents = "none";
    char6_image.appendChild(char6_hero_image);

    var font = new FontFace("CustomFont", "url(assets/Comfortaa-Bold.ttf)");
    font.load().then(function (loaded_face) {
        document.fonts.add(loaded_face);

        let characters_text = supFunc.insertText(
            "characters_text",
            "Characters",
            "yellow",
            7,
            100,
            50,
            50,
            15,
            2,
            container,
            component
        );
        characters_text.style.fontFamily = "CustomFont";

        let coins: string = localStorage.getItem("drg_coins") || "0";
        let coins_text = supFunc.insertText(
            "coins_text",
            coins,
            "yellow",
            5,
            100,
            50,
            57,
            51,
            2,
            container,
            component
        );
        coins_text.style.fontFamily = "CustomFont";
        coins_text.style.pointerEvents = "none";

        let char2_text = supFunc.insertText(
            "char2_text",
            "<img src='assets/coins.png' style='width:50%'>100",
            "yellow",
            5.25,
            30,
            2,
            20,
            50,
            4,
            container,
            char2_image
        );
        char2_text.style.fontFamily = "CustomFont";
        char2_text.style.display = "flex";
        char2_text.style.alignItems = "center";
        char2_text.style.pointerEvents = "none";
        char2_text.style.position = "absolute";
        char2_text.style.top = "77%";
        char2_text.style.left = "10%";

        let char3_text = supFunc.insertText(
            "char3_text",
            "<img src='assets/coins.png' style='width:50%'>200   ",
            "yellow",
            5.25,
            30,
            2,
            0,
            50,
            4,
            container,
            char3_image
        );
        char3_text.style.fontFamily = "CustomFont";
        char3_text.style.display = "flex";
        char3_text.style.alignItems = "center";
        char3_text.style.pointerEvents = "none";
        char3_text.style.position = "absolute";
        char3_text.style.top = "77%";
        char3_text.style.left = "10%";

        let char4_text = supFunc.insertText(
            "char4_text",
            "<img src='assets/coins.png' style='width:50%'>300   ",
            "yellow",
            5.25,
            30,
            2,
            20,
            50,
            4,
            container,
            char4_image
        );
        char4_text.style.fontFamily = "CustomFont";
        char4_text.style.display = "flex";
        char4_text.style.alignItems = "center";
        char4_text.style.pointerEvents = "none";
        char4_text.style.position = "absolute";
        char4_text.style.top = "77%";
        char4_text.style.left = "10%";

        let char5_text = supFunc.insertText(
            "char5_text",
            "<img src='assets/coins.png' style='width:50%'>400   ",
            "yellow",
            5.25,
            30,
            2,
            20,
            50,
            4,
            container,
            char5_image
        );
        char5_text.style.fontFamily = "CustomFont";
        char5_text.style.display = "flex";
        char5_text.style.alignItems = "center";
        char5_text.style.pointerEvents = "none";
        char5_text.style.position = "absolute";
        char5_text.style.top = "77%";
        char5_text.style.left = "10%";

        let char6_text = supFunc.insertText(
            "char6_text",
            "<img src='assets/coins.png' style='width:50%'>500   ",
            "yellow",
            5.25,
            30,
            2,
            20,
            50,
            4,
            container,
            char6_image
        );
        char6_text.style.fontFamily = "CustomFont";
        char6_text.style.display = "flex";
        char6_text.style.alignItems = "center";
        char6_text.style.pointerEvents = "none";
        char6_text.style.position = "absolute";
        char6_text.style.top = "77%";
        char6_text.style.left = "10%";

        if (!heroes.includes("2")) {
            char2_image.style.filter = "brightness(0.3)";
        } else {
            char2_text.style.display = "none";
        }
        if (!heroes.includes("3")) {
            char3_image.style.filter = "brightness(0.3)";
        } else {
            char3_text.style.display = "none";
        }
        if (!heroes.includes("4")) {
            char4_image.style.filter = "brightness(0.3)";
        } else {
            char4_text.style.display = "none";
        }
        if (!heroes.includes("5")) {
            char5_image.style.filter = "brightness(0.3)";
        } else {
            char5_text.style.display = "none";
        }
        if (!heroes.includes("6")) {
            char6_image.style.filter = "brightness(0.3)";
        } else {
            char6_text.style.display = "none";
        }

        if (localStorage.getItem("drg_hero") == "hero1") {
            char1_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
        } else if (localStorage.getItem("drg_hero") == "hero2") {
            char2_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
        } else if (localStorage.getItem("drg_hero") == "hero3") {
            char3_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
        } else if (localStorage.getItem("drg_hero") == "hero4") {
            char4_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
        } else if (localStorage.getItem("drg_hero") == "hero5") {
            char5_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
        } else if (localStorage.getItem("drg_hero") == "hero6") {
            char6_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
        }
    });
}
