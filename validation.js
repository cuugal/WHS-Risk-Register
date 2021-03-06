function ConfirmChoice() 
{ 
if(NeedMoreRiskControls()){
	alert("Put in place more control measures to reduce residual risk level to Moderate or Low");
	return false;
}
// get rid of any rows that exist but haven't been filled out in safety controls
deleteEmptyRows();

//now check we have valid dates here
var table = document.getElementById('tblControls');
var rowCount = table.rows.length;

//start at 3 as we have 2 rows of header above us
for(var i=3; i<rowCount; i++) {
   	var date = document.getElementById('dateRow'+i);
   	if(date){
	   //	('dateRow'+i); 	
	    if(!isDate(date.value)) {	    	
		   	//alert("Please check that you have added dates in the correct format DD/MM/YYYY under safety controls");
	       	return false;
	    }
	}
}

//Find what value has been attributed the SWMS radio button
for (var i=0;i<document.Form1.boolSWMSRequired.length; i++) 
{
if (document.Form1.boolSWMSRequired[i].checked) 
	{
	var needSWMS = document.Form1.boolSWMSRequired[i].value;
	}
}
if(!needSWMS){
	alert("Please note whether a SWMS is needed in step (2)");
	return(false);
}

//Check to see if we need a SWMS
if(needSWMS == "Yes" && document.Form1.hasSWMS.value == "" && document.Form1.action == getBaseURL()+"AddCQORAsup.asp"){
	alert("A SWMS must be completed for this task");
	return(false);
}

if (document.Form1.txtAssessor.value != "" && document.Form1.txtTaskDesc.value !="" && document.Form1.T1.value !="" && document.Form1.T3.value !="" ){
	answer = confirm("Do you want to save this Risk Assessment to the database?")
		if (answer == true) { 
			return ;
		} 
		else{ 
			return (false);
		}
}
	else{
			if (document.Form1.txtAssessor.value == "") { 
			alert ("Please enter information in the Assessor feild of the Risk Assessment Form");
			return(false);
			}
			if (document.Form1.txtTaskDesc.value == "") {
			alert ("Please enter information in the Work Activity feild of the Risk Assessment Form");
			return(false);
			}
			if (document.Form1.T1.value == "") {
			alert ("Please enter information in the Hazard List box of the Risk Assessment Form");
			return(false);
			}
			if (document.Form1.T3.value == "") {
			alert ("Please enter information in the Potential Harm box of the Risk Assessment Form");
			return(false);
			}
	}
}
// end of confirm choice function






function ConfirmDelete() 
{ 
     answer = confirm("Are you sure you wish to delete this Risk Assessment?");
  if (answer == true) 
  { 
           return(true);
  } 
  else
  { 
   return (false);
  }
}

function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.lastIndexOf("/"));
    var word = new String("conflagrationtion");
    //(word.lastIndexOf("t"));
    //(url.lastIndexOf("/", 6));
    return baseURL+"/";
}

// function to populate the textboxes on click event
function Populate(val)
{
    //document.all.T1.value = document.all.T1.value + val
    $("#T1").val($("#T1").val() + val);

}
// function to populate the textboxes on click event
function PopulateNext(val)
{
  //document.all.T2.value = document.all.T2.value + val;
  addRowToTable(val, true);
}
  /****************************************************************************************************************************/
  /*****Dynamic line generator for Risk controls *********************/
 // Last updated 2009-12-05

function addRowToTable(val, readOnly)
{
  val = typeof(val) != 'undefined' ? val : '';
  var tbl = document.getElementById('tblControls');
  var lastRow = tbl.rows.length;
  // if there's no header row in the table, then iteration = lastRow + 1
  var iteration = lastRow;
  var row = tbl.insertRow(lastRow);
  
  // left cell
  var cellLeft = row.insertCell(0);
  var el = document.createElement('input');
  el.type = 'text';
  el.name = 'txtRow' + iteration;
  el.id = 'txtRow' + iteration;
  el.value = val;
  el.size = 65;
    if(readOnly) {
        //el.setAttribute('readonly', true);
        //el.setAttribute('class', 'disable');
    }
  cellLeft.setAttribute('colspan','1');
  cellLeft.appendChild(el);
  
  // 'implemented' checkbox
  var cellRightSel = row.insertCell(1);
  var sel = document.createElement('input');
  sel.type = "checkbox";
  sel.id = 'selRow' +iteration;
  sel.name = 'selRow' +iteration;

  cellRightSel.setAttribute('align','center'); 
  cellRightSel.appendChild(sel);
  
    // date cell
  var cellDate = row.insertCell(2);
  var dte = document.createElement('input');
  dte.type = 'text';
  dte.name = 'dateRow' + iteration;
  dte.id = 'dateRow' + iteration;
  cellDate.setAttribute('colspan','1');
  cellDate.setAttribute('align','center'); 
  dte.size = 9;
  cellDate.appendChild(dte);
  
  //'remove' checkbox
  var cellRightSelremove = row.insertCell(3);
  var chkremove = document.createElement('input');
  chkremove.type = "checkbox";
  chkremove.id = 'removeRow' +iteration;
  chkremove.name = 'removeRow' +iteration;
  cellRightSelremove.setAttribute('align', 'center'); 
  cellRightSelremove.appendChild(chkremove);

	sel.onclick =Function("disableProposed("+iteration+")");
	dte.onblur  =Function("isDate(document.getElementById('dateRow"+iteration+"').value)");
}


function keyPressTest(e, obj)
{
    var displayObj = document.getElementById('spanOutput');
    var key;
    if(window.event) {
      key = window.event.keyCode; 
    }
    else if(e.which) {
      key = e.which;
    }
    var objId;
    if (obj != null) {
      objId = obj.id;
    } else {
      objId = this.id;
    }
    displayObj.innerHTML = objId + ' : ' + String.fromCharCode(key);
}

function deleteRow() {
	try {
    	var table = document.getElementById('tblControls');
        var rowCount = table.rows.length;
 
        for(var i=3; i<rowCount; i++) {
        	var row = table.rows[i];
        	
            var chkbox = row.cells[3].childNodes[0];
            if(null != chkbox && true == chkbox.checked) {
            	if(rowCount <= 1) {
                	alert("Cannot delete all the rows.");
                    break;
                }
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    }catch(e) {
	     alert(e);
    }
}


function validateDate() {
	try {
    	var table = document.getElementById('tblControls');
        var rowCount = table.rows.length;
 
        for(var i=3; i<rowCount; i++) {
        	
            var date = document.getElementById('dateRow'+i);
          
            if(!isDate(date.value)) {
            	return false;
            }
        }
    }catch(e) {
	     alert(e);
    }
    return true;
}

function disableProposed(val){
	try {
    	var dtProposed = document.getElementById('dateRow'+val);
		
        dtProposed.disabled = dtProposed.disabled ? false : true;	
       
    }catch(e) {
	     alert(e);
    }
}

function deleteEmptyRows() {
	try {
    	var table = document.getElementById('tblControls');
        var rowCount = table.rows.length;
 
        for(var i=0; i<rowCount; i++) {
        	var row = table.rows[i];
            var field = row.cells[0].childNodes[0];
            if(null != field && "" == field.value) {
            	if(rowCount <= 1) {
                	alert("Cannot delete all the rows.");
                    break;
                }
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    }catch(e) {
	     alert(e);
    }
}


function openInNewWindow(frm)
{
  // open a blank window
  var aWindow = window.open('', 'TableAddRowNewWindow',
   'scrollbars=yes,menubar=yes,resizable=yes,toolbar=no,width=400,height=400');
   
  // set the target to the blank window
  frm.target = 'TableAddRowNewWindow';
  
  // submit
  frm.submit();
}

function validateRow(frm)
{
    var tbl = document.getElementById('tblControls');
    var lastRow = tbl.rows.length - 1;
    var i;
    for (i=1; i<=lastRow; i++) {
      var aRow = document.getElementById('txtRow' + i);
      if (aRow.value.length <= 0) {
        alert('Row ' + i + ' is empty');
        return;
      }
    }
  openInNewWindow(frm);
}
  /****************************************************************************************************************************/

// function to handle the event for the controls on the form
function eventTrigger (e) {
  
    if (! e)
        e = event;
    return e.target || e.srcElement;
}
// function to handle the event for the controls on the form(radio buttons to checkboxes) - high risk notifies

function radioClick (e) {
    
    var obj = eventTrigger (e);
    var notify = document.getElementById &&
                    document.getElementById ('notify');
    if (notify)
{    notify.checked = true;
    return true; 
  }
  
}

/**
 * DHTML date validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/)
 */
// Declaring valid date character, minimum year and maximum year
var dtCh= "/";
var minYear=1900;
var maxYear=2100;

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function isDate(dtStr){
	if(dtStr == ""){
	return true;
	}
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	var strDay=dtStr.substring(0,pos1)
	var strMonth=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
		alert("The date format in safety control measures should be : dd/mm/yyyy")
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		alert("Please enter a valid month in safety control measures")
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		alert("Please enter a valid day in safety control measures")
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear +"in safety control measures")
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		alert("Please enter a valid date in safety control measures")
		return false
	}
return true
}

function ValidateForm(){
	var dt=document.frmSample.txtDate
	if (isDate(dt.value)==false){
		dt.focus()
		return false
	}
    return true
 }
 
 function NeedMoreRiskControls(){
 	var radiol = document.getElementsByName("radiol");
 	var radioc = document.getElementsByName("radioc");
 	var likely;
 	var conseq;
 	var needmore = false;
 	
 	for(var i =0; i< radiol.length; i++){
 		if (radiol[i].checked){
 			likely = radiol[i].value;}
 	}
 	
 	for(var i =0; i< radioc.length; i++){
 		if (radioc[i].checked){
 			conseq = radioc[i].value;}
 	}
 
	// DLJ changed logic on the matrix May2018
// 	if(likely == "Almost Certain") 	{needmore = true;}
//	if(conseq == "Catastrophic" )	{needmore = true;}
//	if(conseq == "Major" )			{needmore = true;}
//	if(likely == "Likely"){
//		if(conseq =="Minor" || conseq == "Moderate")
//									{needmore = true;}
//		}
//		
//	if(likely =="Possible"){
//		if(conseq == "Moderate" || conseq == "major") 
//									{needmore = true;}
//		}



 	if(likely == "Almost Certain") 	{
		if(conseq == "Minor" || conseq == "Moderate" || conseq == "Major" || conseq == "Catastrophic")
									{needmore = true;}
		}

 	if(likely == "Likely") 	{
		if(conseq == "Moderate" || conseq == "Major" || conseq == "Catastrophic")
									{needmore = true;}
		}
 	if(likely == "Possible") 	{
		if(conseq == "Major" || conseq == "Catastrophic")
									{needmore = true;}
		}
 	if(likely == "Unlikely") 	{
		if(conseq == "Catastrophic")
									{needmore = true;}
		}


	return needmore;
	
 }