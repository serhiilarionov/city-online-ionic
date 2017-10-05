function Post($resource, serverURL) {
  return $resource(serverURL + "/bid/:id", {}, {
    query: { method: "GET", params:{id:'id'}, isArray: true }
  })
}

angular.module('CityOnlineApp.data-sources')
  .factory('Post', Post);
