function setActiveRealms(data)
{
    shards = [];
    for (var i = 0; i < data.data.length; i++) {
        shards.push({ name: data.data[i].title, url: data.data[i].name });
    }
    realmConfigPath = "https://storage.googleapis.com/nacleanopenworldprodshards/";

    showShardSelector();
}


function showShardSelector() {
    var shardSelector = "";

    shardSelector += "Please select realm: ";
    for (var i = 0; i < shards.length; i++)
    {
        shardSelector += "<button type=\"button\" class=\"btn btn-default\" onclick=\"selectShard('" + shards[i].url + "')\">" + shards[i].name + "</button>";
    }

    document.getElementById("shards").innerHTML = shardSelector;
}

function loadScript(name)
{
    return $.getScript(realmConfigPath + name + ".json");
}

function changeRealm()
{
    location.reload();
}

function createShardSelector(name)
{
    var text = "";

    text += "<a class=\"navbar-brand\" href=\"#\">" + name + "</a>";
    text += "<a href=\"#\" onclick=\"window.location.reload(true);\">change</a>";

    document.getElementById("shards").innerHTML = text;
}



function selectShard(name)
{
    document.getElementById("shards").innerHTML = "Loading data for " + name;
    loadScript("ItemTemplates_" + name).done(loadScript("Ports_" + name).done(loadScript("Nations_" + name).done(loadScript("Shops_" + name).done(
        function () {
            //startTradersTool();
            startPortTimersTool();
            createShardSelector(name);
        }))));
}

function startPortTimersTool(){
    if (typeof Ports === 'undefined'
        || typeof Nations === 'undefined'
    ) {
        console.log("Data is missing");

        var text = "";

        text += "<a class=\"navbar-brand\" href=\"#\">" + "Data is missing" + "</a>";
        text += "<a href=\"#\" onclick=\"window.location.reload(true);\">Change server/Reload</a>";

        document.getElementById("shards").innerHTML = text;
    } else {
        showPortTimersTool();
    }
}
function showPortTimersTool(){
    var time = ("0"+hours).slice(-2)+":"+("0"+minutes).slice(-2);
    var text = "<div class='table-responsive'><table class='table-bordered table-hover'><thead><tr><td class='filler'>Server time:<br>"+time+"</td><td>No timer</td>";
    for(k=0;k<=23;k++) {
        if(k % 2 === 0)
            text+="<td><h3>"+k+" to "+(k+2)+"</h3></td>";
    }
    text+="<td># Ports</td></tr></thead><tbody>";


    for (i = 0; i < Nations.Nations.length; i++) {
        var portCounter = 0;
        var nation = Nations.Nations[i];
        text +="<tr><td><h3>"+nation.Name+"</h3></td>";
        for(k=-1;k<=23;k++) {
            var minusone = k-1;
            if(minusone <0 ) minusone +=24;
            if (k % 2 === 0 || k === -1) {
                var className = "";
                if((hours >= k && hours < (k+2)) || k < 0){
                    className ="current-window";
                }
                text += "<td class='"+className+"'>";
                for (j = 0; j < Ports.length; j++) {
                    var port = Ports[j];
                    if (port.Nation === nation.Id && port.ConquestFlagTimeSlot === k){
                        text += port.Name + "<br>";
                        portCounter++;
                    }
                }
                text += "</td>";
            }
        }
        text +="<td>"+portCounter+"</td>";
    }

    text += "</tbody></table></div>";
    document.getElementById('results').innerHTML += text;
}
