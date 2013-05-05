(function( $ ){

    function getFirstDay (date,month,year) {

        var dateObj =  new Date();
        dateObj.setFullYear(year);
        //alert(dateObj.getFullYear());

        month_names = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
        dateObj.setMonth(month);
        var m_name = dateObj.getMonth();
        //alert(month_names[m_name]);

        day_names = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
        dateObj.setDate(1);
        var first_day = dateObj.getDay();

        return first_day;
    }

    function monthTable(firstWeekDay,previousMonthLastDay,lastDay,today,month,year)
    {
        var startDay = previousMonthLastDay - (firstWeekDay-2);
        var counter = 1;

        var month_names = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
        var currentMonth = month_names[month];

        var output ='<table class="table-condensed table-bordered table-striped">\n\t<thead>\n\t\t<tr>\n\t\t\t<th colspan="7">\n\t\t\t\t<span class="btn-group">\n\t\t\t\t\t<a id="left" class="btn"><i class="icon-chevron-left"></i></a>\n\t\t\t\t\t<a id="rigth" class="btn active">';
        output += currentMonth + " "+year+'</a>\n\t\t\t\t\t<a class="btn"><i class="icon-chevron-right"></i></a>\n\t\t\t\t</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th>Su</th>\n\t\t\t<th>Mo</th>\n\t\t\t<th>Tu</th>\n\t\t\t<th>We</th>\n\t\t\t<th>Th</th>\n\t\t\t<th>Fr</th>\n\t\t\t<th>Sa</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n';
        var monthNumbers = startDay;
        output += '\t\t<tr>\n';
        var tdOpener = "<td>"
        var resetCounter = 0;
        while(counter<36)
        {
            if(monthNumbers==lastDay+1)
            {
                monthNumbers = 1;
                var resetCounter = counter;
            }
            if(monthNumbers==today)
            {
                tdOpener = '\t<td class="btn-primary">';
            }
            else if(counter<firstWeekDay)
            {
                tdOpener = '\t<td class="muted">';
            }
            else if(resetCounter!=0)
            {
                tdOpener = '\t<td class="muted">';
            }
            else
            {
                tdOpener = '\t<td>';
            }
            if(counter%7!=0)
            {
                output += '\t\t'+tdOpener+monthNumbers+'</td>\n';
            }
            else
            {
                output += "\t\t"+tdOpener+monthNumbers+"</td>\n\t\t</tr>\n";
                if(counter!=35)
                {
                    output+= "\t\t<tr>\n";
                }
            }
            counter++;
            monthNumbers++;
            if(counter==firstWeekDay)
            {
                monthNumbers = 1;
            }
        }
        output += '\t</tbody>\n</table>';
        return output;
    }

    $.fn.calendar = function() {
        var month_names = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
        
        var date = new Date(), d = date.getDate(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1).getDate();
        var lastDay = new Date(y, m + 1, 0).getDate();
        var today = d;

        var firstWeekDay = getFirstDay(firstDay,m,y);

        var previousMonthLastDay = new Date(y, m, 0).getDate();
        
        var currentMonth = month_names[m];
        
        var methods = {
            init : function( ) {
                var content = monthTable(firstWeekDay,previousMonthLastDay,lastDay, today,m,y);
                var $this = $(this);
                $this.html(content);
            },
            next : function( ) {
                var content = monthTable(firstWeekDay,previousMonthLastDay,lastDay, today,m+1,y);
                var $this = $(this);
                $this.html(content);
            },
            prev : function( ) { 
                var content = monthTable(firstWeekDay,previousMonthLastDay,lastDay, today,m-1,y);
                var $this = $(this);
                $this.html(content);
            }
        };
        
        

        return this.each(function( method ) {
            if ( methods[method] ) {
              return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
              return methods.init.apply( this, arguments );
            } else {
              $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
            }

        });

};
})( jQuery );