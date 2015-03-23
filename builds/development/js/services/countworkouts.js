myApp.factory('CountWorkouts', function($firebase,
  $rootScope, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/workouts');

  var workoutsInfo = $firebase(ref);

  var workoutsArray = workoutsInfo.$asArray();

  workoutsArray.$loaded(function(data) {
    $rootScope.howManyWorkouts = workoutsArray.length;
  });

  workoutsArray.$watch(function(data) {
    $rootScope.howManyWorkouts = workoutsArray.length;
  });

  return true;

}); //CountWorkouts