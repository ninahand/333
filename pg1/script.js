document.addEventListener("DOMContentLoaded", function() {
    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            const images = data.map(item => item.image);
            const quotes = data.map(item => item.quote || "");

            const imageElement = document.querySelector(".image");
            const quoteElement = document.querySelector(".quote");

            let currentIndex = 0;
            let isScrolling = false;

            function updateImageAndQuote(index) {
                const adjustedIndex = index % images.length; // Ensure index wraps around
                imageElement.src = images[adjustedIndex];
                quoteElement.textContent = quotes[adjustedIndex];
            }

            // Initial setting
            updateImageAndQuote(currentIndex);

            window.addEventListener("wheel", function(event) {
                if (isScrolling) return; // Prevents rapid firing of scroll events

                isScrolling = true;

                if (event.deltaY > 0) {
                    // Scroll down
                    currentIndex = (currentIndex + 1) % images.length;
                } else {
                    // Scroll up
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                }

                updateImageAndQuote(currentIndex);

                // Throttle the scroll event for 300ms
                setTimeout(function() {
                    isScrolling = false;
                }, 200);
            });
        })
        .catch(error => console.error("Error loading images and quotes from JSON:", error));
});



// var winHeight = $(window).innerHeight();
// $(document).ready(function () {
//     $(".panel").height(winHeight); // Adjust to target .panel instead of .section
//     $("body").height(winHeight * $(".panel").length); // Adjust height based on panel count
// });

// window.addEventListener('resize', function () {
//     $(".panel").height($(window).innerHeight());
// });

// $(window).on('scroll', function () {
//     $(".panelCon").css('bottom', $(window).scrollTop() * -1); // Ensure you're scrolling properly
// });
