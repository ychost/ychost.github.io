 /*
    获取cnzz统计的今日PV数量
  */
 (function(){
   return;
  var itl_cnt = 10;
  var itl = setInterval(function(){
     if(--itl_cnt == 0){
        clearInterval(itl);
      }
    var cnzz = $("#cnzz_stat_icon_1260117641 a");  
    cnzz.each(function(){    
      if($(this).text().indexOf("今日PV") >= 0 ){  
        var vistAll = $(this).text().split("]");
        var todayIpStr = vistAll[0];
        var todayPvStr = vistAll[1];       
        var yestodayIpStr = vistAll[2];
        var yestodayPvStr = vistAll[3]    

        totdayPv =   todayPvStr.replace(/[^\d]/g,'');
        //console.log(totdayPv);
        if(totdayPv == 0){
          totdayPv = 1;
       }
       $("#totdayPv").text(totdayPv);
       clearInterval(itl);
     }})
  },500);
})();
