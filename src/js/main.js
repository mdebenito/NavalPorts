var usePublicShards = true;
var shards = [];
var realmConfigPath = "";
var hours = 0;

var d = new Date();
/*var n = d.getTimezoneOffset() / 60;

var hours = d.getUTCHours() + n;*/
var hours = d.getUTCHours();
var minutes = d.getUTCMinutes();

if (usePublicShards)
{
    var apiKey = "1ZptRtpXAyEaBe2SEp63To1aLmISuJj3Gxcl5ivl"; // TEMP, should be obtained from Slik
    var serverListPath = "http://api.shipsofwar.net/servers?apikey=" + apiKey + "&callback=setActiveRealms";

    $.ajax({ url: serverListPath, dataType: 'jsonp', jsonpCallback: 'setActiveRealms'});
}
if (!usePublicShards) {
    showShardSelector();
}

