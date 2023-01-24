function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

img = "";
Status = "";
objects = [];

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"; 
}

function preload() {

}

function modelLoaded() {
    console.log("modelLoaded");
    Status = true;
}

function gotResult(error, results) {
    if(error) {
    console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() 
{
    image(video, 0, 0, 380, 380);

    if(Status != " ") 
    {
        red = random(255);
        green = random(255);
        blue = random(255);

        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length;  i++) 
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: " + objects.length;
            fill(red, green, blue);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke(red, green, blue);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }

}