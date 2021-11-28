//判断是否为博主
function sskadmin(e) {
	var ssk = '';
	if(e.user_id=="6279352103223689985"){
		ssk = '<span class="sskadmin">博主「夏天」'
	}
	return ssk+"</span> ";
}
//显UA开始
function ua(e) {
		var r = new Array;
		var outputer = '';
		if (r = e.match(/MSIE\s([^\s|;]+)/gi)) {
			outputer = '<span class="ua_ie">Internet Explorer' + '|' + r[0]/*.replace('MSIE', '').split('.')[0]*/
		} else if (r = e.match(/FireFox\/([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_firefox">Mozilla FireFox' + '|' + r1[1]
		} else if (r = e.match(/Maxthon([\d]*)\/([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_maxthon">Maxthon'
		} else if (r = e.match(/UBrowser([\d]*)\/([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_ucweb">UCBrowser' + '|' + r1[1]
		} else if (r = e.match(/MetaSr/ig)) {
			outputer = '<span class="ua_sogou">搜狗浏览器'
		} else if (r = e.match(/2345Explorer/ig)) {
			outputer = '<span class="ua_2345explorer">2345王牌浏览器'
		} else if (r = e.match(/2345chrome/ig)) {
			outputer = '<span class="ua_2345chrome">2345加速浏览器'
		} else if (r = e.match(/LBBROWSER/ig)) {
			outputer = '<span class="ua_lbbrowser">猎豹安全浏览器'
		} else if (r = e.match(/MicroMessenger\/([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_qq">微信' + '|' + r1[1]/*.split('/')[0]*/
		} else if (r = e.match(/QQBrowser\/([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_qq">QQ浏览器' + '|' + r1[1]/*.split('/')[0]*/
		} else if (r = e.match(/QQ\/([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_qq">QQ浏览器' + '|' + r1[1]/*.split('/')[0]*/
		} else if (r = e.match(/MiuiBrowser\/([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_mi">Miui浏览器' + '|' + r1[1]/*.split('/')[0]*/
		} else if (r = e.match(/Chrome([\d]*)\/([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_chrome">Chrome' + '|' + r1[1]/*.split('.')[0]*/
		} else if (r = e.match(/safari\/([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_apple">Apple Safari' + '|' + r1[1]
		} else if (r = e.match(/Opera[\s|\/]([^\s]+)/ig)) {
			var r1 = r[0].split("/");
			outputer = '<span class="ua_opera">Opera' + '|' + r[1]
		} else if (r = e.match(/Trident\/7.0/gi)) {
			outputer = '<span class="ua_ie">Internet Explorer 11'
		} else {
			outputer = '<span class="ua_other">其它浏览器'
		}
		return outputer+"</span> ";
	}
	function os(e) {
		var os = '';
		if (e.match(/win/ig)) {
			if (e.match(/nt 5.1/ig)) {
				os = '<span class="os_xp">Windows XP'
			} else if (e.match(/nt 6.1/ig)) {
				os = '<span class="os_7">Windows 7'
			} else if (e.match(/nt 6.2/ig)) {
				os = '<span class="os_8">Windows 8'
			} else if (e.match(/nt 6.3/ig)) {
				os = '<span class="os_8_1">Windows 8.1'
			} else if (e.match(/nt 10.0/ig)) {
				os = '<span class="os_8_1">Windows 10'
			} else if (e.match(/nt 6.0/ig)) {
				os = '<span class="os_vista">Windows Vista'
			} else if (e.match(/nt 5/ig)) {
				os = '<span class="os_2000">Windows 2000'
			} else {
				os = '<span class="os_windows">Windows'
			}
		} else if (e.match(/android/ig)) {
			os = '<span class="os_android">Android'
		} else if (e.match(/ubuntu/ig)) {
			os = '<span class="os_ubuntu">Ubuntu'
		} else if (e.match(/linux/ig)) {
			os = '<span class="os_linux">Linux'
		} else if (e.match(/mac/ig)) {
			os = '<span class="os_mac">Mac OS X'
		} else if (e.match(/unix/ig)) {
			os = '<span class="os_unix">Unix'
		} else if (e.match(/symbian/ig)) {
			os = '<span class="os_nokia">Nokia SymbianOS'
		} else {
			os = '<span class="os_other">其它操作系统'
		}
		return os+"</span>" ;
	}
