/**
 * The MIT License (MIT)
 * Copyright (c) 2016 Mario de Benito, mdb-dev.es
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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

