window.addEventListener("load", function () {
	console.log("It's loaded!");
	startAll();
});

function startAll() {
	$("div:hidden").show();
	window.alert = function () {};
	window.confirm = function () {
		return true;
	};

	if (window.location.href.indexOf("100:7") != -1) {
		mainPage();
	}

	if (window.location.href.indexOf("100:5") != -1) {
		purposePage();
	}

	if (window.location.href.indexOf("100:2") != -1) {
		formPage();
	}

	if (window.location.href.indexOf("100:4") != -1) {
		successPage();
	}
}

function mainPage() {
	$("button")[3].click();
}

function purposePage() {
	$.getScript(
		"https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"
	);
	$("select").select2("open");
	$("#P5_NEW_2").val("5").change();
	$("button").click();
}

function formPage() {
	$("#P2_FNAME").val("احمد").change();
	$("#P2_MNAME").val("خالد").change();
	$("#P2_GNAME").val("كريم").change();
	$("#P2_MOB").val("07923910291").change();
	$("#P2_FAM_NO").val("3").change();
	$("#IDS").val("2").change();
	$("#P2_REQ_NO").val("501").change();
	$("#P2_OFFICE").val("24").change();
	$("#P2_REG_DATE").val("06-09-2020").change();
	$("#P1_PASSWORD").val(solveCaptcha()).change();
	apex.submit({
		request: "CREATE",
	});
}

function successPage() {}

function solveCaptcha() {
	var key = "secret";
	var params = getQueryParams($("img").attr("src"));
	random = params.random;
	alphabet = params.alphabet;
	letters = params.letters;
	captcha = getCaptcha(key, random, letters, alphabet);
	return captcha;
}

function getQueryParams(qs) {
	qs = qs.split("+").join(" ");

	var params = {},
		tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;

	while ((tokens = re.exec(qs))) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
}

function getCaptcha(key, random, letters, alphabet) {
	var encryption_base = key + random;
	if (alphabet != "abcdefghijklmnopqrstuvwxyz" || letters != "6")
		encryption_base += ":" + escape(alphabet) + ":" + letters;
	md5 = new String(str_md5(encryption_base));
	password = "";
	for (var i = 0; i < letters; i++) {
		index = md5.charCodeAt(i) % alphabet.length;
		password += alphabet.charAt(index);
	}

	return password;
}
