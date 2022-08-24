song1="";
song2="";
scoreLeftWrist=0;
scoreRightWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("hp.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);

    if(scoreLeftWrist>0.2){
        console.log('done');
        fill("red");
        color("red");
        circle(leftWristX,leftWristY,20);
        if(song1.isPlaying()==false && song2.isPlaying()==false){
            song1.play();
        }
        }
        if(scoreRightWrist>0.2){
            fill("red");
            color("red");
            circle(rightWristX,rightWristY,20);
            if(song1.isPlaying()==true){
                song2.play();
                song1.pause();
            }
            if(song2.isPlaying()==true){
                song1.play();
                song2.pause();
            }
            }
}
function modelLoaded(){
    console.log("MODEL LOADED");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log(leftWristX+" "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log(rightWristX+" "+rightWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log(scoreLeftWrist+"         "+scoreRightWrist);
    }
}