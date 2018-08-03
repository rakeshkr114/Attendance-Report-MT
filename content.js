// content.js

function generateReport() {{
			if(sessionStorage.getItem("clickedToGenerate") != "True"){
				//generate Report
				document.getElementsByName("ctl00$ContentRequestor$btnSearch")[0].click();
				sessionStorage.setItem("clickedToGenerate", "True");
			}
			
}
window.onload = generateReport;
