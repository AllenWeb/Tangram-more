/**
 *  �������ƿռ�
 *  ʹ�ã�
 *      baidu.more.ns("bk.lemma");
 *      //���Զ����жϣ����bk.lemma�����ڣ����Լ�����һ��bk.lemma={};
 *
 */
baidu.more = baidu.more||{};
baidu.more.ns= function(namespace){ 
    var names = namespace.split(".");
    var owner = window;

    for(var i =0,len=names.length;i<len;i++){
        var  packageName = names[i];
        owner[packageName] = (owner[packageName]||{});    
        owner = owner[packageName];
    }
};
