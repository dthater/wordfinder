let field
let word = "KATZE"
let lines = [""]

document.addEventListener("DOMContentLoaded", () => {
    let playground = `<playground><field></field></playground>`
    document.body.innerHTML = playground

    field = document.querySelector("field")

    update()

    console.log("Loaded.")
})


function check() {
    lines = [...field.querySelectorAll("line")].map(t => [...t.querySelectorAll("input")].map(z => z.value.toUpperCase()).join(""))
    console.log(lines)

    if (lines.length > word.length) {
        loose()
    } else {
        let checker = lines.filter(t => t == word)
        if (checker.length) {
            won()
        } else {
            let empty = lines.filter(t => t == "")
            if (!empty.length) {
                lines.push("")
                update()
            }
        }
    }
}

function update() {
    field.innerHTML = lines
        .map(t => word.split("").map((z, i, a) => drawInput(z, i, t)).join(""))
        .map(t => `<line>${t}</line>`)
        .join("") + `<toolbar><button onclick="check()">Check</button></toolbar>`
}

function won() {
    field.innerHTML = `⭐ CONGRATE! YOU WON! ⭐`
}

function loose() {
    field.innerHTML = `⛔ GAME OVER! ⛔`
}

function drawInput(z, i, t) {
    return `<input d-state="${calcHit(z, i, t, t.charAt(i) || '')}" value="${t.charAt(i) || ''}" maxlength="1"/>`
}

function calcHit(z, i, t, c) {
    console.log(z, i, t, c)

    if (c) {
        if (word.charAt(i) == c) {
            return "hit"
        }
        if (word.indexOf(c) >= 0) {
            return "near"
        }
        if (t.length) {
            return "nope"
        }
    }
    return ""
}
