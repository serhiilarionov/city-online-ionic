function Streets($resource) {

  return $resource("http://localhost:3000/user/streets/:id", {}, {
    query: { method: "GET", params:{id:'id'}, isArray: true }
  })
}

angular.module('CityOnlineApp.data-sources')
  .factory('Streets', Streets);
