/*
    FUNCTIONS
*/

function applyRules(settings){

    let newStyle = document.createElement('style');
    let cssFile = "";
    for(let rule of settings.rules){
        cssFile += newRule(rule.oldFont, rule.newFont, rule.pathType);
    }
    newStyle.appendChild(document.createTextNode(cssFile));
    document.head.appendChild(newStyle);
    
}

function saveSettings(settings){
    chrome.storage.sync.set({"settings": settings});
    console.log("settings saved: ", settings);
}

function loadSettings(cb){

    chrome.storage.sync.get("settings",function(settings){
        if(settings) settings = settings.settings;
        if(!settings || !settings.rules) {
            settings = setDefaultSettings();
            saveSettings(settings);
        }
        console.log("settings loaded: ", settings);

        cb(settings);
    });

}

function setDefaultSettings(){
    var settings = {
        rules: [
            {
                oldFont: "Comic Sans",
                newFont: "Arial"
                //id: "jqg1"
                //pathType: "local"
            },
            {
                oldFont: "Comic Sans MS",
                newFont: "Arial"
                //id: "jqg1"
                //pathType: "local"
            }/*,
            {
                oldFont: "cursive",
                newFont: "Arial",
                pathType: "local"
            },
            */
        ]
    };
    console.log("Default values loaded.");
    return settings;
}

function newRule(oldFont,newFont,pathType,oldFontType){
        return `
        @font-face {
            font-family: ${oldFont};
            src: ${ ( !pathType )? "local("+newFont+")" : "url("+newFont+")" };
        }
        @font-face {
            font-family: ${oldFont};
            src: ${ ( !pathType )? "local("+newFont+")" : "url("+newFont+")" };
            font-weight: bold;
        }`;
}

function getInstalledFonts(cb){
    let fonts = "";
    chrome.fontSettings.getFontList(function(fontsList){
        fontsList.forEach(function(font){
            fonts += `${font.fontId}:${font.displayName};`;
        });
        cb(fonts.slice(0,fonts.length-1));
    });
}