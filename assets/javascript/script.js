// Initialize Firebase
var config = {
    apiKey: "AIzaSyBrKaMZAvisXw3S_0JU9V4L1CVfrqAtydE",
    authDomain: "train-times-58783.firebaseapp.com",
    databaseURL: "https://train-times-58783.firebaseio.com",
    projectId: "train-times-58783",
    storageBucket: "train-times-58783.appspot.com",
    messagingSenderId: "284680109214"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = " ";
var tDestination = " ";
var tTime = " ";
var tFrequency = " ";


// Adding Train Name to table
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    tDestination = $("#destination").val().trim();
    tTime = $("#train-time").val().trim();
    tFrequency = $("#frequency").val().trim();



    var newTrain = {
        name: trainName,
        destination: tDestination,
        time: tTime,
        frequency: tFrequency
    }

    console.log(trainName);
    console.log(tDestination);
    console.log(tTime);
    console.log(tFrequency);
    console.log(newTrain);

    // Pushing newTrain to database
    database.ref().push(newTrain);

    alert("New train submitted!");

    $("#train-name").val(" ");
    $("#destination").val(" ");
    $("#train-time").val(" ");
    $("#frequency").val(" ");
})
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name ;
        var tDestination = childSnapshot.val().destination;
        var tTime = childSnapshot.val().time;
        var tFrequency = childSnapshot.val().frequency;

        // Time stamps        
        var tTimeConverted = moment(tTime, "HH:mm A").subtract(1, "years");
        console.log(tTimeConverted);
        console.log(tTime);

        var currentTime = moment();

        var diffTime = currentTime.diff(moment(tTimeConverted), "minutes");
            console.log(diffTime);

        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
        
        var tMinutesUntilTrain = tFrequency - tRemainder;
        console.log(tMinutesUntilTrain);

        var nextArrival = currentTime.add(tMinutesUntilTrain, "minutes").format("hh:mm A");
        console.log(nextArrival);

        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(nextArrival),   
            $("<td>").html(tMinutesUntilTrain) 
        );
        


    $("#train-schedule").append(newRow);
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code); 
    });


    







