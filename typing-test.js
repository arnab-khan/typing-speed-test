var story_link;
var story_text;
var written_text;
var start_stop=0;
var timer;
var time_increasr=0;
var story_array;
var written_array;
var total_correct=0;
var total_incorrect=0;
var check_correct=[];

// start start_stop button
function startStop() {
    if (start_stop==0) {

        start_stop_keypress=1; //to stop keypress function start

        // start fot start button 
        document.getElementsByClassName("start_stop")[0].style.backgroundColor="red";
        document.getElementsByClassName("start_stop")[0].innerHTML="STOP";
        start_stop=1;

        document.getElementsByClassName("new_text")[0].style.boxShadow="0 0 0 0";
        document.getElementsByClassName("new_text")[0].style.borderRadius="0%";

        timer=setInterval(timer,1000); //stop timer

        // end fot start button

    }
    else if (start_stop==1) {

        document.getElementsByClassName("start_stop")[0].style.backgroundColor="#a3c2c2";
        document.getElementsByClassName("start_stop")[0].innerHTML="RESTART";

        clearInterval(timer);

         // start text to array 
         story_array=story_text.split(" ");
        //  console.log(story_array);
        
        written_array=document.getElementsByClassName("writting_area")[0].value.split(" ");
        // console.log(written_array);
         // end text to array 

        //  start checking for error 
        for (let index = 0; index < written_array.length; index++) {
            if (story_array[index]==written_array[index]) {
                total_correct++;
                // console.log(total_correct);
                check_correct.push("1");
            }
            else {
                total_incorrect++;
                // console.log(total_incorrect);
                check_correct.push("0");
            }           
        }
        // console.log(check_correct);
        // end checking for error 

        // start display of typing speed 
        document.getElementsByClassName("writting_content")[0].style.height="39vh";
        document.getElementsByClassName("writting_content")[0].style.top="22vh";
        document.getElementsByClassName("speed_display")[0].style.display="block";
        document.getElementsByClassName("speed_display")[0].innerHTML="Total correct words: "+total_correct+", Total wrong words: "+total_incorrect+", Total missing words: "+(story_array.length-total_correct-total_incorrect)+" and Typing speed: "+(total_correct*60/time_increasr).toFixed(2)+" words per minutes.";
        // end display of typing speed 

        // start coloring right and wrong for story text 
        document.getElementsByClassName("writting_content")[0].innerHTML=""; //cleat writting content
        
        for (let index = 0; index < story_array.length; index++) {

            // start create spamn
           let create_span=document.createElement("span");
           document.getElementsByClassName("writting_content")[0].appendChild(create_span);
           // end create span

           create_span.innerHTML=story_array[index] + " "; //give text inside span

           if (check_correct[index]==1) {
            create_span.style.backgroundColor="#99ff99"; //give bacground color for correct text
           }
           if (check_correct[index]==0) {
            create_span.style.backgroundColor="#ffb3b3"; //give bacground color for incorrect text
           }
        }
        // end coloring right and wrong for story text 

        // start coloring right and wrong for written text
        document.getElementsByClassName("writting_area")[0].remove();
        document.getElementsByClassName("writting_check")[0].style.display="block";

        for (let index = 0; index < written_array.length; index++) {

            // start create spamn
           let create_span=document.createElement("span");
           document.getElementsByClassName("writting_check")[0].appendChild(create_span);
           // end create span

           create_span.innerHTML=written_array[index] + " "; //give text inside span

           if (check_correct[index]==1) {
            create_span.style.backgroundColor="#99ff99"; //give bacground color for correct text
           }
           if (check_correct[index]==0) {
            create_span.style.backgroundColor="#ffb3b3"; //give bacground color for incorrect text
           }
        }
        // end coloring right and wrong for written text

        start_stop=2;
    }
    else if (start_stop==2) {
        location.reload();
    }
} 

// end start_stop button 

// start timer function 
function timer() {
    time_increasr++;
    // console.log(time_increasr);

    // start change text button
    let second=("0"+(time_increasr%60)).slice(-2);
    let minut=Math.floor(time_increasr/60);
    // console.log(minut+":"+second);
    document.getElementsByClassName("new_text")[0].innerHTML=minut+":"+second;
    // end change text button

}
// end timer function 

// start change story function 

 // start collect story from api
function story() {
    story_link="https://shortstories-api.herokuapp.com"

    // start fetch 
fetch (story_link)
.then(x=> x.text())
.then(y=>
        // console.log(y)
        story_text=JSON.parse(y).story //convert story to object and take only story portion
    )
.then(z=>
    document.getElementsByClassName("writting_content")[0].innerHTML=z
    );
}
 // end collect story from api 

// end change story function 

// start change text button 
    function changeText() {
        if (start_stop==0) {
            story();
        }
    }
// end change text button 

// start on key press function to stop enter botton and to stop double space
let double_space=1;
let start_stop_keypress=0;
function keyPress() {
    // console.log(event.keyCode);
    if (event.keyCode==13) {
        event.preventDefault(); //stop enter button
    }
    if (event.keyCode!=13 && event.keyCode!=32) {
        double_space=0;

        // start of start-stop function by key press 
        if (start_stop_keypress==0) {
            startStop();
            start_stop_keypress=1;
        }
        // end of start-stop function by key press 

    }
    // console.log(double_space);
    if (event.keyCode==32 && double_space==1) {
        event.preventDefault(); //second click of enter button
    }
    if (event.keyCode==32) {
        double_space=1; //first click of space button
    }
}
// end on key press function to stop enter botton and to stop double space

story(); //call change story function
