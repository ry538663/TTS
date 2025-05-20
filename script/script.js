var crsr = document.querySelector("#cursor")
document.addEventListener("mousemove", function hh(dets) {
    crsr.style.left = dets.x + "px"
    crsr.style.top = dets.y + "px"
}
)

gsap.to("#nav", {
    backgroundColor: "rgba(21, 21, 22, 0.9)",
    height: "65px",
    duration: 0.5,
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        // markers: true,
        start: "top -20%",
        scrub: 1

    }

})

function dropping1(t) {
    var d=document.getElementById("ans1");
    d.classList.toggle("show");

}
function dropping2(t) {
    var d=document.getElementById("ans2");
    d.classList.toggle("show");
}
function dropping3(t) {
    var d=document.getElementById("ans3");
    d.classList.toggle("show");
}


