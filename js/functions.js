var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
$(function () {
	$loveHeart = $("#loveHeart");
	var a = $loveHeart.width() / 2;
	var b = $loveHeart.height() / 2 - 55;
	$garden = $("#garden");
	gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
	gardenCanvas.height = $("#loveHeart").height();
	gardenCtx = gardenCanvas.getContext("2d");
	gardenCtx.globalCompositeOperation = "lighter";
	garden = new Garden(gardenCtx, gardenCanvas);
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2 - 50, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));
	setInterval(function () {
		garden.render()
	}, Garden.options.growSpeed)
});
$(window).resize(function () {
	var b = $(window).width();
	var a = $(window).height();
	if (b != clientWidth && a != clientHeight) {
		location.replace(location)
	}
});

function getHeartPoint(c) {
	var b = c / Math.PI;
	var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
	var d = -20 * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
	return new Array(offsetX + a, offsetY + d)
}

function startHeartAnimation() {
	var c = 60;
	var d = 10;
	var b = new Array();
	var a = setInterval(function () {
		var h = getHeartPoint(d);
		var e = true;
		for (var f = 0; f < b.length; f++) {
			var g = b[f];
			var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
			if (j < Garden.options.bloomRadius.max * 1.3) {
				e = false;
				break
			}
		}
		if (e) {
			b.push(h);
			garden.createRandomBloom(h[0], h[1])
		}
		if (d >= 30) {
			clearInterval(a);
			showMessages()
		} else {
			d += 0.2
		}
	}, c)
}

function updateHeartAnimation() {
    var c = 70;
    var d = 10;
    var b = new Array();
    var flag = 1;
    var a = setInterval(function () {
        var h1 = getHeartPoint(d);
        var h2 = getHeartPoint(39.4-d);
        var e = true;
        for (var f = 0; f < b.length; f++) {
            var g = b[f];
            var j = Math.sqrt(Math.pow(g[0] - h1[0], 2) + Math.pow(g[1] - h1[1], 2));
            if (j < Garden.options.bloomRadius.max * 1.3) {
                e = false;
                break
            }
        }
        if (e == true) {
            b.push(h1);
            b.push(h2);
            garden.clear(h1[0], h1[1])
            garden.clear(h2[0], h2[1])
            garden.createRandomBloom(h1[0], h1[1])
            garden.createRandomBloom(h2[0], h2[1])
        }


        if (d >= 20) {
            //clearInterval(a);
            showMessages()
            b.splice(0)
            flag = 0;
            
        } else if (d <= 10) {
            showMessages()
            b.splice(0)
            flag = 1;
        }


        if (flag == 1) {
            d += 0.2;
        } else if (flag == 0) {
            d = d - 0.2;
        }

    }, c)
}



function timeElapse(c) {
	var e = Date();
	var f = (Date.parse(e) - Date.parse(c)) / 1000;
	var g = Math.floor(f / (3600 * 24));
    f = f % (3600 * 24);
	var b = Math.floor(f / 3600);
	if (b < 10) {
		b = "0" + b
	}
	f = f % 3600;
	var d = Math.floor(f / 60);
	if (d < 10) {
		d = "0" + d
	}
	f = f % 60;
	if (f < 10) {
		f = "0" + f
	}

	g = 599;
	b = 10;
	d = 8;
	f = 40;
	var a = '<span class="digit">' + g + '</span> days <span class="digit">' + b + '</span> hours <span class="digit">' + d + '</span> minutes <span class="digit">' + f + "</span> seconds";
	$("#elapseClock").html(a)
}

function showMessages() {
	adjustWordsPosition();
	$("#messages").fadeIn(5000, function () {
		showLoveU()
	})
}

function adjustWordsPosition() {
	$("#words").css("position", "absolute");
	$("#words").css("top", $("#garden").position().top + 195);
	$("#words").css("left", $("#garden").position().left + 70)
}

function adjustCodePosition() {
	$("#code").css("margin-top", ($("#garden").height() - $("#code").height()) / 2)
}

function showLoveU() {
	$("#loveu").fadeIn(3000)
};