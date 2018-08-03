//Written By: @Rakqesh
//Created on: July 31st, 2018


window.onload = function() {


chrome.tabs.query({ "url": "https://webapps.mindtree.com/MAS/forms/AttendanceReport.aspx*" }, function (tabs) {

	// if no AttendanceReport url is opened, return
	if(tabs.length==0){
		document.getElementById("logged_lable").style.display = "none";
		document.getElementById("time").innerHTML="Please open Attendance-Report and generate report for calculation";
		return;
	}	

	tab=tabs[0];
	
	chrome.tabs.executeScript(tab.id, {
		code:	`var div_elm = document.querySelectorAll('*[class$="105"]');
				var count=div_elm.length;
				var holydays=0;
				var half_day_leave=0, other_leaves=0;
				Total_hrs=0;
				Total_min=0;
				for (var i = 0; i < count; i++){
					var parent=div_elm[i].parentElement;
					//weekends
					if(parent.style.backgroundColor == "whitesmoke"){
						holydays++;
					}
					//Half day leave
					else if(parent.nextSibling.nextSibling.firstChild.outerText == "Half Day Leave"){
						half_day_leave++;
						Total_hrs+=Number(div_elm[i].outerText.split(":")[0]);
						Total_min+=Number(div_elm[i].outerText.split(":")[1]);
					}
					//All other kind of leaves
					else if(parent.nextSibling.nextSibling.firstChild.outerText != "No"){
						other_leaves++;
					}
					//working days
					else{
						Total_hrs+=Number(div_elm[i].outerText.split(":")[0]);
						Total_min+=Number(div_elm[i].outerText.split(":")[1]);
					}
				}
				required_half_hrs=Math.floor(half_day_leave/2);
				required_half_min=half_day_leave%2;
				if(required_half_min==1){
					required_half_min=30;
				}
				else
					required_half_min="00";
				
				var Total_Required_Hrs=(count-holydays-other_leaves-required_half_hrs)*9;
				//var Total_Required_Min=
				Total_hrs+=Math.floor(Total_min/60);
				Total_min=Total_min%60;
				var Logged_Hrs_By_Required_Hrs=""+Total_hrs+":"+Total_min+" / "+Total_Required_Hrs+":"+required_half_min;
				Logged_Hrs_By_Required_Hrs;
				`
	},function (Logged_Hrs_By_Required_Hrs) { // Execute your code
			document.getElementById("time").innerHTML=Logged_Hrs_By_Required_Hrs;  // Set value in my.html
			
	}); // end of chrome executescript
});  // tabs query end

}  //window load end



