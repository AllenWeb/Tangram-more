(function () {
	/*

	 * ʵ��һ���ڵ��Ƿ������һ���ڵ㣬�����ж��ı��ڵ㡣

	 * 

	 * path: contain.js

	 * author: yupeng

	 * version: 1.1.0

	 * date: 2010/11/8

	 */
	 
	 //import baidu;
	/**
	 * �жϰ���һ���ڵ�
	 *
	 * @param {string} id container - ����Ԫ�ػ�Ԫ�ص�id 
	 * @param {string} id contained - ������Ԫ�ػ�Ԫ�ص�id���ı��ڵ�
	 * 
	 */


baidu.more = baidu.more||{};


baidu.more.contain = function(container,contained){
    
	var container = baidu.g(container)|| container;
	var contained = baidu.g(contained) || contained ; 
	while (contained && contained != container)  
		contained = contained.parentNode;  
		return (contained ==container);  
};

})();