
const time = document.getElementById("time");
const x3dElement = document.getElementById('x3dElement');
const runtime = x3dElement.runtime;
const fpsDiv = document.getElementById('fps');
const drawcalls = document.getElementById('dc');
const timestamps = document.getElementById('ts');
const travelb = document.getElementById("travelButton");
// save fps array
let fpsList = [];

// to be executed
function endTravel() {
    // modify travelTrigger button
    travelb.value = "0";
    travelb.innerHTML = 'Start Travel';
    // end route
    time.setAttribute("enabled", "false");
    let seconds = new Date().getTime() / 1000.0;
    console.log(seconds);
    time.setAttribute('stopTime', seconds.toString());
    // reset fps
    runtime.exitFrame = function () {
        fpsDiv.innerHTML = "0.0";
        drawcalls.innerHTML = "0.0";
        timestamps.innerHTML = "0.0";
    }
    // record and display fps array
    console.log(fpsList);
    const minps = document.getElementById("minPointFieldLabel").innerHTML;
    const maxps = document.getElementById("maxPointFieldLabel").innerHTML;
    const sps = document.getElementById("scaleFieldLabel").innerHTML;
    const aps = document.getElementById("attAFieldLabel").innerHTML;
    const bps = document.getElementById("attBFieldLabel").innerHTML;
    const cps = document.getElementById("attCFieldLabel").innerHTML;
    text = document.getElementById("dataText").innerHTML+"<br>"+
        "min_point_size="+minps+"<br>max_point_size="+maxps+"<br>scale="+sps+
        "<br>a="+aps+"<br>b="+bps+"<br>c="+cps+"<br>"+fpsList.join("<br>");

    document.getElementById("dataText").innerHTML = text;

}

function startTravel() {
    console.log("start");
    // reset fpslist
    fpsList = [];

    // set time sensor attribute
    time.setAttribute("enabled", "true");
    let seconds = new Date().getTime() / 1000.0;
    console.log(seconds);
    time.setAttribute('startTime', seconds.toString());
    // set button attribute
    travelb.innerHTML = 'End Travel';
    travelb.value = "1";
    // console.log(travelb.value);

    // get fps
    runtime.exitFrame = function () {
        fpsDiv.innerHTML = runtime.fps.toFixed(2);
        drawcalls.innerHTML = runtime.states.infos['#DRAWS:'].toFixed(2);
        timestamps.innerHTML = time.getAttribute("elapsedTime").toFixed(2);

        // end travel if route is finished
        if (travelb.value == "1" &&
            time.getAttribute("elapsedTime") - time.getAttribute("cycleInterval") >= -0.05) {
            console.log("end2");
            endTravel();
        }
    }
}

function resetView() {
    // reset viewpoint to init
    document.getElementById("vp0Trans").setAttribute("translation", "0 0 0");
    document.getElementById("vp0Trans").setAttribute("rotation", "0 0 0");
    document.getElementById("vp0").setAttribute("position", "387.5 357.91 20.45");
    document.getElementById("vp0").setAttribute("orientation", "0.36959 0.57356 0.73105 2.35696");

}
