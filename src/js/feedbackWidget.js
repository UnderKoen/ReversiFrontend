class FeedbackWidget {
    constructor(elementId) {
        this._elementId = elementId;
    }

    get elementId() {
        return this._elementId;
    }

    show(message, type) {
        const x = document.getElementById(this._elementId);
        x.querySelector("p").innerText = message;
        x.className = `alert alert-${type}`;
        x.style.display = "block";

        this.log({message, type});
    }

    hide() {
        const x = document.getElementById(this._elementId);
        x.style.display = "none";
    }

    log(message) {
        const arr = JSON.parse(localStorage.getItem("feedback_widget")) ?? [];
        if (arr.length >= 10) arr.splice(0, 1);

        arr.push(message);

        localStorage.setItem("feedback_widget", JSON.stringify(arr));
    }

    removeLog() {
        localStorage.setItem("feedback_widget", "[]")
    }

    history() {
        const arr = JSON.parse(localStorage.getItem("feedback_widget")) ?? [];

        const str = arr.map((v) => `${v.type} - ${v.message}`).join("\n");
        this.show(str, "success")
    }
}
