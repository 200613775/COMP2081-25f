let bar = document.querySelector("svg #barFill");

let percent = document.querySelector("svg text").textContent;

percent = percent.replaceAll("%", "");
percent = parseInt(percent, 10);

let barWidth = percent + "%";

const cssRulesList = document.styleSheets[0].cssRules;

let svgActiveRule;
for (let i = 0; i < cssRulesList.length; i++) {
	if (cssRulesList[i].selectorText == "svg:active #barFill") {
		svgActiveRule = cssRulesList[i];
	}
}

svgActiveRule.style.setProperty("width", barWidth);
