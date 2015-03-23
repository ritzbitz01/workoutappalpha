myApp.controller('WorkoutsController',
  function($scope, $rootScope, $firebase,
    CountWorkouts, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/workouts');

  var workoutsInfo = $firebase(ref);
  var workoutsObj = workoutsInfo.$asObject();

  $scope.options = [
    { label: 'Gym', value: 1 },
    { label: 'Routine', value: 2 },
    { label: 'Bike', value: 3},
    { label: 'Hike', value: 4}
  ];
    
  // Here we are referencing the same object, so Angular inits the select box correctly
  $scope.workoutTypeSelected = $scope.options[1];
  
  workoutsObj.$loaded().then(function(data) {
    $scope.workouts = data;
  }); //make sure workouts data is loaded


  $scope.addWorkout = function() {
    workoutsInfo.$push({
      name: $scope.workoutname,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.workoutname='';
    });
  }; //addworkout

  $scope.deleteWorkout = function(key) {
    workoutsInfo.$remove(key);
  }; //deleteWorkout


}); //WorkoutsController