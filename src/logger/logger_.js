/**
 * baidu.more.logger
 * 
 * path: logger_.js
 * author: hudamin
 * version: 1.0.0
 * date: 2010/8/18
 */

/**
 * require baidu.event.on
 * require baidu.browser
 * require baidu.string.format
 * require baidu.dom.getPosition
 * require baidu.string.encodeHTML
 */

//#include "./tangram_.js"

/**
 * ����baidu.more��
 */
baidu.more = baidu.more || {};

baidu.more.logger = (function(){


// ��DEBUG��������Debug�ű�

/*
* Author: Michael Hu
* Date: 2009-9-23
* Version: 
*/


var Observable = (function(){
    function _addObserver(observerObj){
        if(observerObj && typeof observerObj == 'object'
            && observerObj.handleMessage 
            && 'function' == typeof observerObj.handleMessage){
            this.observers.push(observerObj);
        }
    }

    function _notify(message){
        var obs = this.observers;
        for(var i=0; i<obs.length; i++){
            if('function' == typeof obs[i].handleMessage)
                obs[i].handleMessage(message);
        }
    }

    return {
        addObserver: _addObserver,
        notify: _notify
    };
})();
/*
* Author: Michael Hu
* Date: 2010/1/14
* Version: 
*/


function extend(objSrc, objDest){
    for(var i in objSrc){
        objDest[i] = objSrc[i];
    }
}
/*
* Author: Michael Hu
* Date: 2009-9-23
* Version: 
*/


/**
 * ��ֹ�¼�ð��
 * @param {event object} e �¼�����
 */
function stopPropagation(e){
    if(window.attachEvent){
        e.cancelBubble = true;
    }
    else if(window.addEventListener){
        e.stopPropagation();
    }
}
/*
* Author: Michael Hu
* Date: 2010/5/3
* Version: 
*/

function preventDefault(e){
    var e = e || window.event;
    /*
    if(baidu.ie) e.returnValue =false;
    else e.preventDefault();
    */

    // �޸���2010/8/22
    if(e.preventDefault){
        e.preventDefault();
    }
    else{
        e.returnValue = false;
    }
}
/*
* Author: Michael Hu
* Date: 2010/5/3
* Version: 
*/

function getMousePos(e){
    var pt = {left:0, top:0}, 
        evt = e || window.event,
        docElement = document.documentElement, 
        body = document.body || { scrollLeft: 0, scrollTop: 0 };

    pt.left = evt.pageX 
        || (evt.clientX + (docElement.scrollLeft || body.scrollLeft) - (docElement.clientLeft || 0));
    pt.top = evt.pageY 
        || (evt.clientY + (docElement.scrollTop || body.scrollTop) - (docElement.clientTop || 0));
    return pt;
}
/*
* Author: Michael Hu
* Date: 2010/4/20
* Version: 
*/

/**
 * �����ʽ����
 * @param {string} selector cssѡ����
 * @param {string} rule ��ʽ���򣬲�����{��}��IE�²���Ϊ���ַ���
 */
function addStyle(selector, rule){
    if(document.styleSheets.length == 0){
        var oStyle = document.createElement('STYLE');
        document.getElementsByTagName('HEAD')[0].appendChild(oStyle);
    }
    var styleSheet = document.styleSheets[document.styleSheets.length - 1];
    if (styleSheet.addRule) {
        styleSheet.addRule(selector, rule);
    }
    else if (styleSheet.insertRule) {
        styleSheet.insertRule(selector + " { " + rule + " }", styleSheet.cssRules.length);
    }
}


/*
* Author: Michael Hu
* Date: 2010/5/3
* Version: 
*/

/**
 * �Զ���ؼ��ӿ���
 * @
 * @
 */
function IMcControl(options){
}

IMcControl.prototype.init = function(){};

IMcControl.prototype.registerEvent = function(){};

IMcControl.prototype.handleMessage = function(){};

extend(Observable, IMcControl.prototype);


/*
* Author: Michael Hu
* Date: 2010/5/3
* Version: 
*/

function McControlTitleBar(options){
    if('undefined' == typeof options){
        options = {};
    }
    this.frame = null;
    this.iconImg = null;
    this.captionDiv = null;
    this.closeBtn = null;
    this.minimizeBtn = null;
    this.normalizeBtn = null;

    // http://tc-tstest01.tc.baidu.com:8888/img/mc_win_icon.png
    this.icon = options.icon || 'http://tc-tstest01.tc.baidu.com:8888/img/mc_win_icon.png';
    this.caption = options.caption || 'MC�½�����';
    this.parent = null;
    this.observers = [];
}

// ʵ��IMcControl�ӿ�
McControlTitleBar.prototype = new IMcControl();
McControlTitleBar.prototype.constructor = McControlTitleBar;

McControlTitleBar.prototype.init = function(parent){
    this.frame = document.createElement('DIV');
    this.iconImg = document.createElement('IMG');
    this.captionDiv = document.createElement('DIV');
    this.closeBtn = document.createElement('DIV');
    this.minimizeBtn = document.createElement('DIV');
    this.normalizeBtn = document.createElement('DIV');

    //this.closeBtn.innerHTML = 'X';
    //this.minimizeBtn.innerHTML = '-';
    //this.normalizeBtn.innerHTML = '+';

    this.frame.className = 'mc_win_title_frame';
    this.iconImg.className = 'mc_win_title_icon';
    this.captionDiv.className = 'mc_win_title_caption';
    this.closeBtn.className = 'mc_win_title_close_btn';
    this.minimizeBtn.className = 'mc_win_title_minimize_btn';
    this.normalizeBtn.className = 'mc_win_title_normalize_btn';

    this.frame.appendChild(this.iconImg);
    this.frame.appendChild(this.captionDiv);
    this.frame.appendChild(this.closeBtn);
    this.frame.appendChild(this.normalizeBtn);
    this.frame.appendChild(this.minimizeBtn);

    this.iconImg.setAttribute('src', this.icon);
    this.captionDiv.innerHTML = baidu.encodeHTML(this.caption);

    this.parent = parent;
    this.registerEvent();
};

McControlTitleBar.prototype.registerEvent = function(){
    var me = this;

    // ��ʼ�϶�
    // todo: ���safari�µ��϶����⣬�Լ��ı�ѡ������
    baidu.on(this.frame, 'mousedown', function(e){
        e = e || window.event;
        var target = me.frame,
            mousePos = getMousePos(e),
            targetPos = baidu.dom.getPosition(target), offset;

        offset = {
            left: targetPos.left - mousePos.left,
            top: targetPos.top - mousePos.top
        };

        me.notify({type:'M_DRAG_START', param:{
            offset: offset,
            target: target
        }});

        stopPropagation(e);
        preventDefault(e);
    });

    baidu.on(this.closeBtn, 'mousedown', function(e){
        me.notify({type:'M_WIN_CLOSE', param:{}});
    });

    baidu.on(this.minimizeBtn, 'mousedown', function(e){
        me.notify({type:'M_WIN_MINIMIZE', param:{}});
    });

    baidu.on(this.normalizeBtn, 'mousedown', function(e){
        me.notify({type:'M_WIN_NORMALIZE', param:{}});
    });

    baidu.on(document, 'keyup', function(e){
        e = e || window.event;
		var code = 113; //F2 key
					
		if ( e && e.keyCode == code ) {
            me.notify({type:'M_WIN_NORMALIZE', param:{}});
		}
    });

};

McControlTitleBar.prototype.handleMessage = function(){};



/*
* Author: Michael Hu
* Date: 2010/5/3
* Version: 
*/

function McControlMenuBar(options){
    if('undefined' == typeof options) options = {};
    this.frame = null;

    this.parent = null;
    this.menu = options.menu || [
        {
        caption: '�˳�',
        id: 'ID_EXIT',
        extra: '',
        submenu: []
        },   
        {
        caption: '����',
        id: 'ID_ABOUT',
        extra: '',
        submenu: []
        }   
    ];
    this.menuTpl = '<a prop="#{id}" extra="#{extra}" class="mc_win_menu_btn#{className}">#{caption}</a>';
    this.observers = [];
}

// ʵ��IMcControl�ӿ�
McControlMenuBar.prototype = new IMcControl();
McControlMenuBar.prototype.constructor = McControlMenuBar;

McControlMenuBar.prototype.hide = function(){
    this.frame && (this.frame.style.display = 'none');
};

McControlMenuBar.prototype.show = function(){
    this.frame && (this.frame.style.display = 'block');
};

McControlMenuBar.prototype.showMenu = function(){
    var arr = [];
    for(var i=0; i<this.menu.length; i++){
        arr.push(baidu.format(this.menuTpl, {
            id: this.menu[i].id,
            className: (this.menu[i].isCur?' mc_win_menu_btn_cur':''),
            caption: this.menu[i].caption,
            extra: this.menu[i].extra
        }));
    }

    this.frame.innerHTML = arr.join('');
};

McControlMenuBar.prototype.init = function(parent){
    this.frame = document.createElement('DIV');
    //this.frame.innerHTML = 'menu';
    //this.closeBtn.innerHTML = 'X';
    //this.minimizeBtn.innerHTML = '-';
    //this.normalizeBtn.innerHTML = '+';

    this.frame.className = 'mc_win_menu_frame';

    this.showMenu();
    this.registerEvent();

    this.parent = parent;
};

McControlMenuBar.prototype.registerEvent = function(){
    var me = this;
    baidu.on(this.frame, 'mousedown', function(e){
        e = e || window.event;
        var target = e.target || e.srcElement, curBtn = null;

        if(1 == target.nodeType && 'A' == target.tagName.toUpperCase()){
            var prop = target.getAttribute('prop'), btns = me.frame.getElementsByTagName('a');
            ;
            // �رյ�ǰ��ť
            for(var i=0; i<btns.length; i++){
                if(/mc_win_menu_btn_cur/.test(btns[i].className)){
                    btns[i].className = 'mc_win_menu_btn';
                    curBtn = btns[i];
                }
            }
            me.notify({type:'M_MENU_COMMAND', param:{cmd:prop, target:target, curBtn:curBtn}});
        }
    });
};

McControlMenuBar.prototype.handleMessage = function(){};



/*
* Author: Michael Hu
* Date: 2010/5/3
* Version: 
*/

function McControlClientArea(options){
    this.frame = null;

    this.view = null;
    this.parent = null;
    this.observers = [];

    this.text = '';

    // setContent�������
    this.onsetcontent = null;
    this.data = null;

    if('undefined' == typeof options){
        return;
    }
    // �û��Զ��崦����
    this.onscroll = options.onscroll || function(e){};
}

// ʵ��IMcControl�ӿ�
McControlClientArea.prototype = new IMcControl();
McControlClientArea.prototype.constructor = McControlClientArea;

McControlClientArea.prototype.hide = function(){
    this.frame && (this.frame.style.display = 'none');
};

McControlClientArea.prototype.show = function(){
    this.frame && (this.frame.style.display = 'block');
};

McControlClientArea.prototype.setText = function(){
    this.view.innerHTML = this.text;
};

// ���ô������ݣ�չ���߼��ɵ������ṩ
McControlClientArea.prototype.setContent = function(){
    if(!this.onsetcontent){
        ;
        return;
    }

    if('function' != typeof this.onsetcontent){
        ;
        return;
    }

    if(!this.view){
        ;
        return;
    }

    ;
    this.onsetcontent(this.view, this.data);
};

/**
 * ���ô�ֱ��������λ��
 * @
 * @
 */
McControlClientArea.prototype.vScroll = function(pos){
    switch(pos){
        case 'TOP':
            // ע����Щֵ����û��px
            this.view.scrollTop = 0;
            break;
        case 'BOTTOM':
            ;
            // ��������һ������scrollTop���ֵ��ֵ��ȷ����������ܹ������ײ�
            this.view.scrollTop = this.view.scrollHeight;
            break;
    }
};


McControlClientArea.prototype.init = function(parent){
    this.frame = document.createElement('DIV');
    this.view = document.createElement('DIV');
    this.frame.appendChild(this.view);

    this.frame.className = 'mc_win_clientarea_frame';
    this.view.className = 'mc_win_clientarea_view';

    this.parent = parent;

    this.registerEvent();
};

McControlClientArea.prototype.registerEvent = function(){
    var me = this;

    baidu.on(this.view, 'scroll', function(e){
        ;
        me.onscroll();
    });
};

McControlClientArea.prototype.handleMessage = function(message){
    switch(message.type){
        case 'M_SET_TEXT':
            ;
            this.text = message.param.text;
            this.setText();
            break;
        case 'M_SET_CONTENT':
            ;
            this.onsetcontent = message.param.handler;
            this.data = message.param.data;
            this.setContent();
            break;
        case 'M_VSCROLL':
            ;
            this.vScroll(message.param.pos);
            break;
    }
};



/*
* Author: Michael Hu
* Date: 2010/5/3
* Version: 
*/

function McControlWindow(options){
    if('undefined' == typeof options){
        options = {};
    }
    this.frame = null;
    this.titleBar = null;
    this.menuBar = null;
    this.clientArea = null;

    this.dragMoveHash = null;
    this.dragEndHash = null;

    this.lastHeight = 0;
    this.observers = [];

    this.options = options;

    // ����״̬��NORMAL, MINIMIZED, MAXIMIZED, HIDE
    this.status = '';
}

// ʵ��IMcControl�ӿ�
McControlWindow.prototype = new IMcControl();
McControlWindow.prototype.constructor = McControlWindow;

// ��С�����ڣ�ֻ����������
McControlWindow.prototype.minimize = function(){
    if('MINIMIZED' == this.status) return;
    // ���ؿͻ����Ͳ˵���
    this.clientArea && this.clientArea.hide();
    this.menuBar && this.menuBar.hide();
    // ��¼��ǰ���ڵ�λ����Ϣ
    this.lastHeight = this.frame.offsetHeight;
    this.lastTop = parseInt(this.frame.style.top);
    this.lastLeft = parseInt(this.frame.style.left);

    ;
    ;
    ;

    if(this.frame){
        this.frame.style.height = this.titleBar.frame.offsetHeight + 'px';
        this.frame.style.top = 'auto';
        this.frame.style.bottom = '0px';
        this.frame.style.left = '0px';

    }
    else{
    
    }

    this.status = 'MINIMIZED';
};

// ���ڳ�̬����������С��չ��
McControlWindow.prototype.normalize = function(){
    if('NORMAL' == this.status) return;
    // չ�ֿͻ����Ͳ˵���
    this.clientArea && this.clientArea.show();
    this.menuBar && this.menuBar.show();

    ;
    ;
    ;
    if(this.frame){
        this.frame.style.height = this.lastHeight + 'px';
        this.frame.style.top = this.lastTop + 'px';
        this.frame.style.left = this.lastLeft + 'px';
        this.frame.style.bottom = 'auto';
    }
    else{
    
    }

    //this.status = 'NORMAL';
    this.show();
};

McControlWindow.prototype.maximize = function(){};


McControlWindow.prototype.show = function(){
    this.frame && (this.frame.style.display = 'block');
    this.status = 'NORMAL';
};

McControlWindow.prototype.hide = function(){
    this.frame && (this.frame.style.display = 'none');
    this.status = 'HIDE';
};

/**
 * �����û�����ֱ��������λ��
 * @param {string} pos λ�ò�����ȡֵ'TOP', 'BOTTOM'
 * @
 */
McControlWindow.prototype.vScroll = function(pos){
    if('undefined' == typeof pos){
        return;
    }
    if('TOP' != pos && 'BOTTOM' != pos){
        return;
    }

    this.notify({type:'M_VSCROLL', param:{pos:pos}});
};

McControlWindow.prototype.setText = function(text){
    this.notify({type:'M_SET_TEXT', param:{text: text}});
};

/**
 * ���ô�������
 * @param {function} handler չ���߼�����������������������view��data
 * @param {json} data ��Ҫչ�ֵ�����
 */
McControlWindow.prototype.setContent = function(handler, data){
    this.notify({type:'M_SET_CONTENT', param:{handler:handler, data:data}});
};

McControlWindow.prototype.getText = function(){
    //this.notify({type:'M_SET_TEXT', param:{text: text}});
    return this.clientArea.view.innerHTML;
};



McControlWindow.prototype.addStyle = function(){
    // http://tc-tstest01.tc.baidu.com:8888/resource/img/bg_mcdebug.gif
    addStyle('div.mc_win_frame', 'position:absolute; width:200px; height:200px; overflow:hidden; background:#fff;');
    addStyle('div.mc_win_title_frame', 'position:relative; height:22px; cursor:move; border:1px solid #89A0BC; background:#ddd url(http://tc-tstest01.tc.baidu.com:8888/resource/img/bg_mcdebug.gif) repeat-x 0 -31px;');
    addStyle('img.mc_win_title_icon', 'float:left; width:18px; height:18px; margin-left:3px; margin-top:2px; border:0;');
    addStyle('div.mc_win_title_caption', 'display:inline; float:left; height:18px; margin-left:5px; font:bold 12px/22px normal; color:#000;');
    addStyle('div.mc_win_title_close_btn', 'display:inline; float:right; width:32px; height:18px; margin-right:5px; margin-top:2px; overflow:hidden; cursor:pointer; background:url(http://tc-tstest01.tc.baidu.com:8888/resource/img/bg_mcdebug.gif) no-repeat -69px 0;');
    addStyle('div.mc_win_title_minimize_btn', 'display:inline; float:right; width:32px; height:18px; margin-right:5px; margin-top:2px; overflow:hidden; cursor:pointer; background:url(http://tc-tstest01.tc.baidu.com:8888/resource/img/bg_mcdebug.gif) no-repeat 1px 0;');
    addStyle('div.mc_win_title_normalize_btn', 'display:inline; float:right; width:32px; height:18px; margin-right:5px; margin-top:2px; overflow:hidden; cursor:pointer; background:url(http://tc-tstest01.tc.baidu.com:8888/resource/img/bg_mcdebug.gif) no-repeat -33px 0;');
    addStyle('div.mc_win_menu_frame', 'height:18px; overflow:hidden; border:1px solid #89A0BC; border-width:0 1px; background:#aaa;');
    addStyle('div.mc_win_menu_frame a.mc_win_menu_btn', 'float:left; margin-left:8px; padding:0 4px; cursor:pointer; color:#000; font:normal 12px/18px normal; text-decoration:none; background:transparent;');
    addStyle('div.mc_win_menu_frame a.mc_win_menu_btn:link', 'text-decoration:none;');
    addStyle('div.mc_win_menu_frame a.mc_win_menu_btn:visited', 'text-decoration:none;');
    // todo: IE6��hover�¼���Ч
    addStyle('div.mc_win_menu_frame a.mc_win_menu_btn:hover', 'color:#fff; text-decoration:none; background:#666;');
    addStyle('div.mc_win_menu_frame a.mc_win_menu_btn_cur', 'color:#fff; text-decoration:none; background:#666;');
    addStyle('div.mc_win_menu_frame a.mc_win_menu_btn_cur:link', 'color:#fff; text-decoration:none; background:#666;');
    addStyle('div.mc_win_menu_frame a.mc_win_menu_btn_cur:visited', 'color:#fff; text-decoration:none; background:#666;');
    addStyle('div.mc_win_menu_frame a.mc_win_menu_btn_cur:hover', 'color:#fff; text-decoration:none; background:#666;');
    addStyle('div.mc_win_clientarea_frame', 'width:auto;');
    addStyle('div.mc_win_clientarea_view', 'overflow:auto; border:1px solid #89A0BC; border-width:0 1px 1px; padding:0 5px; color:#666; font:normal 12px/18px arial,sans-serif; background-color:#fff; height:' + (this.frame.offsetHeight - 46) + 'px');
    // ռλ��ʽ
    addStyle('div.spacer_rule_1', 'width:auto;');
    addStyle('div.spacer_rule_2', 'width:auto;');
};

McControlWindow.prototype.moveTo = function(){};

McControlWindow.prototype.resize = function(){};

McControlWindow.prototype.oncommand = function(param){
    if('undefined' == typeof param){
        ;
        return;
    }
    var cmd = param.cmd, target = param.target;

    if(this.customOnCommand(param)){
        return;
    }
    // Ĭ�ϴ����߼�
    switch(cmd){
        case 'ID_EXIT':
        case 'ID_ABOUT':
            ;
            break;
    }
};

McControlWindow.prototype.registerEvent = function(){
    
};

/**
 * ���ڳ�ʼ������
 * @param {json} options optional ������������������ֶ�
 *    left: ������
 *    top: ������
 *    height: �߶�
 *    width: ���
 *    zIndex: ��ֵ
 *    status: ��ʼչ��״̬
 */
McControlWindow.prototype.init = function(options){
    options = options || {};
    var oBody = document.getElementsByTagName('BODY')[0];

    this.customOnCommand = options.oncommand || function(param){return false;};

    this.frame = document.createElement('DIV');
    this.titleBar = new McControlTitleBar(options);
    this.menuBar = new McControlMenuBar(options);
    this.clientArea = new McControlClientArea(options);

    this.titleBar.init();
    this.menuBar.init();
    this.clientArea.init();

    oBody.appendChild(this.frame);
    this.titleBar.frame && this.frame.appendChild(this.titleBar.frame);
    this.menuBar.frame && this.frame.appendChild(this.menuBar.frame);
    this.clientArea.frame && this.frame.appendChild(this.clientArea.frame);

    this.frame.className = 'mc_win_frame';
    // ��Щֵ������px
    this.frame.style.left = (options.left || 20) + 'px';
    this.frame.style.top = (options.top || 30) + 'px';
    this.frame.style.height = (options.height || 200) + 'px';
    this.frame.style.width = (options.width || 200) + 'px';
    this.frame.style.zIndex = (options.zIndex || 2000);

    this.addStyle();

    if(options.status){
        switch(options.status){
            case 'NORMAL':
                this.normalize();
                break;
            case 'MINIMIZED':
                this.minimize();
                break;
            case 'MAXIMIZED':
                this.maximize();
                break;
            case 'HIDE':
                this.hide();
                break;
            default:
                this.normalize();
                break;
        }
    }
    else{
        this.normalize();
    }

    this.addObserver(this.titleBar);
    this.addObserver(this.menuBar);
    this.addObserver(this.clientArea);

    this.titleBar.addObserver(this);
    this.menuBar.addObserver(this);
    this.clientArea.addObserver(this);
};

/**
 * �����϶���ʼ����
 * @param {dom object} target ��Ҫ����IEϵ�����������������
 * todo: ���safari�µ��϶����ı�ѡ������
 */
McControlWindow.prototype.dragStart = function(target){
    var me = this;

    this.dragMoveHash = Math.random();
    this.dragEndHash = Math.random();

    McControlWindow[this.dragMoveHash] = function(e){
        me.dragMove.call(me, e);
    };

    McControlWindow[this.dragEndHash] = function(e){
        me.dragEnd.call(me, e);
    };

    ;

    if(!baidu.ie){
        document.addEventListener('mousemove', McControlWindow[this.dragMoveHash], false);
        document.addEventListener('mouseup', McControlWindow[this.dragEndHash], false);
    }
    else{
        target.setCapture();
        target.attachEvent('onmousemove', McControlWindow[this.dragMoveHash]);
        target.attachEvent('onmouseup', McControlWindow[this.dragEndHash]);
        target.attachEvent('onlosecapture', McControlWindow[this.dragEndHash]);
    }
};

McControlWindow.prototype.dragMove = function(e){
    e = e || window.event;

    var mousePos = getMousePos(e),
        offset = this.mouseOffset, newTop, newLeft, sz;

    function documentSize(){
        var size = {width:0, height:0};

        if(document.documentElement && document.documentElement.scrollWidth){
            size.width = document.documentElement.scrollWidth;
            size.height = document.documentElement.scrollHeight;
        }
        else if(document.body.scrollWidth){
            size.width = document.body.scrollWidth;
            size.height = document.body.scrollHeight;
        }

        return size;
    }
    sz = documentSize();

    ;
    //;
    newTop = mousePos.top + offset.top;
    newLeft = mousePos.left + offset.left;

    if(0 > newTop){
        newTop = 0;
    }

    // webkit���ĵ��������Ҫ���⴦����scrollHeightͬ�����������һ����
    // ֻ���������ݵĲ��ֵĸ߶ȣ�û�й�����������£�С��window.innerHeight
    if(baidu.isWebkit){
        sz.height = Math.max(window.innerHeight, sz.height);
    }

    if(newTop + this.frame.offsetHeight > sz.height){
        newTop = sz.height - this.frame.offsetHeight;
    }

    if(0 > newLeft){
        newLeft = 0;
    }
    if(newLeft + this.frame.offsetWidth > sz.width){
        newLeft = sz.width - this.frame.offsetWidth;
    }

    this.frame.style.top = newTop + 'px';
    this.frame.style.left = newLeft + 'px';

    stopPropagation(e);
    preventDefault(e);
};

McControlWindow.prototype.dragEnd = function(e){
    e = e || window.event;

    var me = this,
        target = this.titleBar.frame;

    if(baidu.ie){
        ;
        target.detachEvent('onlosecapture', McControlWindow[this.dragEndHash]);
        target.detachEvent('onmouseup', McControlWindow[this.dragEndHash]);
        target.detachEvent('onmousemove', McControlWindow[this.dragMoveHash]);
        target.releaseCapture();
    }
    else{
        document.removeEventListener('mousemove', McControlWindow[this.dragMoveHash], false);
        document.removeEventListener('mouseup', McControlWindow[this.dragEndHash], false);
    }

    McControlWindow[this.dragMoveHash] = null;
    McControlWindow[this.dragEndHash] = null;
    this.dragMoveHash = this.dragEndHash = null;

    stopPropagation(e);
    preventDefault(e);
};

McControlWindow.prototype.handleMessage = function(message){
    switch(message.type){
        case 'M_DRAG_START':
            ;
            this.mouseOffset = message.param.offset;
            this.dragStart(message.param.target);
            ;
            break;

        case 'M_WIN_CLOSE':
            ;
            this.hide();
            break;

        case 'M_WIN_MINIMIZE':
            ;
            this.minimize();
            break;

        case 'M_WIN_NORMALIZE':
            this.normalize();
            break;

        case 'M_MENU_COMMAND':
            ;
            this.oncommand(message.param);
            break;
    }
};



/*
* Author: Michael Hu
* Date: 2010/5/3
* Version: 
*/

//�ṩJS��д���������������Ϣ
var McDebug = (function(logLevel){
    // ��־���ݻ���
    var cache = [];
    // ��־�к�
    var ln = 0;
    // ��־����
    var oWin = new McControlWindow();
    // ��־����
    var level = logLevel;
    // ��־���ͱ�ǩ
    var labels = {
        '0': '[ ABOUT ]',
        '1': '[ FATAL ] ',
        '2': '[ WARNING ] ',
        '4': '[ NOTICE ] ',
        '8': '[ TRACE ] ',
        '16': '[ DEBUG ] '
    };
    // ��ǰ��־���Ͱ�ť
    var curBtn = null;

    // ��¼������Ϣ���Ƿ��Ѿ���ӵ�DOM Tree
    var bAppend = false;
    // ��¼cache�����Ƿ�flush
    var bFlushed = false;
    // ������Ϣ
    var sAbout = 'FE Logger V2.0';

    // ע��onload�¼���ȷ��DOM Ready֮�����append���������ö�Ӧ״̬λ
    baidu.on(window, 'load', function(){
        // ����DOM Ready�Ž���append��������ܵ����������ֹ�������ر���IE6
        addStyle('p.mc_debug_line', 'margin-top:5px; font:normal 12px/16px arial,sans-serif;');
        addStyle('p.mc_debug_panel', 'display:inline; float:left; margin-top:5px; padding-bottom:2px; font:normal 12px/16px arial,sans-serif; border-top:1px solid #888;');
        addStyle('span.mc_debug_index', 'font-weight:bold; color:#DB0D0F;');
        addStyle('span.mc_debug_info', 'margin-left:5px; color:#666;');
        addStyle('button.mc_debug_btn', 'float:left; margin:5px 0 0 20px; width:60px; height:20px;');
        addStyle('span.mc_debug_filter', 'float:left; margin:4px 0 0 10px;');
        addStyle('span.mc_debug_filter label', 'font-size:10px;');
        // ռλ��ʽ
        addStyle('div.spacer_rule_1', 'width:auto;');
        addStyle('div.spacer_rule_2', 'width:auto;');

        // ��ʼ�����Դ���
        oWin.init({
            width: 400, 
            height: 400, 
            zIndex: 3000, 
            status: 'MINIMIZED',
            icon: '',
            caption: 'JS��־��Ϣ',
            menu: [
                {caption:'CLEAR', id:'ID_CLEAR', extra:'', submenu:[]}, 
                {caption:'DEBUG', id:'ID_DEBUG', extra:'16', submenu:[], isCur:(16==level?true:false)}, 
                {caption:'TRACE', id:'ID_TRACE', extra:'8', submenu:[], isCur:(8==level?true:false)}, 
                {caption:'NOTICE', id:'ID_NOTICE', extra:'4', submenu:[], isCur:(4==level?true:false)}, 
                {caption:'WARNING', id:'ID_WARNING', extra:'2', submenu:[], isCur:(2==level?true:false)}, 
                {caption:'FATAL', id:'ID_FATAL', extra:'1', submenu:[], isCur:(1==level?true:false)},
                {caption: 'ABOUT', id: 'ID_ABOUT', extra: '0', submenu: []}   
            ],
            oncommand: function(param){
                var cmd = param.cmd, target = param.target, curBtn = param.curBtn;

                ;

                // todo: �״ε���İ�ť�����Clear���Ὣ��ǰ��־�������ʽ�����[2010-08-16]���
                switch(cmd){
                    case 'ID_ABOUT':
                        _clear();
                        if(curBtn){
                            curBtn.className = 'mc_win_menu_btn mc_win_menu_btn_cur';
                        }
                        _log(sAbout, 0);
                        break;
                    case 'ID_CLEAR':
                        _clear();
                        if(curBtn){
                            curBtn.className = 'mc_win_menu_btn mc_win_menu_btn_cur';
                        }
                        break;
                    case 'ID_DEBUG':
                    case 'ID_TRACE':
                    case 'ID_NOTICE':
                    case 'ID_WARNING':
                    case 'ID_FATAL':
                        var logLevel = target.getAttribute('extra');
                        if(isNaN(logLevel = parseInt(logLevel))){
                            ;
                            return false;
                        }
                        level = logLevel;
                        _reRender();
                        if(curBtn){
                            curBtn.className = 'mc_win_menu_btn';
                        }
                        target.className = 'mc_win_menu_btn mc_win_menu_btn_cur';
                        break;
                }
                return true;
            }
        });
        // ����������δչ�֣���չ�ֻ�������
        if(!bFlushed){
            _flushCache();
            bFlushed = true;
        }
        // ����append״̬λ
        bAppend = true;
    });

    function _c(tag){
        return document.createElement(tag);
    }

    // ���һ������־
    function _append(view, item){
        var p, span_1, span_2, label;

        // ��ʾ��������־�������־��
        if(item.level > level) return;

        p = _c('P');
        span_1 = _c('SPAN');
        span_2 = _c('SPAN');

        if(!view){
            ;
            return;
        }

        view.appendChild(p);

        p.appendChild(span_1);
        p.appendChild(span_2);

        p.className = 'mc_debug_line';
        span_1.className = 'mc_debug_index';
        span_2.className = 'mc_debug_info';

        span_1.innerHTML = labels[item.level] +  item.time
            + ' [ ' + item.index + ' ]:';
        span_2.innerHTML = baidu.encodeHTML(item.data);

        oWin.vScroll('BOTTOM');
    }

    // ������Ⱦ��־����
    function _reRender(){
        // ����յ��Դ�������
        oWin.setText('');

        // ����չ��cache����
        for(var i=0; i<cache.length; i++){
            oWin.setContent(_append, cache[i]);
        }
    }

    // չ��cache������
    function _flushCache(){
        for(var i=0; i<cache.length; i++){
            oWin.setContent(_append, cache[i]);
        }
    }

    // ��յ��Դ��ں�cache
    function _clear(){
        oWin.setText('');

        cache = [];
    }

    // ��ʾ������Ϣ������append��Ž�����־��ʾ
    function _log(str, logLevel){
        var now = new Date(), time = '';

        time = now.getHours() + ':' + now.getMinutes() + ':'
            + now.getSeconds() + ':' + now.getMilliseconds();

        // DOM Ready����ôֱ����ʾ֮
        if(bAppend){
            // ����������δչ�֣���չ�ֻ�������
            if(!bFlushed){
                _flushCache();
                bFlushed = true;
            }
            oWin.setContent(_append, {
                time: time,
                level: logLevel,
                index: ln + 1,
                data: str
            });
        } 

        cache.push({
            time: time,
            level: logLevel,
            index: ++ln,
            data: str
        });
    }

    function _setLevel(logLevel){
        level = logLevel;
    }

    return {
        // ���������Ϣ��������ݽӿ�
        log: function(str){
            _log(str, 16);
        },
        // ��������
        f: function(str){
            _log(str, 1);
        },
        // ����
        w: function(str){
            _log(str, 2);
        },
        // ����ע��
        n: function(str){
            _log(str, 4);
        },
        // ������־
        t: function(str){
            _log(str, 8);
        },
        // ������־
        d: function(str){
            _log(str, 16);
        },
        setLevel: _setLevel
    };
})(16);


/*
var oWin = new McControlWindow();
oWin.init({left:200, top:60, height:200});

var oWin_1 = new McControlWindow();
oWin_1.init({left:60, top:200, height:300});
*/

return McDebug;

})();


