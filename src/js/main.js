var usePublicShards = true;
var shards = [];
var realmConfigPath = "";
if (usePublicShards)
{
    var apiKey = "1ZptRtpXAyEaBe2SEp63To1aLmISuJj3Gxcl5ivl"; // TEMP, should be obtained from Slik
    var serverListPath = "http://api.shipsofwar.net/servers?apikey=" + apiKey + "&callback=setActiveRealms";

    $.ajax({ url: serverListPath, dataType: 'jsonp', jsonpCallback: 'setActiveRealms'});
}
if (!usePublicShards) {
    showShardSelector();
}

