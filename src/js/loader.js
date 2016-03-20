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

    var text = "<div class='table-responsive'><table class='table-bordered table-hover'><thead><tr><td></td>";
    for(k=0;k<=23;k++) {
        if(k % 2 === 0)
            text+="<td><h3>"+k+" to "+(k+2)+"</h3></td>";
    }
    text+="</tr></thead><tbody>";


    for (i = 0; i < Nations.Nations.length; i++) {
        var nation = Nations.Nations[i];
        text +="<tr><td><h3>"+nation.Name+"</h3></td>";
        for(k=0;k<=23;k++) {
            if (k % 2 === 0) {
                text += "<td>";
                for (j = 0; j < Ports.length; j++) {
                    var port = Ports[j];
                    if (port.Nation === nation.Id && port.ConquestFlagTimeSlot === k)
                        text += port.Name + "<br>";
                }
                text += "</td>";
            }
        }
    }

    text += "</tbody></table></div>";
    document.getElementById('results').innerHTML += text;
}