// 👇 main script
/***
 * @param {Element} scrollTarget
 * @param {Element} labelTarget
 * @param {?Number} frequency : Number (millisecond) Control how often to do the check.
 */
function ScrollSpy(scrollTarget, labelTarget, {frequency = 500}) {

    const labelTargets = [...labelTarget.querySelectorAll(`a[href^="#"]`)]
        .map(e => {
            const m = e.href.match(/.*#(.*)/)
            if (m) {
                return [e, m[1]]
            }
            return null
        }).filter(e => e !== null)

    const hrefArray = labelTargets.map(([e, href]) => href)

    // dataArray: [{targetElem, labelElem, id}, ...]
    const dataArray = [...scrollTarget.querySelectorAll(`[id]`)].map(e => {
        if (hrefArray.includes(e.id)) {
            return [e, ...labelTargets.filter(([_, href]) => href === e.id)[0]]
        }
        return null
    }).filter(e => e !== null)

    document.addEventListener("scroll", (e) => {
        if (Date.now() - ScrollSpy.lastChangeTime < frequency) {
            return
        }
        ScrollSpy.lastChangeTime = Date.now()


        for (const [curElem, labelElem, curID] of dataArray) {
            if (
                window.scrollY >= curElem.offsetTop &&
                window.scrollY <= curElem.offsetTop + curElem.clientHeight
            ) {
                labelElem.classList.add("active")
                continue
            }
            labelElem.classList.remove("active")
        }
    })
}

ScrollSpy.lastChangeTime = 0 // Create a new attribute to keep the variable.
