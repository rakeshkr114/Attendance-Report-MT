//Written By: @Rakqesh
//Created on: July 31st, 2018


window.onload = function() {


chrome.tabs.query({ "url": "https://webapps.mindtree.com/MAS/forms/AttendanceReport.aspx*" }, function (tabs) {

	// if no AttendanceReport url is opened, return
	if(tabs.length==0)
		return;

	tab=tabs[0];
	
	chrome.tabs.executeScript(tab.id, {
		code:	`var div_elm = document.querySelectorAll('*[class$="105"]');
				var holydays=0
				var count=div_elm.length;
				//alert("hi");
				//alert(count);
				Total_hrs=0;
				Total_min=0;
				for (var i = 0; i < count; i++){
					if(div_elm[i].parentElement.style.backgroundColor == "whitesmoke"){
						holydays++;
					}
					Total_hrs+=Number(div_elm[i].outerText.split(":")[0]);
					//alert(Total_hrs);
					Total_min+=Number(div_elm[i].outerText.split(":")[1]);
				}
				var Total_Required_Hrs=(count-holydays)*9;
				Total_hrs+=Math.floor(Total_min/60);
				Total_min=Total_min%60;
				var Logged_Hrs_By_Required_Hrs=""+Total_hrs+":"+Total_min+" / "+Total_Required_Hrs;
				Logged_Hrs_By_Required_Hrs;
				`
	},function (Logged_Hrs_By_Required_Hrs) { // Execute your code
			document.getElementById("time").innerHTML=Logged_Hrs_By_Required_Hrs;  // Set value in my.html
	}); // end of chrome executescript
});  // tabs query end

}  //window load end



