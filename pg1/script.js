document.addEventListener("DOMContentLoaded", function() {
    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            const images = data.map(item => item.image);
            const quotes = data.map(item => item.quote || "");
            const medals = data.map(item => item.medal || "");

            const imageElement = document.querySelector(".image");
            const quoteElement = document.querySelector(".quote");
            const medalElement = document.querySelector(".medal-container"); 

            let currentIndex = 0;
            let isScrolling = false;

            function updateImageAndQuote(index) {
                const adjustedIndex = index % images.length; 
                imageElement.src = images[adjustedIndex];
                quoteElement.textContent = quotes[adjustedIndex];
                medalElement.textContent = medals[adjustedIndex]; // Update medal content
            }

            updateImageAndQuote(currentIndex);

            window.addEventListener("wheel", function(event) {
                if (isScrolling) return; 

                isScrolling = true;

                if (event.deltaY > 0) {
                    currentIndex = (currentIndex + 1) % images.length;
                } else {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                }

                updateImageAndQuote(currentIndex);

                setTimeout(function() {
                    isScrolling = false;
                }, 1);
            });
        })
        .catch(error => console.error("Error loading images and quotes from JSON:", error));
});

document.addEventListener('wheel', function() {
    function randomNote() {
        const notes = ["C2", "D2", "E2", "F2", "G2", "A2", "B2"]; 
        return notes[Math.floor(Math.random() * notes.length)];
    }

    function newSynth(){
        const synth = new Tone.Synth({
            oscillator:{
                type: 'triangle'  
            }, 
            envelope:{
                attack: 2,      
                decay: 0.5,
                sustain: 0.3,   
                release: 3      
            }
        }).toDestination();
    
        synth.volume.value = -15;  
        synth.triggerAttackRelease(randomNote(), "8"); 
    }
    newSynth();
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
