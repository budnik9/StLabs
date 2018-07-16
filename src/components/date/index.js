const dateOptions = Object.freeze({
    year: "numeric",
    month: "short",
    day: "numeric",
});

class DateComponent {
    static render(parentElement = document.querySelector(".options-container")) {
        const date = document.createElement("span");

        date.className = "date";
        date.textContent = new Date().toLocaleDateString("en-US", dateOptions);

        parentElement.appendChild(date);
    }
}

export default DateComponent;
