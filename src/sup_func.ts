export function clearLocalStorageByGameID(gameID: string) {
    for (let key in localStorage) {
        if (key.startsWith(gameID)) {
            localStorage.removeItem(key);
        }
    }
}

export function clearChildren(element: HTMLElement) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

export function clearScreen() {
    clearChildren(document.getElementById("canvas") as HTMLElement);
}

export function insertImage(
    id: string,
    image_path: string,
    width: number,
    height: number,
    pos_x: number,
    pos_y: number,
    z_index: number,
    container: HTMLElement,
    component: HTMLElement
) {
    let image = document.createElement("div");
    image.id = id;
    image.style.width = `${(container.clientWidth * width) / 100}px`;
    image.style.height = `${(container.clientHeight * height) / 100}px`;
    image.style.backgroundImage = `url('${image_path}')`;
    image.style.backgroundSize = "100% 100%";
    image.style.backgroundRepeat = "no-repeat";
    image.style.position = "absolute";
    image.style.left = `${
        +component.style.left.replace("px", "") +
        +component.style.width.replace("px", "") * 0.5 -
        +image.style.width.replace("px", "") * (1 - pos_x / 100)
    }px`;
    image.style.top = `${
        +component.style.top.replace("px", "") +
        +component.style.height.replace("px", "") * 0.5 -
        +image.style.height.replace("px", "") * (1 - pos_y / 100)
    }px`;
    image.style.zIndex = `${z_index}`;

    component.appendChild(image);

    return image;
}

export function updatePosition(
    element: HTMLElement,
    pos_x: number,
    pos_y: number,
    container: HTMLElement,
    component: HTMLElement
) {
    element.style.left = `${
        +component.style.left.replace("px", "") +
        +component.style.width.replace("px", "") * 0.5 -
        +element.style.width.replace("px", "") * (1 - pos_x / 100)
    }px`;
    element.style.top = `${
        +component.style.top.replace("px", "") +
        +component.style.height.replace("px", "") * 0.5 -
        +element.style.height.replace("px", "") * (1 - pos_y / 100)
    }px`;
}

export function insertText(
    id: string,
    text: string,
    color: string,
    font_size: number,
    width: number,
    height: number,
    pos_x: number,
    pos_y: number,
    z_index: number,
    container: HTMLElement,
    component: HTMLElement
) {
    let text_element = document.createElement("div");
    text_element.id = id;
    text_element.innerHTML = text;
    text_element.style.display = "block";
    text_element.style.position = "absolute";
    text_element.style.textAlign = "center";
    text_element.style.fontSize = `${
        (container.clientHeight * font_size) / 100
    }px`;
    text_element.style.color = color;
    text_element.style.width = `${(container.clientWidth * width) / 100}px`;
    text_element.style.height = `${(container.clientHeight * height) / 100}px`;
    text_element.style.left = `${
        +component.style.left.replace("px", "") +
        +component.style.width.replace("px", "") * 0.5 -
        +text_element.style.width.replace("px", "") * (1 - pos_x / 100)
    }px`;
    text_element.style.top = `${
        +component.style.top.replace("px", "") +
        +component.style.height.replace("px", "") * 0.5 -
        +text_element.style.height.replace("px", "") * (1 - pos_y / 100)
    }px`;
    text_element.style.zIndex = `${z_index}`;
    text_element.style.pointerEvents = "none";

    component.appendChild(text_element);

    return text_element;
}

export function setPosition(
    element: HTMLElement,
    width: number,
    height: number,
    parent: HTMLElement
) {
    element.style.left = `${(
        parseFloat(parent.style.left) +
        Math.floor(
            (width * parseInt(parent.style.width)) / 100 -
                parseInt(element.style.width) / 2
        )
    ).toString()}px`;
    element.style.top = `${(
        parseFloat(parent.style.top) +
        Math.floor(
            (height * parseInt(parent.style.height)) / 100 -
                parseInt(element.style.height) / 2
        )
    ).toString()}px`;
}

export function setDimensions(
    element: HTMLElement,
    width_p: number,
    height_p: number,
    width: number,
    height: number
) {
    element.style.width = `
        ${(width * width_p) / 100}px
    `;
    element.style.height = `
        ${(height * height_p) / 100}px
    `;
}
