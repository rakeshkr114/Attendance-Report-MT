//Written By: Rakesh Yadav
//Created on: April 25th, 2018


window.onload = function() {

//hrs_value=document.getElementById("hrs_value").value;

chrome.tabs.query({ "url": "https://webapps.mindtree.com/MAS/forms/AttendanceReport.aspx*" }, function (tabs) {

	// if no utube url, return
	if(tabs.length==0)
		return;

	tab=tabs[0];
	
	chrome.tabs.executeScript(tab.id, {
		code:	`var div_elm = document.querySelectorAll('*[class$="105"]');
				var count=div_elm.length;
				//alert("hi");
				//alert(count);
				Total_hrs=0;
				Total_min=0;
				for (var i = 0; i < count; i++){
					//alert(i);
					//alert(Number(div_elm[i].outerText));
					Total_hrs+=Number(div_elm[i].outerText.split(":")[0]);
					//alert(Total_hrs);
					Total_min+=Number(div_elm[i].outerText.split(":")[1]);
				}
				//alert(Total_hrs);
				//alert(Total_min);
				Total_hrs+=Math.floor(Total_min/60);
				Total_min=Total_min%60;
				var Total_Time=""+Total_hrs+":"+Total_min;
				Total_Time;
				`
	},function (Total_Time) { // Execute your code
			document.getElementById("time").innerHTML=Total_Time;  // end of linking Enter btn
	}); // end of chrome executescript for next btn title and play/pause btn attribute
});  // tabs query end

}  //window load end



