/**
 * Created by mdi on 13.11.2015.
 */
angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier',function(mvToastr){

    return{
        notify: function(msg){
            mvToastr.success(msg);
        },
        error: function(msg){
            mvToastr.error(msg);
        },
        warn: function(msg){
            mvToastr.warn(msg);

        },
        info: function(msg){
            mvToastr.info(msg);
        }

    }
})