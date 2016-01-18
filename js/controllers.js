var myControllers = angular.module('myApp.myControllers', []);

myControllers.controller('MainCtrl', function($scope) {


    $scope.advance = true;

    $scope.timeinH = 0;
    $scope.timeinM = 0;
    $scope.lstartH = 0;
    $scope.lstartM = 0;
    $scope.lendH = 0;
    $scope.lendM = 0;
    $scope.timeoutH = 0;
    $scope.timeoutM = 0;
    $scope.rate = 20;
    $scope.tax  = 13;

    $scope.timeinAMPM = "am";
    $scope.lunchstartAMPM = "pm";
    $scope.lunchendAMPM = "pm";
    $scope.timeoutAMPM = "pm";


    $scope.weekday = new Array(7);
    $scope.weekday[0]=  "Sun";
    $scope.weekday[1] = "Mon";
    $scope.weekday[2] = "Tue";
    $scope.weekday[3] = "Wed";
    $scope.weekday[4] = "Thu";
    $scope.weekday[5] = "Fri";
    $scope.weekday[6] = "Sat";
    $scope.todayDate = new Date();

    $scope.total  = " ";
    $scope.calH   = 0;
    $scope.calcM  = 0;
    $scope.day    = $scope.weekday[$scope.todayDate.getDay()]; 

    $scope.totalHours = 0;
    $scope.tableHours = 0;
    $scope.totalPay   = ($scope.totalHours * $scope.rate) - (($scope.totalHours * $scope.rate)*$scope.tax/100);




    $scope.calculate = function(){
        console.log("calc func")
        var tinDate = new Date(); 
        var tinH    = $scope.timeinH;
        var tinM    = $scope.timeinM;
        if($scope.timeinAMPM == "pm" && tinH < 12 && tinH > 0){
            tinH += 12;
            //console.log("timein yes : " + tinH + " " + $scope.timeinAMPM);
        }
        tinDate.setHours(tinH,tinM);  
        //--------Lunch Start-------------------------------------------------------
        var lstartDate = new Date(); 
        var lstH    = $scope.lstartH;
        var lstM    = $scope.lstartM; 
        if($scope.lunchstartAMPM == "pm" && lstH < 12 && lstH > 0){ 
            lstH += 12;
            //console.log("lunchstart yes : " + lstH + " " + $scope.timeinAMPM);
        } 
        lstartDate.setHours(lstH,lstM);  
        //--------Lunch End --------------------------------------------------------
        var lendDate = new Date(); 
        var lenH    = $scope.lendH;
        var lenM    = $scope.lendM; 
        if($scope.lunchendAMPM == "pm" && lenM < 12 && lenM > 0){ 
            lenH += 12;
            //console.log("timeend yes : " + lenH + " " + $scope.timeinAMPM);
        } 
        lendDate.setHours(lenH,lenM);  
        //---------------------------------------------------------------------------
        var toutDate = new Date(); 
        var toutH    = $scope.timeoutH;
        var toutM    = $scope.timeoutM; 
        if($scope.timeoutAMPM == "pm"  && toutH < 12 && toutH > 0){
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
    $scope.addRow = function() {

        console.log("add row");
        var table = $('#ttable tbody');
        var rowText = '<tr>';

        rowText    += '<td class="small-col">' + $scope.day + '</td>';

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

        rowText    += '<td class="small-col">' + ($scope.calH + $scope.calcM) + '</td>';

        rowText    += '</tr>'
        table.append(rowText); 

        localStorage.setItem("table",table.html());


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
        $scope.tableHours = Number($scope.tableHours) +  Number($scope.calH) + Number($scope.calcM);

        console.log("table hours is getting set: " + $scope.tableHours)
        localStorage.setItem("tableHours",$scope.tableHours);

        //reset
        $scope.calH = 0;
        $scope.calcM = 0;


        $scope.calcTotalHours(true);
        console.log("table hours: " + $scope.tableHours);
        $scope.calcRate();
        console.log("Rate: " + $scope.rate);
        $scope.day++;
    }
    $scope.calcTotalHours = function(t) {
        if(t === true){ 
            // console.log("table hours: " + $scope.tableHours);
            $scope.tableHours += $scope.calH + ($scope.calcM);
        }
        else{
            console.log("table hours inside else calcTotalHours:" + $scope.tableHours);
            $scope.totalHours = Number($scope.tableHours) + Number($scope.calH) + Number($scope.calcM);
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

        if(localStorage.getItem("table")  !== null){
            console.log("table exists: ");
            var table = $('#ttable tbody'); 
            var tableArray = localStorage.getItem("table");
            console.log(tableArray);
            table.html(tableArray);
        }



        if(localStorage.getItem("tableHours")  !== null){  
            var tableHours = localStorage.getItem("tableHours");
            console.log("exists table hours is: " + tableHours)
            $scope.tableHours = tableHours;
        }
        else{
            console.log("table hours is 0")
            localStorage.setItem("tableHours",0);
        }

        $scope.calculate();
        $scope.$apply();
        console.log("init");
    });

});

var clearAll = function(){
    localStorage.removeItem("tableHours");
    localStorage.removeItem("table");
    localStorage.removeItem("timeinH");
    localStorage.removeItem("timeinM");
    localStorage.removeItem("lstartH");
    localStorage.removeItem("lstartM");
    localStorage.removeItem("lendH");
    localStorage.removeItem("lendM");
    localStorage.removeItem("timeoutH");
    localStorage.removeItem("timeoutM");
    localStorage.removeItem("rate");
    localStorage.removeItem("tax");
}