import { createGame } from "./components/game";
import { createHome } from "./components/home";
import { createCharacters } from "./components/characters";
import { boss_values, hero_values, obs_values } from "./sprite_values";
import { clearScreen } from "./sup_func";
import * as supFunc from "./sup_func";

export function createComponent(type: string) {
    let container = document.getElementById("canvas") as HTMLElement;
    let component = document.createElement("div");
    component.id = type;

    component.style.width = container.style.width;
    component.style.height = container.style.height;

    component.style.left = container.style.left;
    component.style.top = container.style.top;

    if (type == "home") {
        createHome(component, container);
        setTimeout(() => {
            setFunctionsHome();
        }, 0);
        localStorage.setItem("drg_current_location", "home");
    } else if (type == "game") {
        createGame(component, container);
        setTimeout(() => {
            setFunctionsGame(container, component);
        }, 0);
        localStorage.setItem("drg_current_location", "game");
    } else if (type == "characters") {
        createCharacters(component, container);
        setTimeout(() => {
            setFunctionsCharacters();
        }, 0);
        localStorage.setItem("drg_current_location", "characters");
    } else {
        console.log("error");
        supFunc.clearLocalStorageByGameID("drg");
    }

    container.appendChild(component);

    return;
}

function setFunctionsHome() {
    let play_button = document.getElementById("play_button") as HTMLElement;
    play_button.onclick = () => {
        clearScreen();
        createComponent("game");
    };

    let characters_button = document.getElementById(
        "characters_button"
    ) as HTMLElement;
    characters_button.onclick = () => {
        clearScreen();
        createComponent("characters");
    };
}

function setFunctionsGame(container: HTMLElement, component: HTMLElement) {
    window.addEventListener("keypress", startGame);
    window.addEventListener("click", startGame);

    let level = localStorage.getItem("drg_level");

    function startGame() {
        window.removeEventListener("keypress", startGame);
        window.removeEventListener("click", startGame);

        let boss_health: number;
        if (level !== null) {
            boss_health = +level + 1;
        } else {
            localStorage.setItem("drg_level", "1");
            boss_health = 2;
        }

        let life_count = 3;

        let life_image1 = document.getElementById("life_image1") as HTMLElement;
        let life_image2 = document.getElementById("life_image2") as HTMLElement;
        let life_image3 = document.getElementById("life_image3") as HTMLElement;
        let life_sprites_list: Array<HTMLElement> = [
            life_image1,
            life_image2,
            life_image3,
        ];

        let tap_to_play_text = document.getElementById(
            "tap_to_play_text"
        ) as HTMLElement;
        tap_to_play_text.style.display = "none";

        let boss_image = document.getElementById("boss_image") as HTMLElement;
        let runner_image = document.getElementById(
            "runner_image"
        ) as HTMLElement;

        let health_bar = document.getElementById("health_bar") as HTMLElement;

        let boss_posx = 0;
        let boss_posy = 0;
        let hero_posx = 0;
        let hero_posy = 0;
        let obs_posx = 0;
        let obs_posy = 0;
        let ammo_posy = 0;
        let launch_flag: boolean = false;
        let launch_element: HTMLElement;
        let launch_timer: number = 0;
        let launch_angle: number = 0;
        let ammo_angle: number = 0;

        let hero = localStorage.getItem("drg_hero")!;
        let boss = localStorage.getItem("drg_boss")!;

        let animationLoop = setInterval(() => {
            // update boss
            if (
                boss_posy * boss_values[boss].x_len + boss_posx + 1 ==
                boss_values[boss].imgs
            ) {
                boss_posx = 0;
                boss_posy = 0;
            } else {
                boss_posx += 1;
                if (boss_posx == boss_values[boss].x_len) {
                    boss_posx = 0;
                    boss_posy += 1;
                }
            }

            boss_image.style.backgroundPositionX = `${
                (boss_values[boss].left / boss_values[boss].img_width) * 100 +
                ((boss_posx * boss_values[boss].width) /
                    boss_values[boss].img_width) *
                    100 +
                ((boss_posx * boss_values[boss].h_space) /
                    boss_values[boss].img_width) *
                    100
            }%`;
            boss_image.style.backgroundPositionY = `${
                (boss_values[boss].top / boss_values[boss].img_height) * 100 +
                ((boss_posy * boss_values[boss].height) /
                    boss_values[boss].img_height) *
                    100 +
                ((boss_posy * boss_values[boss].v_space) /
                    boss_values[boss].img_height) *
                    100
            }%`;

            // update hero
            if (
                hero_posy * hero_values[hero].x_len + hero_posx + 1 ==
                hero_values[hero].imgs
            ) {
                hero_posx = 0;
                hero_posy = 0;
            } else {
                hero_posx += 1;
                if (hero_posx == hero_values[hero].x_len) {
                    hero_posx = 0;
                    hero_posy += 1;
                }
            }

            runner_image.style.backgroundPositionX = `${
                (hero_values[hero].left / hero_values[hero].img_width) * 100 +
                ((hero_posx * hero_values[hero].width) /
                    hero_values[hero].img_width) *
                    100 +
                ((hero_posx * hero_values[hero].h_space) /
                    hero_values[hero].img_width) *
                    100
            }%`;
            runner_image.style.backgroundPositionY = `${
                (hero_values[hero].top / hero_values[hero].img_height) * 100 +
                ((hero_posy * hero_values[hero].height) /
                    hero_values[hero].img_height) *
                    100 +
                ((hero_posy * hero_values[hero].v_space) /
                    hero_values[hero].img_height) *
                    100
            }%`;

            // update obstacles
            if (boss == "boss1") {
                obs_posx = (obs_posx + 1) % 6;
                for (let i = 0; i < obs_list.length; i++) {
                    if (obs_type_list[i] == "obstacle") {
                        obs_list[i].style.backgroundPositionX = `${
                            obs_posx * 20
                        }%`;
                    }
                }
            } else if (boss == "boss2") {
                if (obs_posx == 4 && obs_posy == 4) {
                    obs_posx = 0;
                    obs_posy = 0;
                } else {
                    obs_posx += 1;
                    if (obs_posx == 7) {
                        obs_posx = 0;
                        obs_posy += 1;
                    }
                }
                for (let i = 0; i < obs_list.length; i++) {
                    if (obs_type_list[i] == "obstacle") {
                        obs_list[i].style.backgroundPositionX = `${
                            obs_posx * 16.67
                        }%`;
                        obs_list[i].style.backgroundPositionY = `${
                            obs_posy * 25
                        }%`;
                    }
                }
            } else if (boss == "boss3") {
                if (obs_posx == 1 && obs_posy == 2) {
                    obs_posx = 0;
                    obs_posy = 0;
                } else {
                    obs_posx += 1;
                    if (obs_posx == 4) {
                        obs_posx = 0;
                        obs_posy += 1;
                    }
                }
                for (let i = 0; i < obs_list.length; i++) {
                    if (obs_type_list[i] == "obstacle") {
                        obs_list[i].style.backgroundPositionX = `${
                            obs_posx * 28.5 + 5.5
                        }%`;
                        obs_list[i].style.backgroundPositionY = `${
                            obs_posy * 28.5 + 10
                        }%`;
                    }
                }
            }

            // update ammo
            if (ammo_flag == true) {
                ammo_posy = (ammo_posy + 1) % 6;

                let ammo = document.getElementById("ammo") as HTMLElement;

                ammo.style.backgroundPositionY = `${ammo_posy * 16.67}%`;
            }

            // update bullet
            if (launch_flag == true) {
                launch_element.style.left = `${
                    +component.style.left.replace("px", "") +
                    +component.style.width.replace("px", "") * 0.5 -
                    (((+container.clientWidth * 9) / 100) *
                        (1 +
                            20 +
                            -Math.sin((launch_angle * Math.PI) / 180) *
                                ((300 * (5 - launch_timer)) / 6))) /
                        100
                }px`;
                launch_element.style.top = `${
                    +component.style.top.replace("px", "") +
                    +component.style.height.replace("px", "") * 0.5 -
                    (((+container.clientHeight * 6) / 100) *
                        (1 +
                            30 +
                            -Math.cos((launch_angle * Math.PI) / 180) *
                                ((300 * (5 - launch_timer)) / 6))) /
                        100
                }px`;
                launch_element.style.display = "block";

                if (launch_timer == 5) {
                    launch_timer = 0;
                    launch_flag = false;

                    component.removeChild(launch_element);

                    boss_health -= 1;
                    if (level !== null) {
                        health_bar.style.backgroundPositionX = `${
                            (-health_bar.style.width.replace("px", "") *
                                (+level + 1 - boss_health)) /
                            (+level + 1)
                        }px`;
                    } else {
                        console.log("error");
                    }

                    if (boss_health == 0) {
                        endGame("win");
                    }
                } else {
                    launch_timer += 1;
                }
            }
        }, 80);

        let region: string = "outer";
        let dir: string = "anti-clockwise";
        let time = 0;
        let time_increment =
            1 + 0.05 * (+localStorage.getItem("drg_level")! - 1);

        let coins = 0;
        let total_coins = +localStorage.getItem("drg_coins")!;

        let coins_text = document.getElementById("coins") as HTMLElement;

        let obs_list: Array<HTMLElement> = []; // list of obstacles
        let obs_pos_list: Array<number> = []; // list of obstacle positions (0 - 360)
        let obs_region_list: Array<string> = []; // list of obstacle regions (inner, outer)
        let obs_type_list: Array<string> = []; // list of obstacle types (flame, life, reverse)
        let obs_collision_flag_list: Array<boolean> = []; // list of obstacle collision flags
        let obs_pos_count = 4;
        let obs_max_count = obs_pos_count - 1;

        let life_flag: boolean = false;
        let reverse_flag: boolean = false;
        let ammo_flag: boolean = false;

        window.addEventListener("keypress", switchRegion);
        window.addEventListener("click", switchRegion);

        function switchRegion() {
            if (region == "outer") {
                region = "inner";
            } else {
                region = "outer";
            }
        }

        function reverse() {
            if (dir == "clockwise") {
                dir = "anti-clockwise";
            } else {
                dir = "clockwise";
            }

            obs_list.reverse();
            obs_pos_list.reverse();
            obs_region_list.reverse();
            obs_type_list.reverse();
            obs_collision_flag_list.reverse();
        }

        if (!localStorage.getItem("drg_rounds")) {
            localStorage.setItem("drg_rounds", "0");
        }
        let rounds = +localStorage.getItem("drg_rounds")! || 0;

        let gameLoop = setInterval(() => {
            if (dir == "clockwise") {
                time -= time_increment;
            } else {
                time += time_increment;
            }

            time_increment += 0.0001;
            if (time_increment > 2.5) {
                time_increment = 2.5;
            }

            let new_posx =
                50 +
                -Math.sin(0.025 * time) *
                    (region == "outer"
                        ? hero_values[hero].x_rad_o
                        : hero_values[hero].x_rad_i);
            let new_posy =
                50 +
                -Math.cos(0.025 * time) *
                    (region == "outer"
                        ? hero_values[hero].y_rad_o
                        : hero_values[hero].y_rad_i);
            supFunc.updatePosition(
                runner_image,
                new_posx,
                new_posy,
                container,
                component
            );

            let rotation =
                -(Math.atan2(new_posx - 50, new_posy - 50) * 180) / Math.PI +
                (region == "outer" ? 180 : 0);

            if (dir == "clockwise" && region == "outer") {
                runner_image.style.transform = `rotate(${rotation}deg) scaleX(-1)`;
            } else if (dir == "clockwise" && region == "inner") {
                runner_image.style.transform = `rotate(${rotation}deg) scaleX(1)`;
            } else if (dir == "anti-clockwise" && region == "outer") {
                runner_image.style.transform = `rotate(${rotation}deg) scaleX(1)`;
            } else if (dir == "anti-clockwise" && region == "inner") {
                runner_image.style.transform = `rotate(${rotation}deg) scaleX(-1)`;
            }

            let angle =
                (Math.atan2(new_posx - 50, new_posy - 50) * 180) / Math.PI +
                180;

            let pos = obs_pos_list[0];

            if (Math.abs(pos - angle) < 4) {
                obs_collision_flag_list[0] = true;

                if (Math.abs(pos - angle) < 3 && obs_region_list[0] == region) {
                    if (obs_type_list[0] == "life") {
                        obs_list[0].remove();
                        obs_list.splice(0, 1);
                        obs_pos_list.splice(0, 1);
                        obs_region_list.splice(0, 1);
                        obs_type_list.splice(0, 1);
                        obs_collision_flag_list.splice(0, 1);

                        coins += 5;
                        coins_text.innerHTML = coins.toString();

                        life_count = Math.min(life_count + 1, 3);
                        life_sprites_list[life_count - 1].style.display =
                            "block";

                        life_flag = false;
                    } else if (obs_type_list[0] == "reverse") {
                        obs_list[0].remove();
                        obs_list.splice(0, 1);
                        obs_pos_list.splice(0, 1);
                        obs_region_list.splice(0, 1);
                        obs_type_list.splice(0, 1);
                        obs_collision_flag_list.splice(0, 1);

                        reverse();

                        reverse_flag = false;
                    } else if (obs_type_list[0] == "obstacle") {
                        obs_list[0].remove();
                        obs_list.splice(0, 1);
                        obs_pos_list.splice(0, 1);
                        obs_region_list.splice(0, 1);
                        obs_type_list.splice(0, 1);
                        obs_collision_flag_list.splice(0, 1);

                        life_count -= 1;
                        life_sprites_list[life_count].style.display = "none";
                        if (life_count == 0) {
                            endGame("lose");
                        }
                    } else if (obs_type_list[0] == "ammo") {
                        launch_element = supFunc.insertImage(
                            "launch_element",
                            "assets/bullet.png",
                            3,
                            4,
                            0,
                            0,
                            1,
                            container,
                            component
                        );
                        launch_element.style.display = "none";
                        launch_element.style.transform = `rotate(${
                            180 - ammo_angle
                        }deg)`;
                        launch_angle = (ammo_angle + 540) % 360;
                        launch_element.style.left = `${
                            +component.style.left.replace("px", "") +
                            +component.style.width.replace("px", "") * 0.5 -
                            (((+container.clientWidth * 9) / 100) *
                                (1 +
                                    20 +
                                    -Math.sin((launch_angle * Math.PI) / 180) *
                                        300)) /
                                100
                        }px`;
                        launch_element.style.top = `${
                            +component.style.top.replace("px", "") +
                            +component.style.height.replace("px", "") * 0.5 -
                            (((+container.clientHeight * 6) / 100) *
                                (1 +
                                    30 +
                                    -Math.cos((launch_angle * Math.PI) / 180) *
                                        300)) /
                                100
                        }px`;

                        obs_list[0].remove();
                        obs_list.splice(0, 1);
                        obs_pos_list.splice(0, 1);
                        obs_region_list.splice(0, 1);
                        obs_type_list.splice(0, 1);
                        obs_collision_flag_list.splice(0, 1);

                        coins += 5;
                        coins_text.innerHTML = coins.toString();

                        ammo_flag = false;
                        launch_flag = true;
                    }

                    while (obs_list.length < obs_max_count) {
                        generateObstacle();
                    }
                }
            } else if (obs_collision_flag_list[0] == true) {
                obs_collision_flag_list[0] = false;

                if (obs_type_list[0] == "life") {
                    life_flag = false;
                } else if (obs_type_list[0] == "reverse") {
                    reverse_flag = false;
                } else if (obs_type_list[0] == "ammo") {
                    ammo_flag = false;
                }

                obs_list[0].remove();
                obs_list.splice(0, 1);
                obs_pos_list.splice(0, 1);
                obs_region_list.splice(0, 1);
                obs_type_list.splice(0, 1);
                obs_collision_flag_list.splice(0, 1);

                while (obs_list.length < obs_max_count) {
                    generateObstacle();
                }
            }
        }, 1000 / 60);

        createObstacle("obstacle", Math.random() < 0.5 ? "inner" : "outer");
        createObstacle("obstacle", Math.random() < 0.5 ? "inner" : "outer");

        function generateObstacle() {
            let type = Math.floor((Math.random() * 100) % 100);
            let region = Math.floor((Math.random() * 2) % 2);

            if (type < 8) {
                // life
                if (life_flag == false) {
                    createObstacle("life", region == 0 ? "inner" : "outer");
                    life_flag = true;
                } else {
                    createObstacle("obstacle", region == 0 ? "inner" : "outer");
                }
            } else if (type < 28) {
                // reverse
                if (reverse_flag == false) {
                    createObstacle("reverse", region == 0 ? "inner" : "outer");
                    reverse_flag = true;
                } else {
                    createObstacle("obstacle", region == 0 ? "inner" : "outer");
                }
            } else if (type < 40) {
                // ammo
                if (ammo_flag == false) {
                    createObstacle("ammo", region == 0 ? "inner" : "outer");
                    ammo_flag = true;
                } else {
                    createObstacle("obstacle", region == 0 ? "inner" : "outer");
                }
            } else {
                // obstacle
                createObstacle("obstacle", region == 0 ? "inner" : "outer");
            }
        }

        function createObstacle(type: string, region: string) {
            let obs_pos;

            if (obs_list.length == 0) {
                obs_pos = 120;
            } else {
                obs_pos =
                    (Math.round(
                        obs_pos_list[obs_list.length - 1] +
                            (dir == "clockwise"
                                ? -90
                                : 90 - 30 + Math.random() * 60)
                    ) +
                        360) %
                    360;
            }

            if (type == "life") {
                // y -> 450, 590
                // x -> 540, 700
                let element = supFunc.insertImage(
                    "life",
                    "assets/life.png",
                    5,
                    4,
                    50 +
                        -Math.sin((obs_pos * Math.PI) / 180) *
                            (region == "inner" ? 540 : 700),
                    50 +
                        -Math.cos((obs_pos * Math.PI) / 180) *
                            (region == "inner" ? 450 : 590),
                    1,
                    container,
                    component
                );
                element.style.pointerEvents = "none";
                element.style.backgroundSize = "100% 100%";
                element.style.transform = `rotate(${
                    -obs_pos + (region == "inner" ? 180 : 0)
                }deg)`;

                obs_list.push(element);
                obs_pos_list.push(obs_pos);
                obs_region_list.push(region);
                obs_type_list.push(type);
                obs_collision_flag_list.push(false);
            } else if (type == "reverse") {
                // y -> 300, 390
                // x -> 300, 390
                let element = supFunc.insertImage(
                    "reverse",
                    "assets/reverse.png",
                    9,
                    6,
                    50 +
                        -Math.sin((obs_pos * Math.PI) / 180) *
                            (region == "inner" ? 300 : 390),
                    50 +
                        -Math.cos((obs_pos * Math.PI) / 180) *
                            (region == "inner" ? 300 : 390),
                    1,
                    container,
                    component
                );
                element.style.pointerEvents = "none";
                element.style.backgroundSize = "100% 100%";
                element.style.transform = `rotate(${
                    -obs_pos + (region == "inner" ? 180 : 0)
                }deg)`;

                obs_list.push(element);
                obs_pos_list.push(obs_pos);
                obs_region_list.push(region);
                obs_type_list.push(type);
                obs_collision_flag_list.push(false);
            } else if (type == "ammo") {
                // y -> 300, 390
                // x -> 300, 390
                let element = supFunc.insertImage(
                    "ammo",
                    "assets/bullet_sheet.png",
                    9,
                    6,
                    50 +
                        -Math.sin((obs_pos * Math.PI) / 180) *
                            (region == "inner" ? 300 : 390),
                    50 +
                        -Math.cos((obs_pos * Math.PI) / 180) *
                            (region == "inner" ? 300 : 390),
                    1,
                    container,
                    component
                );
                element.style.pointerEvents = "none";
                element.style.backgroundSize = "100% 700%";
                element.style.transform = `rotate(${
                    -obs_pos + (region == "inner" ? 180 : 0)
                }deg)`;

                ammo_angle = obs_pos;

                obs_list.push(element);
                obs_pos_list.push(obs_pos);
                obs_region_list.push(region);
                obs_type_list.push(type);
                obs_collision_flag_list.push(false);
            } else if (type == "obstacle") {
                // y -> 200, 320
                // x -> 340, 550
                let element = supFunc.insertImage(
                    "obstacle",
                    obs_values[boss].character_sheet,
                    obs_values[boss].x,
                    obs_values[boss].y,
                    50 +
                        -Math.sin((obs_pos * Math.PI) / 180) *
                            (region == "inner"
                                ? obs_values[boss].x_rad_i
                                : obs_values[boss].x_rad_o),
                    50 +
                        -Math.cos((obs_pos * Math.PI) / 180) *
                            (region == "inner"
                                ? obs_values[boss].y_rad_i
                                : obs_values[boss].y_rad_o),
                    1,
                    container,
                    component
                );
                element.style.pointerEvents = "none";
                element.style.backgroundSize = obs_values[boss].size;
                element.style.transform = `rotate(${
                    -obs_pos + (region == "inner" ? 180 : 0)
                }deg)`;

                obs_list.push(element);
                obs_pos_list.push(obs_pos);
                obs_region_list.push(region);
                obs_type_list.push(type);
                obs_collision_flag_list.push(false);
            }
        }

        function endGame(type: string) {
            clearInterval(animationLoop);
            clearInterval(gameLoop);

            let gameend_backdrop = document.getElementById(
                "gameend_backdrop"
            ) as HTMLElement;
            let home_button = document.getElementById(
                "home_button"
            ) as HTMLElement;
            let next_button = document.getElementById(
                "next_button"
            ) as HTMLElement;
            let reward_coins_image = document.getElementById(
                "reward_coins_image"
            ) as HTMLElement;
            let reward_header = document.getElementById(
                "reward_header"
            ) as HTMLElement;
            let reward_coins = document.getElementById(
                "reward_coins"
            ) as HTMLElement;

            reward_header.innerHTML = `${
                type == "win" ? "You Win!" : "You Lose!"
            }`;
            reward_coins.innerHTML = `${coins}`;
            localStorage.setItem("drg_coins", `${coins + total_coins}`);

            setTimeout(() => {
                gameend_backdrop.style.display = "block";
                home_button.style.display = "block";
                reward_coins_image.style.display = "block";
                reward_header.style.display = "block";
                reward_coins.style.display = "block";

                localStorage.setItem("drg_rounds", `${rounds}`);

                let health_bar_backdrop = document.getElementById(
                    "health_bar_backdrop"
                ) as HTMLElement;
                let health_bar = document.getElementById(
                    "health_bar"
                ) as HTMLElement;
                health_bar_backdrop.style.display = "none";
                health_bar.style.display = "none";

                if (type == "win") {
                    if (boss == "boss1") {
                        localStorage.setItem("drg_boss", "boss2");
                    } else if (boss == "boss2") {
                        localStorage.setItem("drg_boss", "boss3");
                    } else if (boss == "boss3") {
                        localStorage.setItem("drg_boss", "boss1");
                    }

                    if (level !== null) {
                        localStorage.setItem("drg_level", `${+level + 1}`);
                    }

                    next_button.style.display = "block";
                    next_button.addEventListener("click", () => {
                        clearScreen();
                        createComponent("game");
                    });
                }

                home_button.addEventListener("click", () => {
                    clearScreen();
                    createComponent("home");
                });
            }, 1000);
        }
    }
}

function setFunctionsCharacters() {
    let home_button = document.getElementById("home_button") as HTMLElement;
    home_button.addEventListener("click", () => {
        clearScreen();
        createComponent("home");
    });

    let char1_image = document.getElementById("char1_image") as HTMLElement;
    let char2_image = document.getElementById("char2_image") as HTMLElement;
    let char3_image = document.getElementById("char3_image") as HTMLElement;
    let char4_image = document.getElementById("char4_image") as HTMLElement;
    let char5_image = document.getElementById("char5_image") as HTMLElement;
    let char6_image = document.getElementById("char6_image") as HTMLElement;

    char1_image.addEventListener("click", () => {
        localStorage.setItem("drg_hero", "hero1");
        char1_image.style.backgroundImage =
            "url('assets/card_bg_selected.png')";
        char2_image.style.backgroundImage = "url('assets/card_bg.png')";
        char3_image.style.backgroundImage = "url('assets/card_bg.png')";
        char4_image.style.backgroundImage = "url('assets/card_bg.png')";
        char5_image.style.backgroundImage = "url('assets/card_bg.png')";
        char6_image.style.backgroundImage = "url('assets/card_bg.png')";
    });

    let heroes = localStorage.getItem("drg_chars")?.split(",");
    let coins: number;
    if (localStorage.getItem("drg_coins") !== null) {
        coins = +localStorage.getItem("drg_coins")!;
    } else {
        coins = 0;
    }

    if (heroes?.includes("2")) {
        char2_image.addEventListener("click", () => {
            localStorage.setItem("drg_hero", "hero2");
            char1_image.style.backgroundImage = "url('assets/card_bg.png')";
            char2_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
            char3_image.style.backgroundImage = "url('assets/card_bg.png')";
            char4_image.style.backgroundImage = "url('assets/card_bg.png')";
            char5_image.style.backgroundImage = "url('assets/card_bg.png')";
            char6_image.style.backgroundImage = "url('assets/card_bg.png')";
        });
    } else {
        char2_image.addEventListener("click", () => {
            if (coins >= 100) {
                localStorage.setItem("drg_hero", "hero2");
                heroes?.push("2");
                let str = heroes?.join(",");
                localStorage.setItem("drg_chars", str!);
                char1_image.style.backgroundImage = "url('assets/card_bg.png')";
                char2_image.style.backgroundImage =
                    "url('assets/card_bg_selected.png')";
                char3_image.style.backgroundImage = "url('assets/card_bg.png')";
                char4_image.style.backgroundImage = "url('assets/card_bg.png')";
                char5_image.style.backgroundImage = "url('assets/card_bg.png')";
                char6_image.style.backgroundImage = "url('assets/card_bg.png')";
                char2_image.style.filter = "brightness(1)";

                coins -= 100;
                localStorage.setItem("drg_coins", `${coins}`);

                clearScreen();
                createComponent("characters");
            }
        });
    }

    if (heroes?.includes("3")) {
        char3_image.addEventListener("click", () => {
            localStorage.setItem("drg_hero", "hero3");
            char1_image.style.backgroundImage = "url('assets/card_bg.png')";
            char2_image.style.backgroundImage = "url('assets/card_bg.png')";
            char3_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
            char4_image.style.backgroundImage = "url('assets/card_bg.png')";
            char5_image.style.backgroundImage = "url('assets/card_bg.png')";
            char6_image.style.backgroundImage = "url('assets/card_bg.png')";
        });
    } else {
        char3_image.addEventListener("click", () => {
            if (coins >= 200) {
                localStorage.setItem("drg_hero", "hero3");
                heroes?.push("3");
                let str = heroes?.join(",");
                localStorage.setItem("drg_chars", str!);
                char1_image.style.backgroundImage = "url('assets/card_bg.png')";
                char2_image.style.backgroundImage = "url('assets/card_bg.png')";
                char3_image.style.backgroundImage =
                    "url('assets/card_bg_selected.png')";
                char4_image.style.backgroundImage = "url('assets/card_bg.png')";
                char5_image.style.backgroundImage = "url('assets/card_bg.png')";
                char6_image.style.backgroundImage = "url('assets/card_bg.png')";
                char3_image.style.filter = "brightness(1)";

                coins -= 200;
                localStorage.setItem("drg_coins", `${coins}`);

                clearScreen();
                createComponent("characters");
            }
        });
    }

    if (heroes?.includes("4")) {
        char4_image.addEventListener("click", () => {
            localStorage.setItem("drg_hero", "hero4");
            char1_image.style.backgroundImage = "url('assets/card_bg.png')";
            char2_image.style.backgroundImage = "url('assets/card_bg.png')";
            char3_image.style.backgroundImage = "url('assets/card_bg.png')";
            char4_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
            char5_image.style.backgroundImage = "url('assets/card_bg.png')";
            char6_image.style.backgroundImage = "url('assets/card_bg.png')";
        });
    } else {
        char4_image.addEventListener("click", () => {
            if (coins >= 300) {
                localStorage.setItem("drg_hero", "hero4");
                heroes?.push("4");
                let str = heroes?.join(",");
                localStorage.setItem("drg_chars", str!);
                char1_image.style.backgroundImage = "url('assets/card_bg.png')";
                char2_image.style.backgroundImage = "url('assets/card_bg.png')";
                char3_image.style.backgroundImage = "url('assets/card_bg.png')";
                char4_image.style.backgroundImage =
                    "url('assets/card_bg_selected.png')";
                char5_image.style.backgroundImage = "url('assets/card_bg.png')";
                char6_image.style.backgroundImage = "url('assets/card_bg.png')";
                char4_image.style.filter = "brightness(1)";

                coins -= 300;
                localStorage.setItem("drg_coins", `${coins}`);

                clearScreen();
                createComponent("characters");
            }
        });
    }

    if (heroes?.includes("5")) {
        char5_image.addEventListener("click", () => {
            localStorage.setItem("drg_hero", "hero5");
            char1_image.style.backgroundImage = "url('assets/card_bg.png')";
            char2_image.style.backgroundImage = "url('assets/card_bg.png')";
            char3_image.style.backgroundImage = "url('assets/card_bg.png')";
            char4_image.style.backgroundImage = "url('assets/card_bg.png')";
            char5_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
            char6_image.style.backgroundImage = "url('assets/card_bg.png')";
        });
    } else {
        char5_image.addEventListener("click", () => {
            if (coins >= 400) {
                localStorage.setItem("drg_hero", "hero5");
                heroes?.push("5");
                let str = heroes?.join(",");
                localStorage.setItem("drg_chars", str!);
                char1_image.style.backgroundImage = "url('assets/card_bg.png')";
                char2_image.style.backgroundImage = "url('assets/card_bg.png')";
                char3_image.style.backgroundImage = "url('assets/card_bg.png')";
                char4_image.style.backgroundImage = "url('assets/card_bg.png')";
                char5_image.style.backgroundImage =
                    "url('assets/card_bg_selected.png')";
                char6_image.style.backgroundImage = "url('assets/card_bg.png')";
                char5_image.style.filter = "brightness(1)";

                coins -= 400;
                localStorage.setItem("drg_coins", `${coins}`);

                clearScreen();
                createComponent("characters");
            }
        });
    }

    if (heroes?.includes("6")) {
        char6_image.addEventListener("click", () => {
            localStorage.setItem("drg_hero", "hero6");
            char1_image.style.backgroundImage = "url('assets/card_bg.png')";
            char2_image.style.backgroundImage = "url('assets/card_bg.png')";
            char3_image.style.backgroundImage = "url('assets/card_bg.png')";
            char4_image.style.backgroundImage = "url('assets/card_bg.png')";
            char5_image.style.backgroundImage = "url('assets/card_bg.png')";
            char6_image.style.backgroundImage =
                "url('assets/card_bg_selected.png')";
        });
    } else {
        char6_image.addEventListener("click", () => {
            if (coins >= 500) {
                localStorage.setItem("drg_hero", "hero6");
                heroes?.push("6");
                let str = heroes?.join(",");
                localStorage.setItem("drg_chars", str!);
                char1_image.style.backgroundImage = "url('assets/card_bg.png')";
                char2_image.style.backgroundImage = "url('assets/card_bg.png')";
                char3_image.style.backgroundImage = "url('assets/card_bg.png')";
                char4_image.style.backgroundImage = "url('assets/card_bg.png')";
                char5_image.style.backgroundImage = "url('assets/card_bg.png')";
                char6_image.style.backgroundImage =
                    "url('assets/card_bg_selected.png')";
                char6_image.style.filter = "brightness(1)";

                coins -= 500;
                localStorage.setItem("drg_coins", `${coins}`);

                clearScreen();
                createComponent("characters");
            }
        });
    }
}
