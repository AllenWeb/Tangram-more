!function(b){
	/*

	 * ���ֽڽ�ȡ�ַ���ʵ�ֱ�̬�汾��Ч�ʱ�ԭ�з���Ҫ�߲��١�

	 * 

	 * path: substrByByte.js

	 * author: lichengyin

	 * version: 1.1.0

	 * date: 2010/03/8

	 */

	//import baidu;
	
	b.more = b.more || {};
	
	/**
	 * ���ֽڽ�ȡ�ַ���
	 
	 
	 * ������ܸպý�ȡ�Ļ�������ȡһ���ֽڡ��磺��ab�ð�cd�� Ҫ��ȡ3���ֽڣ�����Ϊ��ab�á���
	 * ��������ٸ��ֽڵĻ���ʹ�����µĴ��룺
	 * return (source+'').substr(0,length).replace(/([^\x00-\xff])/g,' $1').substr(0,length).replace(/ ([^\x00-\xff])/g,'$1');
	 * 
	 * @param {string} source ��Ҫ����ȡ���ַ���
	 * @param {number} length ��Ҫ��ȡ�Ŀ��
	 * @return {string} ���ؽ�ȡ���
	 */

	b.more.substrByByte = function(source, length){
		return (source+'').substr(0,length).replace(/([^\x00-\xff])/g,'$1 ').substr(0,length).replace(/([^\x00-\xff]) /g,'$1');
	}
}(baidu)