angular.module('PortfolioApp')
    .controller('appCtrl', appControl)

appControl.$inject = ['$http'];


function appControl($http) {

    console.log(appControl)

    var nav = this;
    nav.greeting = 'hey whats up';

    // not necessary unless we have object coming form factory.
    // function getPage() {
    //     return $http.get('/')
    // }

    // return {
    //     getPage : getPage
    // }

}
