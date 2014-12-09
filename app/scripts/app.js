 //require('./landing');
 //require('./album');
 //require('./collection');
 //require('./profile');

 // Example album.
 var albumPicasso = {
   name: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: '/images/album-placeholder.png',
 
   songs: [
       { name: 'Blue', length: '4:26' },
       { name: 'Green', length: '3:14' },
       { name: 'Red', length: '5:01' },
       { name: 'Pink', length: '3:21'},
       { name: 'Magenta', length: '2:15'}
     ]
 };
 
 blocJams = angular.module('BlocJams', ['ui.router']);
 blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
 
   $stateProvider.state('landing', {
     url: '/',
     controller: 'Landing.controller',
     templateUrl: '/templates/landing.html'
   });


   $stateProvider.state('collection', {
     url: '/collection',
     controller: 'Collection.controller',
     templateUrl: '/templates/collection.html'
   });

    $stateProvider.state('album', {
     url: '/album',
     templateUrl: '/templates/album.html',
     controller: 'Album.controller'
   });
   
 }]);
 
  blocJams.controller('Landing.controller', ['$scope', function($scope) {
  $scope.subText = "Turn the music up!";

   $scope.subTextClicked = function() {
     $scope.subText += '!';
   };

   $scope.albumURLs = [
     '/images/album-placeholders/album-1.jpg',
     '/images/album-placeholders/album-2.jpg',
     '/images/album-placeholders/album-3.jpg',
     '/images/album-placeholders/album-4.jpg',
     '/images/album-placeholders/album-5.jpg',
     '/images/album-placeholders/album-6.jpg',
     '/images/album-placeholders/album-7.jpg',
     '/images/album-placeholders/album-8.jpg',
     '/images/album-placeholders/album-9.jpg',
   ];
 }]);

   blocJams.controller('Collection.controller', ['$scope', function($scope) {
   $scope.albums = [];
   for (var i = 0; i < 33; i++) {
     $scope.albums.push(angular.copy(albumPicasso));
   }
 }]);

  blocJams.controller('Album.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
   $scope.album = angular.copy(albumPicasso);

   var hoveredSong = null;
   var playingSong = null;

  // var hoveredSong is assigned the song hovered over
   $scope.onHoverSong = function(song) {
     hoveredSong = song;
   };
 
  // when the hover is removed, var hoveredSong returns to value "null"
   $scope.offHoverSong = function(song) {
     hoveredSong = null;
   };

   // getSongState preforms a switch function that returns 3 options depending on results of if/else statements.
      $scope.getSongState = function(song) {
     if (song === SongPlayer.currentSong && SongPlayer.playing) {
       return 'playing'; // -> Returns strings that match the ng-switch-when directives in album.html
     }
     else if (song === hoveredSong) {
       return 'hovered';
     }
     return 'default';
   };
    
   // the $scope is set to a ng-click in album.html
   // SongPlayer.service() sets the object's album & song to the currently "active" album & song
   // var playing is set to true -> determines outcome of getSongState
    $scope.playSong = function(song) {
     SongPlayer.setSong($scope.album, song);
     SongPlayer.play();
    };
  
  // var playing is set to false -> determines outcome of getSongState  
    $scope.pauseSong = function(song) {
     SongPlayer.pause();
    };
 }]);  

  blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
   $scope.songPlayer = SongPlayer; // SongPlayer is defined by songPlayer located in ng-show & ng-click in player-bar.html ???
 }]);
 
 blocJams.service('SongPlayer', function() {
   return {
     currentSong: null, // the return must be creating these new variables and immediately assigning them ...
     currentAlbum: null,
     playing: false, 
 
     play: function() {
       this.playing = true;
     },
     pause: function() {
       this.playing = false;
     },
     setSong: function(album, song) {
       this.currentAlbum = album;
       this.currentSong = song;
     }
   };
 });




