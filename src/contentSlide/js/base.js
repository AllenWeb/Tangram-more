/* Copyright (c) 2010 Baidu, Inc. All Rights Reserved */
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/format.js
 * author: dron, erik
 * version: 1.1.0
 * date: 2009/11/30
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/2
 */

/**
 * ����baidu��
 */
var baidu = baidu || {version: "1-1-0"};


/**
 * ����baidu.string��
 */
baidu.string = baidu.string || {};


/**
 * ��Ŀ���ַ������и�ʽ��
 * 
 * @param {string}          source  Ŀ���ַ���
 * @param {Object|string*}  opts    �ṩ��Ӧ���ݵĶ���
 * @return {string} ��ʽ������ַ���
 */
baidu.string.format = function (source, opts) {
    source = String(source);
    
    if (opts) {
        if ('[object Object]' == Object.prototype.toString.call(opts)) {
            return source.replace(/#\{(.+?)\}/g,
                function (match, key) {
                    var replacer = opts[key];
                    if ('function' == typeof replacer) {
                        replacer = replacer(key);
                    }
                    return ('undefined' == typeof replacer ? '' : replacer);
                });
        } else {
            var data = Array.prototype.slice.call(arguments, 1),
                len = data.length;
            return source.replace(/#\{(\d+)\}/g,
                function (match, index) {
                    index = parseInt(index, 10);
                    return (index >= len ? match : data[index]);
                });
        }
    }
    
    return source;
};

// ������ݷ���
baidu.format = baidu.string.format;

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/g.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/11/17
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * ����baidu.dom��
 */
baidu.dom = baidu.dom || {};


/**
 * ���ĵ��л�ȡָ����DOMԪ��
 * 
 * @param {string|HTMLElement} id Ԫ�ص�id��DOMԪ��
 * @return {HTMLElement} DOMԪ�أ���������ڣ�����null������������Ϸ���ֱ�ӷ��ز���
 */
baidu.dom.g = function (id) {
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};

// ������ݷ���
baidu.g = baidu.G = baidu.dom.g;
G=baidu.g;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/on.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/_listeners.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/_unload.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * ����baidu.event��
 */
baidu.event = baidu.event || {};


/**
 * ж�������¼�������
 * @private
 */
baidu.event._unload = function () {
    var lis = baidu.event._listeners,
        len = lis.length,
        standard = !!window.removeEventListener,
        item, el;
        
    while (len--) {
        item = lis[len];
        el = item[0];
        if (el.removeEventListener) {
            el.removeEventListener(item[1], item[3], false);
        } else if (el.detachEvent){
            el.detachEvent('on' + item[1], item[3]);
        }
    }
    
    if (standard) {
        window.removeEventListener('unload', baidu.event._unload, false);
    } else {
        window.detachEvent('onunload', baidu.event._unload);
    }
};

// ��ҳ��ж�ص�ʱ�򣬽������¼��������Ƴ�
if (window.attachEvent) {
    window.attachEvent('onunload', baidu.event._unload);
} else {
    window.addEventListener('unload', baidu.event._unload, false);
}


/**
 * �¼��������Ĵ洢��
 * @private
 */
baidu.event._listeners = baidu.event._listeners || [];


/**
 * ΪĿ��Ԫ������¼�������
 * 
 * @param {HTMLElement|string|window} element  Ŀ��Ԫ�ػ�Ŀ��Ԫ��id
 * @param {string}                    type     �¼�����
 * @param {Function}                  listener �¼�������
 * @return {HTMLElement} Ŀ��Ԫ��
 */
baidu.event.on = function (element, type, listener) {
    type = type.replace(/^on/i, '');
    if ('string' == typeof element) {
        element = baidu.dom.g(element);
    }

    var fn = function (ev) {
        // ���ﲻ֧��EventArgument
        // ԭ���ǿ�frame��ʱ�����
        listener.call(element, ev);
    },
    lis = baidu.event._listeners;
    
    // ���������洢��������
    lis[lis.length] = [element, type, listener, fn];
    
    // �¼�����������
    if (element.attachEvent) {
        element.attachEvent('on' + type, fn);
    } else if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    }
    
    return element;
};

// ������ݷ���
baidu.on = baidu.event.on;

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/un.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */



/**
 * ΪĿ��Ԫ���Ƴ��¼�������
 * 
 * @param {HTMLElement|string|window} element  Ŀ��Ԫ�ػ�Ŀ��Ԫ��id
 * @param {string}                    type     �¼�����
 * @param {Function}                  listener �¼�������
 * @return {HTMLElement} Ŀ��Ԫ��
 */
baidu.event.un = function (element, type, listener) {
    if ('string' == typeof element) {
        element = baidu.dom.g(element);
    }
    type = type.replace(/^on/i, '');
    
    var lis = baidu.event._listeners, 
        len = lis.length,
        isRemoveAll = !listener,
        item;
    
    while (len--) {
        item = lis[len];
        
        // listener����ʱ���Ƴ�element��������listener������type�����¼�
        // listener������ʱ���Ƴ�element������type�����¼�
        if (item[1] === type
            && item[0] === element
            && (isRemoveAll || item[2] === listener)) {
            if (element.detachEvent) {
                element.detachEvent('on' + type, item[3]);
            } else if (element.removeEventListener) {
                element.removeEventListener(type, item[3], false);
            }
            lis.splice(len, 1);
        }
    }
    
    return element;
};

// ������ݷ���
baidu.un = baidu.event.un;


/**
 * ��ȡĿ��Ԫ�ص�ֱ����Ԫ���б�
 * 
 * @param {HTMLElement|String} element Ŀ��Ԫ�ػ�Ŀ��Ԫ�ص�id
 * @return {Array} DOMԪ���б�
 */
baidu.dom.children = function (element) {
    element = baidu.dom.g(element);

    for (var children = [], tmpEl = element.firstChild; tmpEl; tmpEl = tmpEl.nextSibling) {
        if (tmpEl.nodeType == 1) {
            children.push(tmpEl);
        }
    }
    
    return children;    
};



