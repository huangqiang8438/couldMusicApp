
export default async function(url, canvasId, opts) {
	//#ifdef H5
	console.time('获取图片像素')
	const result = Promise.resolve(getImageData(url, opts).then(data => {
		return getCounts(data);
	}))
	console.timeEnd('获取图片像素')
	return result
	//#endif
	
	//#ifdef APP-PLUS
	return changeBackGround(url, canvasId, opts)
	//#endif
}
var getContext = function(width, height) {
	var canvas = document.createElement('canvas');
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);
	return canvas.getContext('2d');
};
var getImageData = function(src, opts) {
	var img = new Image();
	if (!src.startsWith('data')) {
		img.crossOrigin = 'Anonymous';
	}
	return new Promise(function(resolve, reject) {
		img.onload = function() {
			var width = 300;
			var height = 300;
			var context = getContext(width, height);
			context.drawImage(img, 0, 0, width, height);
			var ref = context.getImageData(0, 0, width, height);
			var data = ref.data;
			resolve(data);
		};
		var errorHandler = function() {
			return reject(new Error('An error occurred attempting to load image'));
		};
		img.onerror = errorHandler;
		img.onabort = errorHandler;
		img.src = src;
	});
};

function changeBackGround(url, canvasId, opts) {
	let {
		width = 100, height = 100
	} = opts
	
	return new Promise(resolve => {
		let context = uni.createCanvasContext(canvasId, this)
		context.drawImage(url, 0, 0, width, height)
		context.draw(false, () => {
			uni.canvasGetImageData({
				canvasId: canvasId,
				x: 0,
				y: 0,
				width: width,
				height: height,
				success: (res) => {
				
					resolve(getCounts(res.data))
					
				}
			})
		})
	})
}
function getCounts(data, ignore=['rgb(255,255,255)']) {
	var countMap = {};
	for (var i = 0; i < data.length; i += 4) {
		var alpha = data[i + 3];
		if (alpha === 0) {
			continue;
		}
		var rgbComponents = Array.from(data.subarray(i, i + 3));
		if (rgbComponents.indexOf(undefined) !== -1) {
			continue;
		}
		var color = alpha && alpha !== 255 ? ("rgba(" + (rgbComponents.concat([alpha]).join(',')) + ")") : ("rgb(" + (
			rgbComponents.join(',')) + ")");
		if (ignore.indexOf(color) !== -1) { continue; }
		if (countMap[color]) {
			countMap[color].count++;
		} else {
			countMap[color] = {
				color: color,
				count: 1
			};
		}
	}
	var counts = Object.values(countMap);
	return counts.sort(function(a, b) {
		return b.count - a.count;
	});
}
