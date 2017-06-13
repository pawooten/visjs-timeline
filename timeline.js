var GroupByType = 
{
  Day: 'Day',
  Week: 'Week',
  Month: 'Month',
  Quarter: 'Quarter', /* Counts display number of documents for the tab for a quarter */
  Year: 'Year' /* Counts display number of document for the tab for a tag */
};

var SummaryTagGenerators = {};
SummaryTagGenerators[ GroupByType.Year ] = function( date ) { return 'y' + date.getUTCFullYear(); }
SummaryTagGenerators[ GroupByType.Quarter ] = function( date ) { return 'y' + date.getUTCFullYear() + 'q' + Math.round( date.getMonth() / 4 ); }
SummaryTagGenerators[ GroupByType.Month ] = function( date ) { return 'y' + date.getUTCFullYear() + 'm' + date.getMonth() };
//SummaryTagGenerators[ GroupByType.Week ] = function( date ) { return 'y' + date.getUTCFulltag() + }
SummaryTagGenerators[ GroupByType.Day ] = function( date ) { return 'y' + date.getUTCFullYear() + 'm' + date.getMonth() + 'd' + date.getDate(); }

function formatView( tabSummaries, groupBy )
{
  var summaries = [];
  Object.values( tabSummaries ).forEach( function( tabSummary ) {
    var viewSummaries = {};
    tabSummary.DaySummaries.forEach( function( daySummary ) {
      var date = new Date( daySummary.Date );
      var tag = SummaryTagGenerators[ groupBy ]( date );
      var viewSummary = viewSummaries[ tag ] || createSummary( date, tabSummary.Tab );
      viewSummary.count += daySummary.Count;
      if (date < viewSummary.start ) {
        viewSummary.start = date;
      }
      if ( date > viewSummary.end ) {
        viewSummary.end = date;
      }
      // TODO: is it worth iterating over the array again later, to avoid formatting this string unnecessarily in intermediate iterations?
      viewSummary.content = viewSummary.count.toString();
      viewSummaries[ tag ] = viewSummary;
    });
    summaries = summaries.concat( Object.values( viewSummaries ) );
  });
  return summaries;
}

function createSummary( date, tabID )
{
  var startDate = new Date( date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - 1);
  var endDate = new Date( date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() );
  return { start: startDate, end: endDate, group: tabID, count: 0 };
}

// Configuration for the Timeline
var options = {
  width: '100%',
  height: '100%',
  margin: {
      item: 20
  },
  zoomMin: 6.048e+8, // 6.048e+8 = 1 week
  zoomMax: 3.154e+11, // 3.154e+10 = 1 year, 10 year = 3.154e+11
  end: new Date() // specify the current datetime as the end date of the timeline time axis (rather than the last item)
};

function onDateRangeChanged( e )
{
  console.log(`start: ${e.start} end: ${e.end} byUser: ${e.byUser} event: ${e.event}  `);
}

$(function() {
  var result = new vis.DataSet( formatView( documentData, GroupByType.Day ) );
  var timeline = new vis.Timeline( $('#visualization')[0], result, groups, options );
  timeline.on( 'rangechanged', onDateRangeChanged );
});
