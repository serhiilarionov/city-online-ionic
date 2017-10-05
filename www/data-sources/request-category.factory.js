function RequestCategories($resource) {
  return {
    get: function() {
      return [
        {
          id: 101,
          name: 'Водовідведення, каналізація',
          subcategories: [
            {
              id: 0,
              name: 'Засмічення системи водовідведення'
            },
            {
              id: 1,
              name: 'Відсутність люків у каналізаційних колодязях'
            }
          ]
        }
      ];
    }
  };
}

angular.module('CityOnlineApp.data-sources')
  .factory('RequestCategories', RequestCategories);
