const SPIN_OPTIONS = {
    lines: 11, // The number of lines to draw
    length: 8, // The length of each line
    width: 19, // The line thickness
    radius: 35, // The radius of the inner circle
    scale: 1.5, // Scales overall size of the spinner
    corners: 0.6, // Corner roundness (0..1)
    color: "#5b5bff", // CSS color or array of colors
    fadeColor: "transparent", // CSS color or array of colors
    speed: 2, // Rounds per second
    rotate: 0, // The rotation offset
    animation: "spinner-line-fade-more", // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: "spinner", // The CSS class to assign to the spinner
    top: "70%", // Top position relative to parent
    left: "50%", // Left position relative to parent
    shadow: "0 0 1px transparent", // Box-shadow for the lines
    position: "absolute", // Element positioning
};

export default {
    SPIN_OPTIONS,
};
