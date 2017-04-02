(function(){
  var app = angular.module('baby-sitters-club', ['ui.router']);

  app.controller('MainCtrl', function($http, $state, $stateParams){
    var self = this;

    self.currentSitter = $stateParams.sitter;
    self.done = [];
    self.imageURL = "NO URL"

    $http.get('/helper/get-user')
      .then(function(response){
        console.log("HELPER RESPONSE >>>>", response.data.user);
        self.user = response.data.user;
        self.sitters = response.data.user.sitterList;
        self.done = response.data.user.done;
        console.log("current user status", self.user);
      })
      .catch(function(err){
        console.log(err);
      });

    function addSitter(newSitter){
      console.log("new sitter", newSitter);
      $http.post('/user/add-sitter', newSitter)
        .then(function(response){
          console.log("SITTER HAS BEEN ADDED TO USER >>>>>>>", response.data.sitterList);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function deleteSitter(id){
      console.log("CURRENT SITTER TO DELETE >>>>>>>", id);
      $http.delete('/user/delete/' + self.user._id + '/' + id)
        .then(function(response){
          console.log("SITTER HAS BEEN DELETED FROM USER >>>>>>>>", response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function editSitter(sitter){
      console.log("CURRENT SITTER TO EDIT >>>>>>>", sitter._id);
      $http.put('/user/edit/' + self.user._id + '/' + sitter._id, sitter)
        .then(function(response){
          console.log("SITTER HAS BEEN EDITED BY USER >>>>>>>>", response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.addSitter = addSitter;
    this.deleteSitter = deleteSitter;
    this.editSitter = editSitter;

  });

  app.controller('AuthCtrl', function($scope, $http, $state, $stateParams){
    var self = this;

    self.isLoggedIn = false;

    function login(userPass){
      $http.post('/login', {username: userPass.username, password: userPass.password})
        .then(function(response){
          console.log(response);
          self.isLoggedIn = true;
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function register(userPass){
      $http.post('/register', {username: userPass.username, password: userPass.password})
        .then(function(response) {
          console.log(response);
          self.isLoggedIn = true;
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function logout(){
      console.log("LOGOUT CLICKED!!!!");
      $http.delete('/logout')
        .then(function(response){
          console.log(response);
          self.isLoggedIn = false;
          $state.go('home', {url: '/'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.login = login;
    this.register = register;
    this.logout = logout;
  });

})();
