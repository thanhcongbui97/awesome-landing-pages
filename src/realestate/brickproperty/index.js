const RESPONSIVE_WIDTH = 1024

gsap.registerPlugin(ScrollTrigger)

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseHeaderItems = document.getElementById("collapsed-items")
const collapseBtn = document.getElementById("collapse-btn")


const dropdowns = document.querySelectorAll('.dropdown')
dropdowns.forEach(dropdown => new Dropdown(`#${dropdown.id}`))


gsap.to("#hero-image", {
    scale: 1,
    duration: 5
})


const expandingBg = document.getElementById("expanding-header-bg")

gsap.to(expandingBg, {

    height: "100%",
    duration: 3,
    scrollTrigger: {
        trigger: "#hero-section",
        // pin: true, 
        start: "50px 10px", // when the top of the trigger hits the top of the viewport
        end: "80px 50px",
        scrub: 1,
        // markers: true
    }

})

ScrollTrigger.create({
    trigger: "#hero-section",
    start: "50px 10px", // when the top of the trigger hits the top of the viewport
    end: "60px 40px",
    scrub: 1,
    // markers: true,
    onEnter: () => {
        const headerLinks = document.querySelectorAll(".header-links")

        headerLinks.forEach(e => {
            e.classList.add("header-white-bg")
        })
        if (isHeaderCollapsed){
            collapseBtn.classList.add("primary-text-color")
        }
        headerWhiteBg = true
    },
    onEnterBack: () => {
        const headerLinks = document.querySelectorAll(".header-links")

        headerLinks.forEach(e => {
            e.classList.remove("header-white-bg")
        })
        collapseBtn.classList.remove("primary-text-color")
        collapseBtn.classList.add("tw-text-white")
        headerWhiteBg = false
    }
})


const reviewContainer = document.querySelector(".review-container")
const reviewSlideShow = new SlideShow(reviewContainer, true, 10000)


function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    console.log("Colappse", isHeaderCollapsed)
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("!tw-opacity-100")
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list", "primary-text-color")
        collapseBtn.classList.add("bi-x", "tw-text-white")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("!tw-opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "tw-text-white")
        collapseBtn.classList.add("bi-list", headerWhiteBg ? "primary-text-color" : null)
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""
        
    }else{
        isHeaderCollapsed = true
        collapseBtn.classList.add("bi-list", headerWhiteBg ? "primary-text-color" : null)
    }
}

window.addEventListener("resize", responsive)

const slidingImageContainer = document.querySelector("#sliding-images")

/**
 * Contains the sliding image path
 */
const images = [
    "./assets/images/homepage/yenbai.jpg",
    "./assets/images/homepage/coloa2.jpg",
    "./assets/images/homepage/the-nelson.jpg",
    "./assets/images/homepage/danphuong.jpg",
    "./assets/images/homepage/smartcity.jpg",
    "./assets/images/homepage/coloa.jpg"
]

function addSlidingImages(img){
    
    const imageContainer = `
            <div class="tw-min-w-[350px] tw-w-[350px] tw-h-[350px] 
                        tw-overflow-clip tw-bg-black sliding-image">
                <img src="${img}" 
                        alt="" class="tw-object-cover tw-w-full tw-h-full">
            </div>
    `

    slidingImageContainer.innerHTML += imageContainer

}


images.forEach( img => addSlidingImages(img))
images.forEach( img => addSlidingImages(img))


const sliding = gsap.to(slidingImageContainer, {
    x: '-50%', // Adjust based on your actual element width to ensure it scrolls out of view
    ease: "none",
    duration: 80, // Initial duration in seconds
    repeat: -1, // Infinite loop
})


  // Event listeners for mouse hover
slidingImageContainer.addEventListener('mouseenter', () => sliding.timeScale(0.5)) // Slow down on hover
slidingImageContainer.addEventListener('mouseleave', () => sliding.timeScale(1)) // Return to original speed

