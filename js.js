// Setup Canvas
var canvas = document.getElementById('visualizer');
var canvasContext = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;

// Setup Audio Context
var audioContext = new AudioContext();
var audio = document.getElementById('audio');

var source = audioContext.createMediaElementSource(audio);
var analyser = audioContext.createAnalyser();

source.connect(analyser);
analyser.connect(audioContext.destination);

var bufferLength = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(bufferLength);

// Visualizer Settings
function Visualizer() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(frequencyData);

    var frequencyWidth = (canvas.width / bufferLength),
        frequencyHeight = 0,
        x = 15;

    for (var increment = 5; increment < bufferLength; increment++) {
        frequencyHeight = frequencyData[increment] * (canvas.height * 0.004);
        // canvasContext.fillStyle = '#8719ff';
        var BGcolors =  '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        canvasContext.fillStyle = BGcolors;
        canvasContext.fillRect(x, canvas.height - frequencyHeight, frequencyWidth, frequencyHeight);
        x += frequencyWidth + 10;








    }

    call = requestAnimationFrame(Visualizer);
}

// Default Audio Variable
var isPlaying = false;

// Start Visualizer on Load
var startVisualizer = function() {
    isPlaying = !isPlaying;
    Visualizer();
};
startVisualizer();

// Audio and Visualizer Controls
var controls = document.getElementById('controls');

controls.addEventListener('click', function() {
    isPlaying = !isPlaying;

    if (isPlaying) {
        controls.innerHTML = "<img src='icons/pause.png'>";
        controls.style.background = "#800080";
        audio.play();
        Visualizer();



    } else {
        controls.innerHTML = "<img src='icons/play.png'>";
        controls.style.background = "#150817";
        audio.pause();
        cancelAnimationFrame(call);
        canvas.height = window.innerHeight / 2;
    }
});

// Load the Audio
var request = new XMLHttpRequest();

request.open('GET', 'https://s3-us-west-2.amazonaws.com/harriscarney/audio/Foliation.mp3', true);
request.responseType = 'blob';

request.onload = function() {
    audio.src = window.URL.createObjectURL(request.response);
    console.log(request.response);
};

request.send();

// Resize Canvas on Browser Resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
});




