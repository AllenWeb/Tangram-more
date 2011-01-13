(function () {
	/*
	 * ��������Ч��
	 * 
	 * path: ticker.js
	 * author: lizhouquan
	 * version: 1.1.0
	 * date: 2010/10/19
	 */
	
	/**
	 * ��������Ч��
	 *
	 * @param {string} id ��Ҫչ�ֹ���������id
	 * @param {string} content ��������(֧���ַ�����ʽ�������������ƴ�ӳ��ַ���)
	 * @param options = {
	 *     tWidth : '300px',      //��������Ŀ��
	 *     tHeight : '25px',      //��������ĸ߶�
	 *     tColor : '',           //������ɫ���ձ�ʾ��������ɫ
	 *     moStop : true,         //������ȥ��ʱ���Ƿ�ֹͣ
	 *     tSpeed : 2             //�����ٶ�������������� 1-5(��������)��
     * }
	 */


baidu.more = baidu.more||{};


baidu.more.ticker = function(id,content,options){
    
	options = baidu.extend({
		tWidth : '300px',  //��������Ŀ��
		tHeight : '25px',  //��������ĸ߶�
		tColor : '',       //������ɫ���ձ�ʾ��������ɫ
		moStop : true,     //������ȥ��ʱ���Ƿ�ֹͣ
		tSpeed : 3         //�����ٶ�������������� 1-5(��������)��
	},options);

	
	//��öԹ�������ڵ������
	var tkArea = baidu.g(id);
	
	//������һ�����div, ����ö��������
	tkArea.innerHTML = '<div style="position:absolute;left:0px;top:0px;white-space:nowrap;"><\/div>';
	var tkGenDiv = tkArea.firstChild; 
	
	//�����ڶ������span, ����ö��������
	tkGenDiv.innerHTML='<span>'+content+'<\/span>'; 
	var tkGenSpan = tkGenDiv.firstChild; 
	

	//��һЩ��������
	tkArea.style.position = "relative";
	tkArea.style.width = options.tWidth;
	tkArea.style.height = options.tHeight;
	tkArea.style.overflow = "hidden";
	
	tkGenDiv.style.width=options.tWidth;
	if(options.tColor!=""){
		tkGenSpan.style.color=options.tColor;
	}

	var currentSpd = options.tSpeed; 
	if(options.moStop){
		baidu.on(tkArea, "mouseover", function(e){
			currentSpd=0;
	    });
		baidu.on(tkArea, "mouseout", function(e){
			currentSpd=options.tSpeed;
		});
	}
	//��ʼ���� 
	setInterval(function(){
		tkGenDiv.style.left = (parseInt(tkGenDiv.style.left)>(-10 - tkGenSpan.offsetWidth))?parseInt(tkGenDiv.style.left)-currentSpd+"px" : parseInt(options.tWidth)+10+"px";
	},50);

};

})();