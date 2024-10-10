document.addEventListener('wheel', function() {
    function randomNote() {
        const notes = ["C2", "D2", "E2", "F2", "G2", "A2", "B2"]; 
        return notes[Math.floor(Math.random() * notes.length)];
    }

    function newSynth(){
        const synth = new Tone.Synth({
            oscillator: {
                type: 'triangle'  
            }, 
            envelope: {
                attack: 0.5,  // Shorter attack for quicker onset
                decay: 0.2,   // Shorter decay for a snappier sound
                sustain: 0.2, // Lower sustain level to keep it subtle
                release: 2    // Release time
            }
        }).toDestination();
    
        synth.volume.value = -20;  // Lower initial volume for subtlety
        synth.triggerAttackRelease(randomNote(), "8"); 
    }
    newSynth();
});

