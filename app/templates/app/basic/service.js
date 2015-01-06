'use strict';

angular.module('<%= name %>')
  .service('<%= serviceName %>', function ($q, $http) {
    // A private cache key.
    var cache = {};

    // Update broadcast name.
    var broadcastUpdateEventName = '<%= serviceName %>Change';

    /**
     * Return the promise with the collection, from cache or the server.
     *
     * @returns {*}
     */
    this.get = function() {
      if (cache) {
        return $q.when(cache.data);
      }

      return getDataFromBackend();
    };

    /**
     * Return promise with the collection from the server.
     *
     * @returns {$q.promise}
     */
    function getDataFromBackend() {
      var deferred = $q.defer();
      var url = '';
      $http({
        method: 'GET',
        url: url,
        params: params,
        transformResponse: prepareDataForLeafletMarkers
      }).success(function(response) {
        setCache(response);
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    /**
     * Save cache, and broadcast an event, because data changed.
     *
     * @param data
     *   Object with the data to cache.
     */
    var setCache = function(data) {
      // Cache data by company ID.
      cache = {
        data: data,
        timestamp: new Date()
      };

      // Clear cache in 60 seconds.
      $timeout(function() {
        if (cache.data && cache.data[cacheId]) {
          cache.data[cacheId] = null;
        }
      }, 60000);

      // Broadcast a change event.
      $rootScope.$broadcast(broadcastUpdateEventName);
    };

    /**
     * Convert the response to a collection.
     *
     * @param response
     *   The response from the $http.
     *
     * @returns {*}
     *   The Collection requested.
     */
    function prepareDataForLeafletMarkers(response) {
      var collection;

      // Convert response serialized to an object.
      collection = angular.fromJson(reponse).data;

      return collection;
    }

  });
