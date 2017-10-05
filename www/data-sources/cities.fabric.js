function Cities($resource) {
      return $resource("http://localhost:3000/user/cities", {}, {
        query: { method: "GET", isArray: true }
  });
}


angular.module('CityOnlineApp.data-sources')
  .factory('Cities', Cities);
