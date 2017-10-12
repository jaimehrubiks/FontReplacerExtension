
loadSettings( function(settings){
    loadData(settings);
    console.log("Loaded: ", settings);
});

$("#defaultsButton").click(function(){
    settings = setDefaultSettings();
    jQuery('#jqGrid').jqGrid('clearGridData');
    jQuery('#jqGrid').jqGrid('setGridParam', {data: settings.rules});
    jQuery("#jqGrid").trigger("reloadGrid");
})

$("#saveButton").click(function(){
    console.log("saving");
    saveSettings(settings);
})
$("#editButton").click(function(){
    console.log("saving");
    startEdit();
})
$("#endEditButton").click(function(){
    console.log("saving");
    saveRows();
})

var settings;
function loadData(set){
    settings = set;
    getInstalledFonts(function (fonts){
        jQuery("#jqGrid").jqGrid({
            datatype: "local",
            data: settings.rules,
            edit: settings.rules,
            cellsubmit:'clientArray', 
            //cellEdit: true,
            editurl: "clientArray",
            width: 500,
            colNames:['Font to Replace','New Font'],
            colModel: [
                {
                    label: 'Font to replace',
                    name: 'oldFont',
                    width: 100,
                    editable: true
                },
                {
                    label: 'New Font',
                    name: 'newFont',
                    width: 100,
                    editable: true,
                    edittype: "select",
                    editoptions: {
                        value: fonts
                    }
                }
            ],
            rowNum:10,
            rowList:[10,20,30],
            pager: '#jqGridPager',
            sortname: 'oldFont',
            viewrecords: true,
            sortorder: "desc",
            caption:"JSON Example"
        });
        $('#jqGrid').navGrid('#jqGridPager',
                    // the buttons to appear on the toolbar of the grid
                    { edit: true, add: true, del: true, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
                    // options for the Edit Dialog
                    {
                        editCaption: "The Edit Dialog",
                        recreateForm: true,
                        checkOnUpdate : true,
                        checkOnSubmit : true,
                        closeAfterEdit: true,
                        errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        }
                    },
                    // options for the Add Dialog
                    {
                        closeAfterAdd: true,
                        recreateForm: true,
                        errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        }
                    },
                    // options for the Delete Dailog
                    {
                        errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        }
                    });
    });
}

        function startEdit() {
            var grid = $("#jqGrid");
            var ids = grid.jqGrid('getDataIDs');

            for (var i = 0; i < ids.length; i++) {
                grid.jqGrid('editRow',ids[i]);
            }
        };

        function saveRows() {
            var grid = $("#jqGrid");
            var ids = grid.jqGrid('getDataIDs');

            for (var i = 0; i < ids.length; i++) {
                grid.jqGrid('saveRow', ids[i]);
            }
        }

// function loadData(set) {
//     settings = set;
//     getInstalledFonts(function (fonts){
//         $("#jqGrid").jqGrid({
//             // url: 'data.json',
//             // we set the changes to be made at client side using predefined word clientArray
//             // editurl: 'clientArray',
//             datatype: "local",
//             data: settings.rules,
//             url: 'clientArray',
//             editurl: 'clientArray',
//             colModel: [
//                 {
//                     label: 'Font to replace',
//                     name: 'oldFont',
//                     width: 100,
//                     editable: true // must set editable to true if you want to make the field editable
//                 },/*
//                 {
//                     label : 'New font location',
//                     name: 'pathType',
//                     width: 100,
//                     editable: true
//                 },*/
//                 {
//                     label: 'New font',
//                     name: 'newFont',
//                     width: 80,
//                     editable: true,
//                     edittype: "select",
//                     editoptions: {
//                         value: fonts
//                     }
//                 }/*,
//                 {
//                     label: 'New font (URL)',
//                     name: 'newFont',
//                     width: 140,
//                     editable: true
//                 }*/
//             ],
//             sortname: 'oldFont',
//             sortorder : 'asc',
//             loadonce: true,
//             viewrecords: true,
//             width: 480,
//             height: 200,
//             rowNum: 20,
//             pager: "#jqGridPager",
//             onSelectRow: function (id) {
//                 if (id && id !== lastSelection) {
//                     var grid = $("#jqGrid");
//                     grid.jqGrid('saveRow');
//                     grid.jqGrid('editRow',id, {keys:true, focusField: 1});
//                     lastSelection = id;
//                 }
//         }
//             //onSelectRow: function(){ jQuery('#jqGrid').saveRow(lastSel);  },
//             //afterInsertRow: function(){ jQuery('#jqGrid').saveRow(lastSel);  }
//             //afterInsertRow: function(){ jQuery('#jqGrid').saveRow(lastSel);  }
//         });

//         var lastSelection;
//         function editRow(id) {
//             if (id && id !== lastSelection) {
//                 var grid = $("#jqGrid");
//                 grid.jqGrid('restoreRow',lastSelection);
//                 //grid.jqGrid.saveRow(lastSelection);
//                 grid.jqGrid('editRow',id, {keys:true, focusField: 1});
//                 lastSelection = id;
//                 //saveSettings(settings);
//                 //console.log("saved data: ", settings);
//             }
//         }

//         $('#jqGrid').navGrid('#jqGridPager',
//         // the buttons to appear on the toolbar of the grid
//         { edit: true, add: true, del: true, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
//         // options for the Edit Dialog
//         {
//             editCaption: "EDIT RULE",
//             recreateForm: true,
//             //checkOnUpdate : true,
//             checkOnSubmit : true,
//             closeAfterEdit: true,
//             errorTextFormat: function (data) {
//                 return 'Error: ' + data.responseText
//             }
//         },
//         // options for the Add Dialog
//         {
//             closeAfterAdd: true,
//             recreateForm: true,
//             errorTextFormat: function (data) {
//                 return 'Error: ' + data.responseText
//             }
//         },
//         // options for the Delete Dailog
//         {
//             errorTextFormat: function (data) {
//                 return 'Error: ' + data.responseText
//             }
//         });

//     })
    



        
// }
