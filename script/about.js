var crsr = document.querySelector("#cursor")
document.addEventListener("mousemove", function hh(dets) {
    crsr.style.left = dets.x + "px"
    crsr.style.top = dets.y + "px"
}
)