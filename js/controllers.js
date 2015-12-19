var myControllers = angular.module('myApp.myControllers', []);

myControllers.controller('MainCtrl', function($scope) {

    $scope.advance = true;

    $scope.timeinH = 8;
    $scope.timeinM = 0;
    $scope.lstartH = 1;
    $scope.lstartM = 0;
    $scope.lendH = 2;
    $scope.lendM = 0;
    $scope.timeoutH = 5;
    $scope.timeoutM = 0;
    $scope.rate = 20;
    $scope.tax  = 13;

    $scope.timeinAMPM = "am";
    $scope.lunchstartAMPM = "pm";
    $scope.lunchendAMPM = "pm";
    $scope.timeoutAMPM = "pm";


    $scope.total = " ";
    $scope.calH = 0;
    $scope.calcM = 0;

    $scope.totalHours = 0;
    $scope.tableHours = 0;
    $scope.totalPay   = ($scope.totalHours * $scope.rate) - (($scope.totalHours * $scope.rate)*$scope.tax/100);



    $scope.calculate = function(){
        console.log("calc func")
        var tinDate = new Date(); 
        var tinH    = $scope.timeinH;
        var tinM    = $scope.timeinM;
        if($scope.timeinAMPM == "pm" && tinH < 12){
            tinH += 12;
            //console.log("timein yes : " + tinH + " " + $scope.timeinAMPM);
        }
        tinDate.setHours(tinH,tinM);  
        //--------Lunch Start-------------------------------------------------------
        var lstartDate = new Date(); 
        var lstH    = $scope.lstartH;
        var lstM    = $scope.lstartM; 
        if($scope.lunchstartAMPM == "pm" && lstH < 12){ 
            lstH += 12;
            //console.log("lunchstart yes : " + lstH + " " + $scope.timeinAMPM);
        } 
        lstartDate.setHours(lstH,lstM);  
        //--------Lunch End --------------------------------------------------------
        var lendDate = new Date(); 
        var lenH    = $scope.lendH;
        var lenM    = $scope.lendM; 
        if($scope.lunchendAMPM == "pm" && lenH < 12){ 
            lenH += 12;
            //console.log("timeend yes : " + lenH + " " + $scope.timeinAMPM);
        } 
        lendDate.setHours(lenH,lenM);  
        //---------------------------------------------------------------------------
        var toutDate = new Date(); 
        var toutH    = $scope.timeoutH;
        var toutM    = $scope.timeoutM; 
        if($scope.timeoutAMPM == "pm"  && toutH < 12){
            console.log("value: " + $scope.timeoutAMPM);
            toutH += 12;
            // console.log("timeout yes : " + toutH + " " + $scope.timeinAMPM);
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

        $scope.calH = hours;
        $scope.calcM = minutes/60;

        $scope.total = "" + hours  + " hours and " + minutes + " minutes";

        $scope.calcTotalHours(false);
        $scope.totalPay   = ($scope.totalHours * $scope.rate) - (($scope.totalHours * $scope.rate)*$scope.tax/100);
    }
    $scope.addRow = function(){
        console.log("add row");
        var table = $('#ttable tbody');
        var rowText = '<tr>';

        rowText    += '<td>' + $scope.timeinH  + ':';  
        if($scope.timeinM.toString().length == 1)
            rowText    += '0';
        rowText    += $scope.timeinM   + $scope.timeinAMPM      + '</td>';

        rowText    += '<td>' + $scope.lstartH  + ':';  
        if($scope.lstartM.toString().length == 1)
            rowText    += '0';
        rowText    += $scope.lstartM   + $scope.lunchstartAMPM  + '</td>';

        rowText    += '<td>' + $scope.lendH  + ':';  
        if($scope.lendH.toString().length == 1)
            rowText    += '0';
        rowText    += $scope.lendM     + $scope.lunchendAMPM    + '</td>';

        rowText    += '<td>' + $scope.timeoutH  + ':';  
        if($scope.timeoutM.toString().length == 1)
            rowText    += '0';
        rowText    += $scope.timeoutM  + $scope.timeoutAMPM     + '</td>';

        rowText    += '<td>' + ($scope.calH + $scope.calcM) + '</td>';

        rowText    += '</tr>'
        table.append(rowText); 

        //clear current times
        $scope.timeinH = 0;
        $scope.timeinM = 0;
        $scope.lstartH = 0;
        $scope.lstartM = 0;
        $scope.lendH = 0;
        $scope.lendM = 0;
        $scope.timeoutH = 0;
        $scope.timeoutM = 0;

        // add to table hours
        $scope.tableHours += $scope.calH + $scope.calcM;

        //reset
        $scope.calH = 0;
        $scope.calcM = 0;


        $scope.calcTotalHours(true);
        console.log("table hours: " + $scope.tableHours);
        $scope.calcRate();
        console.log("Rate: " + $scope.rate);
    }
    $scope.calcTotalHours = function(t) {
        if(t === true){ 
            // console.log("table hours: " + $scope.tableHours);
            $scope.tableHours += $scope.calH + ($scope.calcM);
        }
        else{
            console.log("table hours inside else calcTotalHours:" + $scope.tableHours);
            $scope.totalHours = $scope.tableHours + $scope.calH + $scope.calcM;
        } 
    }

    $scope.calcRate = function(){
        console.log("rate in calcRate: " +  $scope.rate); 
        $scope.totalPay   = ($scope.totalHours * $scope.rate) - (($scope.totalHours * $scope.rate)*$scope.tax/100);
    }
    $scope.calcTax = function(){ 
        $scope.totalPay   = ($scope.totalHours * $scope.rate) - (($scope.totalHours * $scope.rate)*$scope.tax/100);
        console.log($scope.tax);
    }
    $scope.saveCurrentHours = function(){
        console.log("saving hours");
        localStorage.setItem("timeinH",$scope.timeinH);
        localStorage.setItem("timeinM",$scope.timeinM);
        localStorage.setItem("lstartH",$scope.lstartH);
        localStorage.setItem("lstartM",$scope.lstartM);
        localStorage.setItem("lendH",$scope.lendH);
        localStorage.setItem("lendM",$scope.lendM);
        localStorage.setItem("timeoutH",$scope.timeoutH);
        localStorage.setItem("timeoutM",$scope.timeoutM); 
        localStorage.setItem("rate",$scope.rate);
        localStorage.setItem("tax",$scope.tax); 

        console.log("saving hours: " + localStorage.getItem("tax"));
        location.reload();
    }
    angular.element(document).ready(function () {
        if(localStorage.getItem("timeinH")  !== null){
            $scope.timeinH = parseInt(localStorage.getItem("timeinH"));
        }
        if(localStorage.getItem("timeinM")  !== null){
            $scope.timeinM = parseInt(localStorage.getItem("timeinM"));
        }
        if(localStorage.getItem("lstartH")  !== null){
            $scope.lstartH = parseInt(localStorage.getItem("lstartH"));
        }
        if(localStorage.getItem("lstartM")  !== null){
            $scope.lstartM = parseInt(localStorage.getItem("lstartM"));
        }
        if(localStorage.getItem("lendH")  !== null){
            $scope.lendH = parseInt(localStorage.getItem("lendH"));
        }
        if(localStorage.getItem("lendM")  !== null){
            $scope.lendM = parseInt(localStorage.getItem("lendM"));
        }
        if(localStorage.getItem("timeoutH")  !== null){
            $scope.timeoutH = parseInt(localStorage.getItem("timeoutH"));
        }
        if(localStorage.getItem("timeoutM")  !== null){
            $scope.timeoutM = parseInt(localStorage.getItem("timeoutM"));
        }
        if(localStorage.getItem("rate")  !== null){
            $scope.rate = parseInt(localStorage.getItem("rate"));
        }
        if(localStorage.getItem("tax")  !== null){
            $scope.tax = parseInt(localStorage.getItem("tax"));
        }
        $scope.calculate();
        $scope.$apply();
        console.log("init");
    });

});