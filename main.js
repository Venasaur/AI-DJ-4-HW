song1 ="";
song2 ="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist= 0;
song1_status = "";
song2_status = "";
function preload()
{
    song1 = loadSound("never.mp3");
    song2 = loadSound("myperfection.mp3");
}
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('PoseNet Is Initialized')
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist" + scoreLeftWrist);
        console.log("scoreRightWrist" + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWrsitY = "+ rightWristY);
    }
}
function draw() {
    image(video,0,0,600,500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreRightWrist > 0.001){
     circle(rightWristX,rightWristY,20);
     song2.stop();
     if(song1_status == false) {
     song1.play();
     document.getElementById("song").innerHTML = "playing song1";
     }
    }
}
