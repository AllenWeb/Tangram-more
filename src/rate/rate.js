/*
 * @desc : rate ui component for tangram
 * @author xiaoqiang
 * @mail zhengqianglong@baidu.com
 * @ctime 2010-04-22
 * @version 1.0.0
 */

/*
 * Usage:
 * baidu.more.rate.show(ele,options);
 * 
 * @param ele  Ԫ��id�����û����ַ�����ʽ
 * @param options = {
 * 		"total" : 5,	// �ܹ���Ҫ���ٸ����ǡ���ѡ��Ĭ����ʾ5����
 * 		"current" : 3,	// ���ŵ�����������ѡ��Ĭ���ޡ�
 * 		"leave" : function () {} // ����Ƴ��������򴥷���������ѡ��
 * 		"hover" : function (num) {}  // ��꾭���Ĵ������ܺ�������ѡ��
 * 		"click" : function (num) {} // ����Ĵ������ܺ�������ѡ��
 * }
 */

(function(){

		baidu.more = baidu.more || {};
		baidu.more.rate = {};

		// Ĭ�ϲ�������
		var config = {
			'total' : 5,
			'current' : 0
		};

		// Ĭ����ʽ����
		var classon = 'tangram-rate-star-on';
		var classoff = 'tangram-rate-star-off';

		baidu.more.rate.build = function (options) {
			var total = options['total'], cur = options['current'], html = '';
			for (var i=0; i<cur; i++) {
				html += '<span class="tangram-rate-star-on"></span>';
			}
			for (var i=cur; i<total; i++) {
				html += '<span class="tangram-rate-star-off"></span>';
			}
			return html;
		}

		baidu.more.rate.show = function (ele, options) {
			configMerge(options);
			baidu.g(ele).innerHTML = baidu.more.rate.build(config);
			// bind events
			var spans = baidu.g(ele).getElementsByTagName('span');
			for (var i=0,len=spans.length; i<len; i++) {
				baidu.on(spans[i], 'mouseover', function(num){
						return function() {
							render(num+1,ele);
							callback('hover',num+1);
						};
					}(i));
				baidu.on(spans[i], 'click', function(num){
						return function() {
							callback('click',num+1);
						};
					}(i))
			}
			baidu.on(ele, 'mouseout', function(){
					render (config['current'], this);
					callback('leave',null);
				});
		}

		// �����ϲ�
		function configMerge (options) {
			if (options && baidu.isObject(options)) {
				baidu.extend(config, options);
			} 
		}

		// callback
		function callback (type,arg) {
			if (typeof config[type] == "function") {
				config[type](arg);
			}
		}

		// render star (current num, total num, ele)
		function render (c,ele) {
			var spans = baidu.g(ele).getElementsByTagName('span');
			for (var i=1,len=spans.length; i<=len; i++) {
				if (c == 0) {
					spans[i-1].className = classoff;
				} else if (i <= c) {
					if (spans[i-1].className != classon) {
						spans[i-1].className = classon;
					}
				} else {
					if (spans[i-1].className != classoff) {
						spans[i-1].className = classoff;
					}
				}
			}
			spans = null;
		}

	})();

