export const hero_values: {
    [key: string]: {
        character_sheet: string;
        x: number;
        y: number;
        x_rad_o: number;
        y_rad_o: number;
        x_rad_i: number;
        y_rad_i: number;
        img_width: number;
        img_height: number;
        width: number;
        height: number;
        left: number;
        top: number;
        h_space: number;
        v_space: number;
        imgs: number;
        x_len: number;
        y_len: number;
    };
} = {
    hero1: {
        character_sheet: "assets/hero1_sheet.png",
        x: 9,
        y: 7,
        x_rad_o: 403,
        y_rad_o: 345,
        x_rad_i: 285,
        y_rad_i: 245,
        img_width: 4096,
        img_height: 512,
        width: 391,
        height: 450,
        left: 68,
        top: 70,
        h_space: 103,
        v_space: 86,
        imgs: 9,
        x_len: 9,
        y_len: 1,
    },
    hero2: {
        character_sheet: "assets/hero2_sheet.png",
        x: 10,
        y: 7,
        x_rad_o: 355,
        y_rad_o: 338,
        x_rad_i: 263,
        y_rad_i: 253,
        img_width: 1409,
        img_height: 1559,
        width: 185,
        height: 210,
        left: 33,
        top: 25,
        h_space: 345,
        v_space: 90,
        imgs: 16,
        x_len: 3,
        y_len: 6,
    },
    hero3: {
        character_sheet: "assets/hero3_sheet.png",
        x: 7.3,
        y: 5,
        x_rad_o: 488,
        y_rad_o: 475,
        x_rad_i: 360,
        y_rad_i: 350,
        img_width: 1958,
        img_height: 559,
        width: 163,
        height: 187,
        left: 0,
        top: 0,
        h_space: 192,
        v_space: 93,
        imgs: 18,
        x_len: 6,
        y_len: 3,
    },
    hero4: {
        character_sheet: "assets/hero4_sheet.png",
        x: 10,
        y: 7,
        x_rad_o: 366,
        y_rad_o: 350,
        x_rad_i: 255,
        y_rad_i: 240,
        img_width: 1770,
        img_height: 1830,
        width: 188,
        height: 219,
        left: 47,
        top: 14,
        h_space: 470,
        v_space: 127,
        imgs: 16,
        x_len: 3,
        y_len: 6,
    },
    hero5: {
        character_sheet: "assets/hero5_sheet.png",
        x: 7.3,
        y: 5,
        x_rad_o: 488,
        y_rad_o: 475,
        x_rad_i: 360,
        y_rad_i: 350,
        img_width: 1956,
        img_height: 558,
        width: 165,
        height: 186,
        left: -2,
        top: 2,
        h_space: 191,
        v_space: 94,
        imgs: 18,
        x_len: 6,
        y_len: 3,
    },
    hero6: {
        character_sheet: "assets/hero6_sheet.png",
        x: 8,
        y: 5.5,
        x_rad_o: 450,
        y_rad_o: 437,
        x_rad_i: 325,
        y_rad_i: 315,
        img_width: 2044,
        img_height: 500,
        width: 511,
        height: 496,
        left: 0,
        top: 0,
        h_space: 170,
        v_space: 0,
        imgs: 4,
        x_len: 4,
        y_len: 1,
    },
};

export const boss_values: {
    [key: string]: {
        character_sheet: string;
        x: number;
        y: number;
        x_pos: number;
        y_pos: number;
        img_width: number;
        img_height: number;
        width: number;
        height: number;
        left: number;
        top: number;
        h_space: number;
        v_space: number;
        imgs: number;
        x_len: number;
        y_len: number;
    };
} = {
    boss1: {
        character_sheet: "assets/boss1_sheet.png",
        x: 26,
        y: 18,
        x_pos: 50,
        y_pos: 50,
        img_width: 8129,
        img_height: 512,
        width: 370,
        height: 445,
        left: 27,
        top: 300,
        h_space: 75,
        v_space: 0,
        imgs: 12,
        x_len: 12,
        y_len: 1,
    },
    boss2: {
        character_sheet: "assets/boss2_sheet.png",
        x: 16,
        y: 18,
        x_pos: 50,
        y_pos: 50,
        img_width: 1800,
        img_height: 1910,
        width: 223,
        height: 378,
        left: 0,
        top: 0,
        h_space: 290,
        v_space: 100,
        imgs: 20,
        x_len: 4,
        y_len: 5,
    },
    boss3: {
        character_sheet: "assets/boss3_sheet.png",
        x: 24,
        y: 16,
        x_pos: 50,
        y_pos: 50,
        img_width: 3234,
        img_height: 1161,
        width: 294,
        height: 382,
        left: 0,
        top: 0,
        h_space: 352.5,
        v_space: 195.5,
        imgs: 18,
        x_len: 6,
        y_len: 3,
    },
};

export const obs_values: {
    [key: string]: {
        character_sheet: string;
        size: string;
        x: number;
        y: number;
        x_rad_o: number;
        y_rad_o: number;
        x_rad_i: number;
        y_rad_i: number;
    };
} = {
    boss1: {
        character_sheet: "assets/flames_sheet.png",
        size: "600% 100%",
        x: 7,
        y: 8,
        x_rad_o: 550,
        y_rad_o: 320,
        x_rad_i: 340,
        y_rad_i: 200,
    },
    boss2: {
        character_sheet: "assets/earth_sheet.png",
        size: "700% 500%",
        x: 10,
        y: 6,
        x_rad_o: 360,
        y_rad_o: 405,
        x_rad_i: 255,
        y_rad_i: 280,
    },
    boss3: {
        character_sheet: "assets/water_sheet.png",
        size: "800% 800%",
        x: 12,
        y: 9,
        x_rad_o: 290,
        y_rad_o: 260,
        x_rad_i: 225,
        y_rad_i: 200,
    },
};
