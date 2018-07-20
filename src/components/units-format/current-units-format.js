import unitsFormatConstants from "../../constants/units-format";

function getCurrentUnitsFormat() {
    const buttons = document.querySelectorAll(".units-format button");

    for (let i = 0; i < buttons.length; i += 1) {
        if (buttons[i].className.includes("_active")) return buttons[i].value;
    }

    return unitsFormatConstants.METRIC;
}

export default {
    getCurrentUnitsFormat,
};
