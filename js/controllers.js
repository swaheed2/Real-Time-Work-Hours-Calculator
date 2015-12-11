var myControllers = angular.module('myApp.myControllers', []);

myControllers.controller('MainCtrl', function($scope) {

    $scope.timeinH = 8;
    $scope.timeinM = 0;
    $scope.lstartH = 1;
    $scope.lstartM = 0;
    $scope.lendH = 2;
    $scope.lendM = 0;
    $scope.timeoutH = 5;
    $scope.timeoutM = 30;
    
    $scope.timeinAMPM = "am"
    
    $scope.total = " ";

    $scope.calculate = function(){
        console.log("calc func")
        var tinDate = new Date(); 
        var tinH    = $scope.timeinH;
        var tinM    = $scope.timeinM;
        if($scope.timeinAMPM == "pm" && tinH < 12){
            tinH += 12;
            console.log("timein yes : " + tinH + " " + $scope.timeinAMPM);
        }
        tinDate.setHours(tinH,tinM);  
        //--------Lunch Start-------------------------------------------------------
        var lstartDate = new Date(); 
        var lstH    = $scope.lstartH;
        var lstM    = $scope.lstartM; 
        if($('#lunchstartAMPM').val() == "pm" && lstH < 12){ 
            lstH += 12;
            console.log("lunchstart yes : " + lstH + " " + $scope.timeinAMPM);
        } 
        lstartDate.setHours(lstH,lstM);  
        //--------Lunch End --------------------------------------------------------
        var lendDate = new Date(); 
        var lenH    = $scope.lendH;
        var lenM    = $scope.lendM; 
        if($('#lunchendAMPM').val() == "pm" && lenH < 12){ 
            lenH += 12;
            console.log("timeend yes : " + lenH + " " + $scope.timeinAMPM);
        } 
        lendDate.setHours(lenH,lenM);  
        //---------------------------------------------------------------------------
        var toutDate = new Date(); 
        var toutH    = $scope.timeoutH;
        var toutM    = $scope.timeoutM; 
        if($('#timeoutAMPM').val() == "pm"  && toutH < 12){
            console.log("value: " + $('#timeoutAMPM').val());
            toutH += 12;
            console.log("timeout yes : " + toutH + " " + $scope.timeinAMPM);
        }
        toutDate.setHours(toutH,toutM);  
        //---------------------------------------------------------------------------

        var diff = (toutDate.getTime() - tinDate.getTime()) - (lendDate.getTime() - lstartDate.getTime()); 
        console.log("lunch: " + (lendDate.getTime() - lstartDate.getTime()));
        console.log("diff: " + diff);

        var milliseconds = parseInt((diff%1000)/100)
        , seconds = parseInt((diff/1000)%60)
        , minutes = parseInt((diff/(1000*60))%60)
        , hours = parseInt((diff/(1000*60*60))%24);

        hours = (hours < 10) ? "" + hours : hours;
        minutes = (minutes < 10) ? "" + minutes : minutes;
        seconds = (seconds < 10) ? "" + seconds : seconds;

        $scope.total = "" + hours  + " hours and " + minutes + " minutes";
    }
    angular.element(document).ready(function () {
        $scope.calculate();
        $scope.$apply();
        console.log("init")
    });
    
});