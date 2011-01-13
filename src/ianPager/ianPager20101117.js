/***************************************************************
 *   Create By lion                                            *
 *   2009-12-31 14:37                                          *
 *   Copyright (C) 1998-2005 www.baidu.com All rights reserved.*
 *   Web: http://www.baidu.com                                 *
 *   Email: houjianxun@baidu.com                               *
 ***************************************************************/

/*
* your module name
* 
* path: ianPager.js
* author: ����Ҽ
* version: 1.1.0
* date: 2010/9/10
*/
// Ԥ������
var baidu = baidu || {};
baidu.more = baidu.more || {};
baidu.more.IanPager = function(){return new ianPager();}; 

 /*
���÷�ҳ�ؼ���

Example 1��
var pager = new ianPager();
pager.PageSize(15);
pager.Width("100%");
pager.SubmitButtonStyle("height:20;FONT-SIZE: 10px;");
pager.InputBoxStyle("width:20px;height:18;FONT-SIZE: 10px;");
pager.PagingButtonSpacing("10px");
pager.PrevPageText("��һҳ");
pager.NextPageText("��һҳ");
pager.FirstPageText("��ҳ");
pager.LastPageText("βҳ");
pager.ShowCustomInfoSection("Left");
pager.AlwaysShow(true);
pager.ShowPageIndex(false);
pager.ShowWriteButtonSpace(true);
pager.ShowInputBox("Always");
pager.TextBeforeInputBox("����&nbsp;");
pager.TextAfterInputBox("&nbsp;ҳ&nbsp;&nbsp;");
pager.RecordCount(1000);
pager.CurrentPageIndex(5);
pager.CustomInfoText(pager.Format("&nbsp;&nbsp;ҳ��: <span style=\"color:red;\">{0}</span> / <span style=\"color:red;\">{1}</span>ҳ&nbsp;&nbsp;<span style=\"color:red;\">{2}</span>������/ҳ&nbsp;&nbsp;����&nbsp;<span style=\"color:red;\">{3}</span>&nbsp;������&nbsp;", pager.CurrentPageIndex(), pager.PageCount(), pager.PageSize(), pager.RecordCount()));
pager.UrlPageIndexName("page");
pager.Render();


Example 2��
var pager = new ianPager();
pager.PageSize(15);
pager.Width("100%");
pager.PrevPageText("<<");
pager.NextPageText(">>");
pager.FirstPageText("��ҳ");
pager.LastPageText("βҳ");
pager.ShowMoreButton(false);
pager.RecordCount(1000);
pager.CurrentPageIndex(13);
pager.TextBeforeInputBox("����&nbsp;");
pager.TextAfterInputBox("&nbsp;ҳ&nbsp;&nbsp;");
pager.InputBoxStyle("width:20px;height:18;FONT-SIZE: 10px;");
pager.UrlPageIndexName("page");
pager.Render();


Example 3��
<div id="jspager"></div>
function createJsPager(pageIndex, pageSize)
{
    var pager = new ianPager();
    pager.PageSize(pageSize);
    pager.Width("100%");
    pager.PrevPageText("��һҳ");
    pager.NextPageText("��һҳ");
    pager.FirstPageText("��ҳ");
    pager.LastPageText("βҳ");
    pager.ShowInputBox("None");
    pager.ShowMoreButton(true);
    pager.RecordCount(1000);
    pager.CurrentPageIndex(pageIndex);
    pager.UrlPageIndexName(global_urlPageIndexName);
    pager.CustomJsPageFunction("createJsPager({0},"+ pageSize +")");
    document.getElementById("jspager").innerHTML = pager.Html();
}
createJsPager(global_CurrentPageIndex, global_pageSize);

*/
function ianPager() {
	this.ViewState = {}; 
	this.version = "1.0"; 
	//��ǰҳ��url��ҳ��Ϣ
	this.currentUrl = "";
	//�����ڱ�ͷ����ѯ�ַ����ʹ�������
	this.urlParams = {};
	this.IsIE = /msie (\d+\.\d)/i.test(navigator.userAgent);
}


/*
��ȡ������һ��ֵ����ֵ��ʾ�����ָ����ͣ�ڵ�����ť��ʱ�Ƿ���ʾ������ʾ��
*/
ianPager.prototype.ShowNavigationToolTip = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowNavigationToolTip"];return obj==null?true:obj;}
	else{this.ViewState["ShowNavigationToolTip"] = arguments[0];}
}


/*
��ȡ�����õ�����ť������ʾ�ı��ĸ�ʽ��
*/
ianPager.prototype.NavigationToolTipTextFormatString = function() {
	if(arguments.length==0){var obj = this.ViewState["NavigationToolTipTextFormatString"];return obj==null?"ת����{0}ҳ":obj;}
	else{this.ViewState["NavigationToolTipTextFormatString"] = arguments[0];}
}


/*
��ȡ������ҳ������ֵ������ť�����ֵ���ʾ��ʽ��
ʹ��NumericButtonTextFormatString����ָ��ҳ������ֵ��ť����ʾ��ʽ����δ���ø�ֵʱ������ť�ı������ǣ�1 2 3 ...�����ø�ֵ���ı�������ť�ı�����ʾ��ʽ���罫��ֵ��Ϊ��[{0}]���������ı�����ʾΪ��[1] [2] [3] ...������ֵ��Ϊ��-{0}-�����ʹ�����ı���Ϊ��-1- -2- -3- ...��
*/
ianPager.prototype.NumericButtonTextFormatString = function() {
	if(arguments.length==0){var obj = this.ViewState["NumericButtonTextFormatString"];return obj==null?"":obj;}
	else{this.ViewState["NumericButtonTextFormatString"] = arguments[0];}
}

/*
��ȡ�����÷�ҳ������ť�����ͣ���ʹ�����ֻ���ͼƬ��
*/
/// <remarks>
/// Ҫʹ��ͼƬ��ť������Ҫ׼������ͼƬ����0��9��ʮ����ֵͼƬ����ShowPageIndex��Ϊtrueʱ������һҳ����һҳ����һҳ�����һҳ������ҳ��...�������ťͼƬ����ShowFirstLast��ShowPrevNext����Ϊtrueʱ����
/// ����Ҫʹ��ǰҳ��������ֵ��ť��ͬ�ڱ��ҳ������ֵ��ť������׼����ǰҳ�����İ�ťͼƬ��
/// ����Ҫʹ�ѽ��õĵ�һҳ����һҳ����һҳ�����һҳ��ťͼƬ��ͬ�������İ�ťͼƬ������׼�����ĸ���ť�ڽ���״̬�µ�ͼƬ��
/// <p><b>ͼƬ�ļ��������������£�</b></p>
/// <p>��0��9ʮ����ֵ��ťͼƬ��������Ϊ����ֵ+ButtonImageNameExtension+ButtonImageExtension�������е�ButtonImageNameExtension���Բ������ã�
/// ButtonImageExtension��ͼƬ�ļ��ĺ�׺������ .gif�� .jpg�ȿ��������������ʾ���κ�ͼƬ�ļ����͡���ҳ������1����ͼƬ�ļ�������Ϊ��1.gif����1.jpg����
/// ���������׻������ͼƬ�ļ�ʱ������ͨ��ָ��ButtonImageNameExtension����ֵ�����ֲ�ͬ�׵�ͼƬ�����һ��ͼƬ���Բ�����ButtonImageNameExtension����ͼƬ�ļ��������ڡ�1.gif������2.gif���ȵȣ����ڶ���ͼƬ������ButtonImageNameExtensionΪ��f����ͼƬ�ļ��������ڡ�1f.gif������2f.gif���ȵȡ�</p>
/// <p>��һҳ��ť��ͼƬ�ļ����ԡ�first����ͷ����һҳ��ťͼƬ���ԡ�prev����ͷ����һҳ��ťͼƬ���ԡ�next����ͷ�����һҳ��ťͼƬ���ԡ�last����ͷ������ҳ��ťͼƬ���ԡ�more����ͷ���Ƿ�ʹ��ButtonImageNameExtensionȡ������ֵ��ť�����ü��Ƿ��и�����ͼƬ��</p>
/// </remarks>
ianPager.prototype.PagingButtonType = function() {
	if(arguments.length==0){var obj = this.ViewState["PagingButtonType"];return obj==null?"Text":obj;}
	else{this.ViewState["PagingButtonType"] = arguments[0];}
}

/*
ָ����ǰҳ����������ť����������ҳ������ť�е�λ��
@Beginning  ��ǰҳ��������������ʾ����������ҳ��������ǰ��
@End    ��ǰҳ��������������ʾ����������ҳ�����������
@Center ��ǰҳ��������������ʾ����������ҳ�������м�
@Fixed  Ĭ��ֵ����ǰҳ����λ�ù̶�����
*/
ianPager.prototype.PagingButtonPosition = function () {
    if (arguments.length == 0) { var obj = this.ViewState["PagingButtonPosition"]; return obj == null ? "Fixed" : obj; }
    else { this.ViewState["PagingButtonPosition"] = arguments[0]; }
}


/*
��ȡ������ҳ������ֵ��ť�����ͣ���ֵ����PagingButtonType��ΪImageʱ����Ч��
������PagingButtonType��ΪImage���ֲ�����ҳ������ֵ��ťʹ��ͼƬʱ�����Խ���ֵ��ΪText�����ʹҳ�������ݰ�ťʹ���ı�������ͼƬ��ť��
*/
ianPager.prototype.NumericButtonType = function() {
	if(arguments.length==0){var obj = this.ViewState["NumericButtonType"];return obj==null?this.PagingButtonType:obj;}
	else{this.ViewState["NumericButtonType"] = arguments[0];}
}



/*
��ȡ�����õ�һҳ����һҳ����һҳ�����һҳ��ť�����ͣ���ֵ����PagingButtonType��ΪImageʱ����Ч��
������PagingButtonType��ΪImage���ֲ����õ�һҳ����һҳ����һҳ�����һҳ��ťʹ��ͼƬ������Խ���ֵ��ΪText�����ʹǰ����ĸ���ťʹ���ı�������ͼƬ��ť��
*/
ianPager.prototype.NavigationButtonType = function() {
	if(arguments.length==0){var obj = this.ViewState["NavigationButtonType"];return obj==null?this.PagingButtonType:obj;}
	else{this.ViewState["NavigationButtonType"] = arguments[0];}
}

/*
��ȡ�����á�����ҳ����...����ť�����ͣ���ֵ����PagingButtonType��ΪImageʱ����Ч��
������PagingButtonType��ΪImage���ֲ����ø���ҳ��...����ťʹ��ͼƬʱ�����Խ���ֵ��ΪText�����ʹ����ҳ��ťʹ���ı�������ͼƬ��ť��
*/
ianPager.prototype.MoreButtonType = function() {
	if(arguments.length==0){var obj = this.ViewState["MoreButtonType"];return obj==null?this.PagingButtonType:obj;}
	else{this.ViewState["MoreButtonType"] = arguments[0];}
}

/*
��ȡ�����÷�ҳ������ť֮��ļ�ࡣ
*/
ianPager.prototype.PagingButtonSpacing = function() {
	if(arguments.length==0){var obj = this.ViewState["PagingButtonSpacing"];return obj==null?"5px":obj;}
	else{this.ViewState["PagingButtonSpacing"] = arguments[0];}
}

/*
��ȡ������Ӧ���ڷ�ҳ������ť֮��ļ�༶����ʽ��������
*/
ianPager.prototype.PagingButtonSpacingCssClass = function() {
	if(arguments.length==0){var obj = this.ViewState["PagingButtonSpacingCssClass"];return obj==null?"":obj;}
	else{this.ViewState["PagingButtonSpacingCssClass"] = arguments[0];}
}

/*
��ȡ������Ӧ���ڷ�ҳ������ť֮��ļ��CSS��ʽ�ı�
*/
ianPager.prototype.PagingButtonSpacingStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["PagingButtonSpacingStyle"];return obj==null?"":obj;}
	else{this.ViewState["PagingButtonSpacingStyle"] = arguments[0];}
}

/*
��ȡ������һ��ֵ����ֵָʾ�Ƿ���ҳ����Ԫ������ʾ��һҳ�����һҳ��ť��
*/
ianPager.prototype.ShowFirstLast = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowFirstLast"];return obj==null?true:obj;}
	else{this.ViewState["ShowFirstLast"] = arguments[0];}
}

/*
��ȡ������һ��ֵ����ֵָʾ�Ƿ���ҳ����Ԫ������ʾ��һҳ����һҳ��ť��
*/
ianPager.prototype.ShowPrevNext = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowPrevNext"];return obj==null?true:obj;}
	else{this.ViewState["ShowPrevNext"] = arguments[0];}
}


/*
��ȡ������һ��ֵ����ֵָʾ�Ƿ���ʾ����ҳ��
*/
ianPager.prototype.ShowMoreButton = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowMoreButton"];return obj==null?true:obj;}
	else{this.ViewState["ShowMoreButton"] = arguments[0];}
}

/*
��ȡ������һ��ֵ����ֵָʾ�Ƿ��ڷ�ҳ����Ԫ�ؼ����ո�
*/
ianPager.prototype.ShowWriteButtonSpace = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowWriteButtonSpace"];return obj==null?false:obj;}
	else{this.ViewState["ShowWriteButtonSpace"] = arguments[0];}
}

/*
��ȡ������һ��ֵ����ֵָʾ�Ƿ���ҳ����Ԫ������ʾҳ������ֵ��ť��
*/
ianPager.prototype.ShowPageIndex = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowPageIndex"];return obj==null?true:obj;}
	else{this.ViewState["ShowPageIndex"] = arguments[0];}
}

/*
��ȡ������Ϊ��һҳ��ť��ʾ���ı���
*/
ianPager.prototype.FirstPageText = function() {
	if(arguments.length==0){var obj = this.ViewState["FirstPageText"];return obj==null?"<font face=\"webdings\">9</font>":obj;}
	else{this.ViewState["FirstPageText"] = arguments[0];}
}

/*
��ȡ������Ϊ��һҳ��ť��ʾ���ı���ʽ���
*/
ianPager.prototype.FirstPageTextStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["FirstPageTextStyle"];return obj==null?"padding:6px 0px 0px 0px;margin:0px;":obj;}
	else{this.ViewState["FirstPageTextStyle"] = arguments[0];}
}

/*
��ȡ������Ϊ��һҳ��ť��ʾ���ı���
*/
ianPager.prototype.PrevPageText = function() {
	if(arguments.length==0){var obj = this.ViewState["PrevPageText"];return obj==null?"<font face=\"webdings\">3</font>":obj;}
	else{this.ViewState["PrevPageText"] = arguments[0];}
}

/*
��ȡ������Ϊ��һҳ��ť��ʾ���ı���ʽ���
*/
ianPager.prototype.PrevPageTextStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["PrevPageTextStyle"];return obj==null?"padding:6px 0px 0px 0px;margin:0px;":obj;}
	else{this.ViewState["PrevPageTextStyle"] = arguments[0];}
}

/*
��ȡ������Ϊ��һҳ��ť��ʾ���ı���
*/
ianPager.prototype.NextPageText = function() {
	if(arguments.length==0){var obj = this.ViewState["NextPageText"];return obj==null?"<font face=\"webdings\">4</font>":obj;}
	else{this.ViewState["NextPageText"] = arguments[0];}
}

/*
��ȡ������Ϊ��һҳ��ť��ʾ���ı���ʽ���
*/
ianPager.prototype.NextPageTextStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["NextPageTextStyle"];return obj==null?"padding:6px 0px 0px 0px;margin:0px;":obj;}
	else{this.ViewState["NextPageTextStyle"] = arguments[0];}
}

/*
��ȡ������Ϊ���һҳ��ť��ʾ���ı���
*/
ianPager.prototype.LastPageText = function() {
	if(arguments.length==0){var obj = this.ViewState["LastPageText"];return obj==null?"<font face=\"webdings\">:</font>":obj;}
	else{this.ViewState["LastPageText"] = arguments[0];}
}

/*
��ȡ������Ϊ���һҳ��ť��ʾ���ı���ʽ���
*/
ianPager.prototype.LastPageTextStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["LastPageTextStyle"];return obj==null?"padding:6px 0px 0px 0px;margin:0px;":obj;}
	else{this.ViewState["LastPageTextStyle"] = arguments[0];}
}

/*
��ȡ�������ڿؼ���ҳ����Ԫ����ͬʱ��ʾ����ֵ��ť����Ŀ��
*/
ianPager.prototype.NumericButtonCount = function() {
	if(arguments.length==0){var obj = this.ViewState["NumericButtonCount"];return obj==null?10:obj;}
	else{this.ViewState["NumericButtonCount"] = arguments[0];}
}

/*
��ȡ������һ��ֵ����ֵָ���Ƿ���ʾ�ѽ��õİ�ť��
��ֵ����ָ���Ƿ���ʾ�ѽ��õķ�ҳ������ť������ǰҳΪ��һҳʱ����һҳ����һҳ��ť�������ã�����ǰҳΪ���һҳʱ����һҳ�����һҳ��ť�������ã������õİ�ťû�����ӣ��ڰ�ť�ϵ��Ҳ�������κ����á�
*/
ianPager.prototype.ShowDisabledButtons = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowDisabledButtons"];return obj==null?true:obj;}
	else{this.ViewState["ShowDisabledButtons"] = arguments[0];}
}

/*
��ȡ�����õ�ʹ��ͼƬ��ťʱ��ͼƬ�ļ���·����
*/
ianPager.prototype.ImagePath = function() {
	if(arguments.length==0){var obj = this.ViewState["ImagePath"];return obj==null?"":obj;}
	else{
	    var imgPath = arguments[0];
	    this.ViewState["ImagePath"] = (imgPath.substr(imgPath.length-1)=="/")?imgPath:imgPath+"/";
	}
}

/*
��ȡ�����õ�ʹ��ͼƬ��ťʱ��ͼƬ�����ͣ���gif��jpg����ֵ��ͼƬ�ļ��ĺ�׺����
*/
ianPager.prototype.ButtonImageExtension = function() {
	if(arguments.length==0){var obj = this.ViewState["ButtonImageExtension"];return obj==null?".gif":obj;}
	else{
	    var ext = arguments[0];
	    this.ViewState["ButtonImageExtension"] = (ext.substr(0,1)=="."?ext:"."+ext);
	}
}

/*
��ȡ�������Զ���ͼƬ�ļ����ĺ�׺�ַ����������ֲ�ͬ���͵İ�ťͼƬ��
/// <remarks><note>ע�⣺</note>��ֵ�����ļ���׺��������Ϊ���ֲ�ͬ��ͼƬ�ļ�����ͼƬ���м�����ַ������磺
/// ��ǰ�����װ�ťͼƬ������һ���еġ�1����ͼƬ����Ϊ��1f.gif������һ���еġ�1����ͼƬ������Ϊ��1n.gif�������е�f��n��ΪButtonImageNameExtension��</remarks>
*/
ianPager.prototype.ButtonImageNameExtension = function() {
	if(arguments.length==0){var obj = this.ViewState["ButtonImageNameExtension"];return obj==null?"":obj;}
	else{this.ViewState["ButtonImageNameExtension"] = arguments[0];}
}

/*
��ȡ�����õ�ǰҳ������ť��ͼƬ����׺��
/// <remarks>
/// �� <see cref="PagingButtonType"/> ��Ϊ Image ʱ�����������������õ�ǰҳ������ֵ��ťʹ�õ�ͼƬ����׺�ַ�����˿���ʹ��ǰҳ������ť������ҳ������ťʹ�ò�ͬ��ͼƬ����δ���ø�ֵ����Ĭ��ֵΪ<see cref="ButtonImageNameExtension"/>������ǰҳ������ť������ҳ������ťʹ����ͬ��ͼƬ��
/// </remarks>
*/
ianPager.prototype.CpiButtonImageNameExtension = function() {
	if(arguments.length==0){var obj = this.ViewState["CpiButtonImageNameExtension"];return obj==null?this.ButtonImageNameExtension:obj;}
	else{this.ViewState["CpiButtonImageNameExtension"] = arguments[0];}
}

/*
��ȡ�������ѽ��õ�ҳ������ťͼƬ����׺�ַ�����
/// <remarks>
/// �� <see cref="PagingButtonType"/> ��Ϊ Image ʱ�� ��ֵ�����������ѽ��ã���û�����ӣ����������޷�Ӧ����ҳ������ť��������һҳ����һҳ����һҳ�����һҳ�ĸ���ť����ͼƬ�ļ�����׺�ַ�������˿���ʹ�ѽ��õ�ҳ������ť��ͬ��������ҳ������ť����δ���ø�ֵ����Ĭ��ֵΪ<see cref="ButtonImageNameExtension"/>�����ѽ��õ�ҳ������ť��������ҳ������ťʹ����ͬ��ͼƬ��
/// </remarks>
*/
ianPager.prototype.DisabledButtonImageNameExtension = function() {
	if(arguments.length==0){var obj = this.ViewState["DisabledButtonImageNameExtension"];return obj==null?this.ButtonImageNameExtension:obj;}
	else{this.ViewState["DisabledButtonImageNameExtension"] = arguments[0];}
}


/*
ָ����ʹ��ͼƬ��ťʱ��ͼƬ�Ķ��뷽ʽ��
*/
ianPager.prototype.ButtonImageAlign = function() {
	if(arguments.length==0){var obj = this.ViewState["ButtonImageAlign"];return obj==null?"":obj;}
	else{this.ViewState["ButtonImageAlign"] = arguments[0];}
}

/*
��ȡ�����õ�����Url��ҳ��ʽʱ����url�б�ʾҪ���ݵ�ҳ�����Ĳ��������ơ�
/// <remarks>
/// �������������Զ���ͨ��Url����ҳ����ʱ��ʾҪ���ݵ�ҳ�����Ĳ��������ƣ��Ա��������еĲ������ظ���
/// <p>�����Ե�Ĭ��ֵ�ǡ�page������ͨ��Url��ҳʱ����ʾ���������ַ���е�Url�����ڣ�</p>http://idoall.org/ianpager/aaa.xhtml?page=2 
/// <p>�罫��ֵ��Ϊ��pageindex�����������Url����Ϊ��</p><p>http://idoall.org/ianpager/aaa.xhtml?pageindex=2 </p>
/// </remarks>
*/
ianPager.prototype.UrlPageIndexName = function() {
	if(arguments.length==0){var obj = this.ViewState["UrlPageIndexName"];return obj==null?"":obj;}
	else{this.ViewState["UrlPageIndexName"] = arguments[0];}
}

/*
��ȡ�����õ�ǰ��ʾҳ��������
///<remarks>ʹ�ô�������ȷ���� AspNetPager �ؼ��е�ǰ��ʾ��ҳ����ǰ��ʾ��ҳ�������������Ժ�ɫ����Ӵ���ʾ�������Ի������Ա�̵ķ�ʽ��������ʾ��ҳ��
///<p>��<b>ע�⣺</b>��ͬ��DataGrid�ؼ���CurrentPageIndex��AspNetPager��CurrentPageIndex�����Ǵ�1��ʼ�ġ�</p></remarks>
*/
ianPager.prototype.CurrentPageIndex = function() {
	if(arguments.length==0){
	        var cpage = this.ViewState["CurrentPageIndex"];
	        var pindex = (cpage == null) ? 1 : cpage;
	        if (pindex > this.PageCount())
                return this.PageCount();
            else if (pindex < 1)
                return 1;
            return parseInt(pindex);
	}
	else
	{
	    var cpage = arguments[0];
	    if (cpage < 1)
            cpage = 1;
        else if (cpage > this.PageCount())
            cpage = this.PageCount();
	    this.ViewState["CurrentPageIndex"] = cpage;
	}
}



/*
��ǰ����ҳֵ�ļ�����ʽ��������
*/
ianPager.prototype.CurrentPageIndexCss = function() {
	if(arguments.length==0){var obj = this.ViewState["CurrentPageIndexCss"];return obj==null?"":obj;}
	else{this.ViewState["CurrentPageIndexCss"] = arguments[0];}
}

/*
��ǰ����ҳֵ���ı���ʽ���
*/
ianPager.prototype.CurrentPageIndexStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["CurrentPageIndexStyle"];return obj==null?"":obj;}
	else{this.ViewState["CurrentPageIndexStyle"] = arguments[0];}
}

/*
����һҳ����һҳû��ʱ������ʾ����ɫ��
*/
ianPager.prototype.PrevFirstAndNestLastDisabledColor = function() {
	if(arguments.length==0){var obj = this.ViewState["PrevFirstAndNestLastDisabledColor"];return obj==null?"#E0E0E0":obj;}
	else{this.ViewState["PrevFirstAndNestLastDisabledColor"] = arguments[0];}
}



/*
��ȡ��������Ҫ��ҳ�����м�¼��������
*/
ianPager.prototype.RecordCount = function() {
	if(arguments.length==0){var obj = this.ViewState["RecordCount"];return obj==null?0:parseInt(obj);}
	else{this.ViewState["RecordCount"] = parseInt(arguments[0]);}
}


/*
����һҳ����һҳû��ʱ������ʾ����ɫ��
*/
ianPager.prototype.PrevFirstAndNestLastDisabledColor = function() {
	if(arguments.length==0){var obj = this.ViewState["PrevFirstAndNestLastDisabledColor"];return obj==null?"#E0E0E0":obj;}
	else{this.ViewState["PrevFirstAndNestLastDisabledColor"] = arguments[0];}
}

/*
��ȡ��ǰҳ֮��δ��ʾ��ҳ��������
*/
ianPager.prototype.PagesRemain = function() {
	return parseInt(this.PageCount() - this.CurrentPageIndex());
}

/*
��ȡ�ڵ�ǰҳ֮��δ��ʾ��ʣ���¼��������
*/
ianPager.prototype.RecordsRemain = function() {
	if (this.CurrentPageIndex() < this.PageCount()){
        return this.RecordCount() - (this.CurrentPageIndex() * this.PageSize());
    }
    return 0;
}

/*
��ȡ������ÿҳ��ʾ��������
*/
ianPager.prototype.PageSize = function() {
	if(arguments.length==0){var obj = this.ViewState["PageSize"];return obj==null?10:parseInt(obj);}
	else{this.ViewState["PageSize"] = parseInt(arguments[0]);}
}

/*
��ȡ����Ҫ��ҳ�ļ�¼��Ҫ����ҳ����
*/
ianPager.prototype.PageCount = function() {
	 return Math.ceil(parseFloat(this.RecordCount()) / parseFloat(this.PageSize()));
}

/*
��ȡ�������ı���ͷ�ҳ�������ʽ���
*/
ianPager.prototype.TranslatePageAreaStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["TranslatePageAreaStyle"];return obj==null?"text-align:right;word-wrap:break-word;width:50%;height:25px;padding:0px;margin:0px;":obj;}
	else{this.ViewState["TranslatePageAreaStyle"] = arguments[0];}
}

/*
��ȡ������ҳ�����ı������ʾ��ʽ��
*/
ianPager.prototype.ShowInputBox = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowInputBox"];return obj==null?"Auto":obj;}
	else{this.ViewState["ShowInputBox"] = arguments[0];}
}

/*
��ȡ������Ӧ����ҳ���������ı����CSS������
*/
ianPager.prototype.InputBoxClass = function() {
	if(arguments.length==0){var obj = this.ViewState["InputBoxClass"];return obj==null?"":obj;}
	else{this.ViewState["InputBoxClass"] = arguments[0];}
}

/*
��ȡ������ҳ���������ı����CSS��ʽ�ı���
*/
ianPager.prototype.InputBoxStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["InputBoxStyle"];return obj==null?"":obj;}
	else{this.ViewState["InputBoxStyle"] = arguments[0];}
}

/*
��ȡ������ҳ����ҳ���������ı���ǰ���ı��ַ���ֵ��
*/
ianPager.prototype.TextBeforeInputBox = function() {
	if(arguments.length==0){var obj = this.ViewState["TextBeforeInputBox"];return obj==null?"":obj;}
	else{this.ViewState["TextBeforeInputBox"] = arguments[0];}
}

/*
��ȡ������ҳ�����ı���������ı������ַ���ֵ��
*/
ianPager.prototype.TextAfterInputBox = function() {
	if(arguments.length==0){var obj = this.ViewState["TextAfterInputBox"];return obj==null?"":obj;}
	else{this.ViewState["TextAfterInputBox"] = arguments[0];}
}

/*
��ȡ�������ύ��ť�ϵ��ı���
*/
ianPager.prototype.SubmitButtonText = function() {
	if(arguments.length==0){var obj = this.ViewState["SubmitButtonText"];return obj==null?"go":obj;}
	else{this.ViewState["SubmitButtonText"] = arguments[0];}
}

/*
��ȡ������Ӧ�����ύ��ť��CSS������
*/
ianPager.prototype.SubmitButtonClass = function() {
	if(arguments.length==0){var obj = this.ViewState["SubmitButtonClass"];return obj==null?"":obj;}
	else{this.ViewState["SubmitButtonClass"] = arguments[0];}
}

/*
��ȡ������Ӧ�����ύ��ť��CSS��ʽ��
*/
ianPager.prototype.SubmitButtonStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["SubmitButtonStyle"];return obj==null?"":obj;}
	else{this.ViewState["SubmitButtonStyle"] = arguments[0];}
}

/*
��ȡ�������Զ���ʾҳ���������ı���������ʼҳ����
/// <remarks>
/// �� ShowInputBox ��ΪAuto��Ĭ�ϣ�����Ҫ��ҳ�����ݵ���ҳ���ﵽ��ֵʱ���Զ���ʾҳ���������ı���Ĭ��ֵΪ30����ѡ� ShowInputBox ��ΪNever��Alwaysʱû���κ����á�
/// </remarks>
*/
ianPager.prototype.ShowBoxThreshold = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowBoxThreshold"];return obj==null?30:obj;}
	else{this.ViewState["ShowBoxThreshold"] = arguments[0];}
}

/*
��ȡ��������ʾ�û��Զ�����Ϣ���ķ�ʽ��
/// <remarks>
/// ������ֵ��ΪLeft��Rightʱ���ڷ�ҳ����Ԫ����߻��ұ߻���һ��ר�ŵ���������ʾ�й��û��Զ�����Ϣ����ΪNeverʱ����ʾ��
/// </remarks>
*/
ianPager.prototype.ShowCustomInfoSection = function() {
	if(arguments.length==0){var obj = this.ViewState["ShowCustomInfoSection"];return obj==null?"Never":obj;}
	else{this.ViewState["ShowCustomInfoSection"] = arguments[0];}
}

/*
��ȡ�������û��Զ�����Ϣ���ı��Ķ��뷽ʽ
*/
ianPager.prototype.CustomInfoTextAlign = function() {
	if(arguments.length==0){var obj = this.ViewState["CustomInfoTextAlign"];return obj==null?"left":obj;}
	else{this.ViewState["CustomInfoTextAlign"] = arguments[0];}
}

/*
��ȡ�������û��Զ�����Ϣ���Ŀ��
*/
ianPager.prototype.CustomInfoSectionWidth = function() {
	if(arguments.length==0){var obj = this.ViewState["CustomInfoSectionWidth"];return obj==null?"40%":obj;}
	else{this.ViewState["CustomInfoSectionWidth"] = arguments[0];}
}

/*
��ȡ�������û��Զ�����Ϣ���Ŀ��
*/
ianPager.prototype.CustomInfoClass = function() {
	if(arguments.length==0){var obj = this.ViewState["CustomInfoClass"];return obj==null?this.CssClass():obj;}
	else{this.ViewState["CustomInfoClass"] = arguments[0];}
}

/*
��ȡ������Ӧ�����û��Զ�����Ϣ����CSS��ʽ�ı�
*/
ianPager.prototype.CustomInfoStyle = function() {
	if(arguments.length==0){var obj = this.ViewState["CustomInfoStyle"];return obj==null?"":obj;}
	else{this.ViewState["CustomInfoStyle"] = arguments[0];}
}

/*
��ȡ����������ʾ���û��Զ�����Ϣ�����û��Զ����ı�
*/
ianPager.prototype.CustomInfoText = function() {
	if(arguments.length==0){var obj = this.ViewState["CustomInfoText"];return obj==null?"":obj;}
	else{this.ViewState["CustomInfoText"] = arguments[0];}
}

/*
��ȡ������һ��ֵ����ֵָ���Ƿ�������ʾ��ҳ��������ʹҪ��ҳ������ֻ��һҳ��

/// <remarks>
/// Ĭ������£���Ҫ��ҳ������С����ҳʱ��������ҳ������ʾ�κ����ݣ���������ֵ��Ϊtrueʱ����ʹ��ҳ��ֻ��һҳ��Ҳ����ʾ��ҳ����Ԫ�ء�
/// </remarks>
*/
ianPager.prototype.AlwaysShow = function() {
	if(arguments.length==0){var obj = this.ViewState["AlwaysShow"];return obj==null?false:obj;}
	else{this.ViewState["AlwaysShow"] = arguments[0];}
}

/*
��ȡ������һ��ֵ����ֵָ���Ƿ�������ʾ��ҳ��������ʹҪ��ҳ������ֻ��һҳ��
/// </summary>
/// <remarks>
/// Ĭ������£���Ҫ��ҳ������С����ҳʱ��������ҳ������ʾ�κ����ݣ���������ֵ��Ϊtrueʱ����ʹ��ҳ��ֻ��һҳ��Ҳ����ʾ��ҳ����Ԫ�ء�
/// </remarks>
*/
ianPager.prototype.Version = function() {
	 return this.version;
}

/*
/// <summary>
/// ��ȡ������һ��ֵ����ֵָ����CustomPageHref��Ϊ��ʱ��Url �Ƿ���Ҫ�Ƴ��ض��Ĳ���
/// </summary>
/// <remarks>
/// ��ֵ�������� UrlPaging Ϊ True ʱ�ſ�ʹ�á�<br />
/// ��ֵһ������²���ʹ�ã�ֻ�е� CustomPageHref��Ϊ��ʱ,�����Ƴ� Url �ϵ�һЩ�������
/// </remarks>
*/
ianPager.prototype.CustomPageHrefRemoveParameter = function() {
	if(arguments.length==0){var obj = this.ViewState["CustomPageHrefRemoveParameter"];return obj==null?[]:obj;}
	else{this.ViewState["CustomPageHrefRemoveParameter"] = arguments[0];}
}

/*
/// <summary>
/// ��ȡ������һ��ֵ����ֵָ���Ƿ����ض��� Url ָ����һҳ
/// </summary>
/// <remarks>
/// ��ֵ�������� UrlPaging Ϊ True ʱ�ſ�ʹ�á�<br />
/// ��ֵһ������²���ʹ�ã�ֻ�е�ʹ�� HttpHanlder �Զ���ҳ���ʱ���õõ�
/// </remarks>
*/
ianPager.prototype.CustomPageHref = function() {
	if(arguments.length==0){var obj = this.ViewState["CustomPageHref"];return obj==null?"":obj;}
	else{this.ViewState["CustomPageHref"] = arguments[0];}
}

/*
/// <summary>
/// ��ȡ������һ��ֵ����ֵָ���Ƿ����ض�js����������ҳ���Url�������ֵ��Ϊ�գ���������Url������ص�һ�����ö���ʧЧ
/// </summary>
*/
ianPager.prototype.CustomJsPageFunction = function() {
	if(arguments.length==0){var obj = this.ViewState["CustomJsPageFunction"];return obj==null?"":obj;}
	else{this.ViewState["CustomJsPageFunction"] = arguments[0];}
}

/*
��ȡ�������ڿͻ��˳��ֵļ�����ʽ�� (CSS) �ࡣ
*/
ianPager.prototype.CssClass = function() {
	if(arguments.length==0){var obj = this.ViewState["CssClass"];return obj==null?"":obj;}
	else{this.ViewState["CssClass"] = arguments[0];}
}

/*
��ȡ�����÷�ҳ�ؼ����
*/
ianPager.prototype.Width = function() {
	if(arguments.length==0){var obj = this.ViewState["Width"];return obj==null?"":obj;}
	else{this.ViewState["Width"] = arguments[0];}
}

/*
��ȡ�����÷�ҳ�ؼ��߶�
*/
ianPager.prototype.Height = function() {
	if(arguments.length==0){var obj = this.ViewState["Height"];return obj==null?"":obj;}
	else{this.ViewState["Height"] = arguments[0];}
}

/*
    ��ʽ���ַ���
*/
ianPager.prototype.Format = function()
{		 
    var str = arguments[0];
    var len = arguments.length;
	for (var i=1; i<len; i++)
	{   
	    var arg = arguments[i];
	    if(arg)
	    {
		    str=str.replace(new RegExp("\\{"+(i-1)+"\\}","ig"),arg); 
		}
		else
		{
		    str=str.replace(new RegExp("\\{"+(i-1)+"\\}","ig"),""); 
		}
	}
	return str; 
}



/*
������һҳ����һҳ����һҳ�����һҳ��ҳ��ť��
*/
ianPager.prototype.CreateNavigationButton = function (btnname) {
    if (!this.ShowFirstLast() && (btnname == "first" || btnname == "last")) { return; }
    if (!this.ShowPrevNext() && (btnname == "prev" || btnname == "next")) { return; }

    var linktext = "", html = [];
    var disabled = false;
    var pageIndex = 0;
    var imgButton = (this.PagingButtonType() == "Image" && this.NavigationButtonType() == "Image");
    if (btnname == "prev" || btnname == "first") {
        disabled = (this.CurrentPageIndex() <= 1);
        if (!this.ShowDisabledButtons() && disabled) { return; }
        pageIndex = (btnname == "first" || this.CurrentPageIndex() == 1) ? 1 : (this.CurrentPageIndex() - 1);
        if (imgButton) {
            if (!disabled) {
                html.push("<a");
                html.push(this.AddToolTip(pageIndex));

				var urlcol = {};
                urlcol[this.UrlPageIndexName()] = pageIndex;


                if(this.CustomJsPageFunction()!="" && typeof(this.CustomJsPageFunction())=="string")
                {
                    html.push(" href=\"#\" onclick=\"" + this.Format(this.CustomJsPageFunction(),pageIndex) +";return false;\">");
                }
                else
                {
                    html.push(" href=\"" + this.BuildUrlString(urlcol) + "\">");
                }
                html.push("<img border=\"0\" align=\"" + this.ButtonImageAlign() + "\" src=\"" + this.ImagePath() + btnname + this.DisabledButtonImageNameExtension() + this.ButtonImageExtension() + "\" />");
                html.push("</a>");
            }
            else {
                html.push("<span><img border=\"0\" align=\"" + this.ButtonImageAlign() + "\" src=\"" + this.ImagePath() + btnname + this.ButtonImageNameExtension() + this.ButtonImageExtension() + "\" /></span>");
            }
        }
        else {
            var linktext = (btnname == "prev") ? this.PrevPageText() : this.FirstPageText();
            html.push(disabled ? "<span" : "<a");
            if (disabled) {
                html.push(" color=\"" + this.PrevFirstAndNestLastDisabledColor() + "\"");
            }
            else {
                if (this.CssClass() != "") { html.push(" class=\"" + this.CssClass() + "\""); }
                html.push(this.AddToolTip(pageIndex));

                if(this.CustomJsPageFunction()!="" && typeof(this.CustomJsPageFunction())=="string")
                {
                    html.push(" href=\"#\" onclick=\"" + this.Format(this.CustomJsPageFunction(),pageIndex) +";return false;\"");
                }
                else
                {
                    var urlcol = {};
                    urlcol[this.UrlPageIndexName()] = pageIndex;
                    html.push(" href=\"" + this.BuildUrlString(urlcol) + "\"");
                }

            }
            html.push(">");
            html.push(linktext)
            html.push(disabled ? "</span>" : "</a>");
       } 
    }
    else {
        disabled = (this.CurrentPageIndex() >= this.PageCount());
        if (!this.ShowDisabledButtons() && disabled) { return; };

        pageIndex = (btnname == "last") ? this.PageCount() : (this.CurrentPageIndex() + 1);

        if (imgButton) {
            if (!disabled) {
                html.push("<a");
                html.push(this.AddToolTip(pageIndex));

                var urlcol = {};
                urlcol[this.UrlPageIndexName()] = pageIndex;
                
                if(this.CustomJsPageFunction()!="" && typeof(this.CustomJsPageFunction())=="string")
                {
                    html.push(" href=\"#\" onclick=\"" + this.Format(this.CustomJsPageFunction(),pageIndex) +";return false;\">");
                }
                else
                {
                    html.push(" href=\"" + this.BuildUrlString(urlcol) + "\">");
                }

                html.push("<img border=\"0\" align=\"" + this.ButtonImageAlign() + "\" src=\"" + this.ImagePath() + btnname + this.DisabledButtonImageNameExtension() + this.ButtonImageExtension() + "\" />");
                html.push("</a>");
            }
            else {
                html.push("<span><img border=\"0\" align=\"" + this.ButtonImageAlign() + "\" src=\"" + this.ImagePath() + btnname + this.ButtonImageNameExtension() + this.ButtonImageExtension() + "\" /></span>");
            }
        }
        else {
            var linktext = (btnname == "next") ? this.NextPageText() : this.LastPageText();
            html.push(disabled ? "<span" : "<a");
            if (disabled) {
                html.push(" color=\"" + this.PrevFirstAndNestLastDisabledColor() + "\"");
            }
            else {
                if (this.CssClass() != "") {
                    html.push(" class=\"" + this.CssClass() + "\"");
                }
                html.push(this.AddToolTip(pageIndex));
                var urlcol = {};
                
                if(this.CustomJsPageFunction()!="" && typeof(this.CustomJsPageFunction())=="string")
                {
                    html.push(" href=\"#\" onclick=\"" + this.Format(this.CustomJsPageFunction(),pageIndex) +";return false;\"");
                }
                else
                {
                    urlcol[this.UrlPageIndexName()] = pageIndex;
                    html.push(" href=\"" + this.BuildUrlString(urlcol) + "\"");
                }
            }
            html.push(">");
            html.push(linktext)
            html.push(disabled ? "</span>" : "</a>");
        }
    }
    if (this.ShowWriteButtonSpace()) {
        html.push(this.WriteButtonSpace());
    }
    return html.join('');
}

/*
������ҳ��ֵ������ť��
@pageIndex Ҫ������ť��ҳ������ֵ��
*/
ianPager.prototype.CreateNumericButton = function(pageIndex)
{
    var isCurrent = (pageIndex == this.CurrentPageIndex());
    var html = [];
    
    if (this.PagingButtonType() == "Image" && this.NumericButtonType() == "Image")
    {
        if (!isCurrent)
        {
            html.push("<a");
            html.push(this.AddToolTip(pageIndex));
            
            if(this.CustomJsPageFunction()!="" && typeof(this.CustomJsPageFunction())=="string")
            {
                html.push(" href=\"#\" onclick=\"" + this.Format(this.CustomJsPageFunction(),pageIndex) +";return false;\">");
            }
            else
            {
                var urlcol ={};
                urlcol[this.UrlPageIndexName()] = pageIndex;
                html.push(" href=\""+this.BuildUrlString(urlcol)+"\">");
            }
            html.push(this.CreateNumericImages(pageIndex, false));
            html.push("</a>");
        }
        else
        {
            html.push(this.CreateNumericImages(pageIndex, true));
        }
    }
    else
    {
        if (isCurrent)
        {
            html.push("<span");
            if(this.CurrentPageIndexCss()!="")
            {
                html.push(" class=\""+ this.CurrentPageIndexCss() +"\"");
            }
            if(this.CurrentPageIndexStyle()!="")
            {
                html.push(" style=\""+ this.CurrentPageIndexStyle() +"\"");
            }
            html.push(">");
            if (this.NumericButtonTextFormatString() != "") {
                html.push(this.Format(this.NumericButtonTextFormatString(), pageIndex));
            }
            else {
                html.push(pageIndex);
            }
            html.push("</span>");
        }
        else
        {
            html.push("<a");
            html.push(this.AddToolTip(pageIndex));
            
            if(this.CustomJsPageFunction()!="" && typeof(this.CustomJsPageFunction())=="string")
            {
                html.push(" href=\"#\" onclick=\"" + this.Format(this.CustomJsPageFunction(),pageIndex) +";return false;\">");
            }
            else
            {
                var urlcol ={};
                urlcol[this.UrlPageIndexName()] = pageIndex;
                html.push(" href=\""+this.BuildUrlString(urlcol)+"\">");
            }
			if(this.NumericButtonTextFormatString()!="")
			{
				html.push(this.Format(this.NumericButtonTextFormatString(),pageIndex));
			}
			else
			{
	            html.push(pageIndex);
			}
            html.push("</a>");
        }
    }
    if(this.ShowWriteButtonSpace())
    {
        html.push(this.WriteButtonSpace());
    }
    return html.join('');
}
/*
����������ҳ����...����ť��
@pageIndex ������ť��Ӧ��ҳ������
*/
ianPager.prototype.CreateMoreButton = function(pageIndex)
{
    var html = [];
    html.push("<a");
    html.push(this.AddToolTip(pageIndex));
    
    if(this.CustomJsPageFunction()!="" && typeof(this.CustomJsPageFunction())=="string")
    {
        html.push(" href=\"#\" onclick=\"" + this.Format(this.CustomJsPageFunction(),pageIndex) +";return false;\"");
    }
    else
    {
        var urlcol ={};
        urlcol[this.UrlPageIndexName()] = pageIndex;
        html.push(" href=\""+this.BuildUrlString(urlcol)+"\"");
    }
    if (this.PagingButtonType() == "Image" && this.MoreButtonType() == "Image")
    {
        html.push(">");
        html.push("<img border=\"0\" align=\""+ this.ButtonImageAlign() +"\" src=\""+ this.ImagePath() + "more" + this.ButtonImageNameExtension() + this.ButtonImageExtension() +"\" />");
    }
    else
    {
        html.push(">");
        html.push("...");
    }
    html.push("</a>");
    if(this.ShowWriteButtonSpace())
    {
        html.push(this.WriteButtonSpace());
    }
    return html.join('');
}

/*
����ҳ����ͼƬ��ť��
@index ҳ������ֵ��
@isCurrent �Ƿ��ǵ�ǰҳ������
*/
ianPager.prototype.CreateNumericImages = function (index, isCurrent) {
    var html = [];
    var str = new String(index);
    var len = str.length;
    for (var i = 0; i < len; i++) {
        html.push("<img border=\"0\" align=\"" + this.ButtonImageAlign() + "\" src=\"" + this.ImagePath() + str.substr(i,1) + ((isCurrent == true) ? this.CpiButtonImageNameExtension() : this.ButtonImageNameExtension()) + this.ButtonImageExtension() + "\" />");
    }
    return html.join('');
}

/*
�ڷ�ҳ����Ԫ�ؼ����ո�
*/
ianPager.prototype.WriteButtonSpace = function()
{
    var html = [];
    html.push("<span");
    if(this.PagingButtonSpacingCssClass()!="")
    {
        html.push(" class=\""+ this.PagingButtonSpacingCssClass() +"\"");
    }
    if(this.PagingButtonSpacingStyle()!="")
    {
        html.push(" style=\""+ this.PagingButtonSpacingStyle() +"\"");
    }
    html.push(" width=\""+ this.PagingButtonSpacing() +"\"");
    html.push("</span>");
    return html.join("");
}

/*
���뵼����ť��ʾ�ı���
@pageIndex ������ť��Ӧ��ҳ������
*/
ianPager.prototype.AddToolTip = function(pageIndex)
{
    if(this.ShowNavigationToolTip())
    {
        return " title=\""+ this.Format(this.NavigationToolTipTextFormatString(), new String(pageIndex)) +"\"";
    }
}

/*
��ʹ��Url��ҳ��ʽʱ���ڵ�ǰUrl�ϼ����ҳ���������ò������ڣ���ı���ֵ��
@col {{}} Ҫ���뵽��Url�еĲ�������ֵ�ļ���

��ҳ������ť�ĳ������ַ�����������ҳ������
*/
ianPager.prototype.BuildUrlString = function(col) {
    if (!this.CustomPageHref().length == 0) {
        this.currentUrl = this.CustomPageHref();
    }
    var tempstr = "";

    if (this.urlParams == null) {
        for (var i in col) {
            tempstr += "&" + i + "=" + col[i];
        }
        return this.currentUrl + "?" + tempstr.substr(1);
    }

    var newCol = this.urlParams;
    for (var i in col) {

        newCol[i.toLocaleLowerCase()] = col[i];
    }

    if (this.CustomPageHref().length != 0) {
        var strParameter = this.CustomPageHrefRemoveParameter();
        for (var j in strParameter) {
            if (newCol[j] != null && newCol[j] != "") {
                delete newCol[j];
            }
        }
    }

    var sb = [];
    for (var i in newCol) {
        if (i != null && i != "") {
            sb.push("&" + i + "=" + newCol[i]);
        }
    }
    return this.currentUrl + "?" + sb.join('').substr(1);
}

/*
Ҫ�ڿͻ��˳��� HTML ���ݵ������
*/
ianPager.prototype.Render = function()
{
    document.write(this.Html());
}
/*
��ҳ�ؼ��� HTML ���ݵ������
*/
ianPager.prototype.Html = function () {
    //
    if (this.PageCount() <= 1 && !this.AlwaysShow()) {
        return;
    }

    var html = [];
    html.push(this.RenderBeginTag());

    if (this.ShowCustomInfoSection() == "Left") {
        html.push(this.CustomInfoText());
        html.push("</td>")
        html.push("<td");
        html.push(this.WriteCellAttributes(false));
        html.push(">");
    }

    var midpage = parseInt((this.CurrentPageIndex() - 1) / this.NumericButtonCount());
    var pageoffset = midpage * this.NumericButtonCount();

    if (this.PagingButtonPosition() != "Fixed" && this.PageCount() > this.NumericButtonCount()) {
        var pagePosition = this.PagingButtonPosition();
        switch (pagePosition) {
            case "End":
                if (this.CurrentPageIndex() > this.NumericButtonCount()) {
                    pageoffset = this.CurrentPageIndex() - this.NumericButtonCount();
                }
                break;
            case "Center":
                var startOffset = this.CurrentPageIndex() - parseInt(Math.ceil(this.NumericButtonCount() / 2));
                if (startOffset > 0) {
                    pageoffset = startOffset;
                    if (pageoffset > (this.PageCount() - this.NumericButtonCount())) {
                        pageoffset = this.PageCount() - this.NumericButtonCount();
                    }
                }
                break;
            case "Beginning":
                pageoffset = this.CurrentPageIndex() - 1;
                if (pageoffset + this.NumericButtonCount() > this.PageCount())
                    pageoffset = this.PageCount() - this.NumericButtonCount();
                break;
        }
    }

    

    var endpage = ((pageoffset + this.NumericButtonCount()) > this.PageCount()) ? this.PageCount() : (pageoffset + this.NumericButtonCount());

    html.push(this.CreateNavigationButton("first"));
    html.push(this.CreateNavigationButton("prev"));

    if (this.ShowPageIndex()) {
        if ((this.CurrentPageIndex() > this.NumericButtonCount()) && this.ShowMoreButton()) { html.push(this.CreateMoreButton(pageoffset)); };
        for (var i = pageoffset + 1; i <= endpage; i++) {
            html.push(this.CreateNumericButton(i));
        }
        if ((this.PageCount() > this.NumericButtonCount() && endpage < this.PageCount()) && this.ShowMoreButton()) {
            html.push(this.CreateMoreButton(endpage + 1));
        }
    }


    html.push(this.CreateNavigationButton("next"));
    html.push(this.CreateNavigationButton("last"));

    if ((this.ShowInputBox() == "Always") || (this.ShowInputBox() == "Auto" && this.PageCount() >= this.ShowBoxThreshold())) {
        html.push("&nbsp;&nbsp;&nbsp;&nbsp;");
        if (this.TextBeforeInputBox() != "") {
            html.push(this.TextBeforeInputBox());
        }
        html.push("<input");
        html.push(" type=\"text\"");
        if (this.InputBoxStyle() != "") {
            html.push(" style=\"" + this.InputBoxStyle() + "\"");
        }
        if (this.InputBoxClass() != "") {
            html.push(" class=\"" + this.InputBoxClass() + "\"");
        }
        if (this.PageCount() <= 1 && this.AlwaysShow()) {
            html.push(" readonly=\"readonly\"");
        }
        html.push(" name=\"" + this.UrlPageIndexName() + "\"");
        html.push(" id=\"ID_" + this.UrlPageIndexName() + "\"");
        var clickScript = "var el = document.getElementById('ID_" + this.UrlPageIndexName() + "');if(!isNaN(el.value)){if(el.value<1 || el.value>" + this.PageCount() + "){alert('ҳ����ֵ�������1��" + this.PageCount() + "֮�䣡');el.select();return false;}}else{alert('�����ҳ������Ч');el.select();return false;};var BuildUrlString = function(key,value){ var loc=window.location.search.substring(1); var params=loc.split('&'); if(params.length<=1||(params.length==2&&params[0].toLowerCase()==key)) return location.pathname+'?'+key+'='+value; var newparam=''; var flag=false; for(i=0;i<params.length;i++){ if(params[i].split('=')[0].toLowerCase()==key.toLowerCase()){ params[i]=key+'='+value; flag=true; break; } } for(i=0;i<params.length;i++){ newparam+=params[i]+'&'; } ;if(flag) newparam=newparam.substring(0,newparam.length-1); else newparam+=key+'='+value; return location.pathname+'?'+newparam; };location.href=BuildUrlString('" + this.UrlPageIndexName() + "',el.value);";
        html.push(" onkeydown=\"if(event.keyCode!=13){return ;}" + clickScript + "\"");
        html.push("/>");
        if (this.TextAfterInputBox() != "") {
            html.push(this.TextAfterInputBox());
        }

        html.push("<input");
        html.push(" type=\"button\"");
        html.push(" name=\"" + this.UrlPageIndexName() + "_btn\"");
        html.push(" id=\"ID_btn" + this.UrlPageIndexName() + "\"");
        html.push(" value=\"" + this.SubmitButtonText() + "\"");
        if (this.SubmitButtonClass() != "") {
            html.push(" class=\"" + this.SubmitButtonClass() + "\"");
        }
        if (this.SubmitButtonStyle() != "") {
            html.push(" style=\"" + this.SubmitButtonStyle() + "\"");
        }
        if (this.PageCount() <= 1 && this.AlwaysShow()) {
            html.push(" disabled=\"disabled\"");
        }
        html.push(" onclick=\"" + clickScript + "\"");
        html.push("/>");

        if (this.ShowCustomInfoSection() == "Right") {
            html.push("</td>");
            html.push("<td");
            html.push(this.WriteCellAttributes(false));
            html.push(">");
            html.push(this.CustomInfoText());
        }
    }

    html.push(this.RenderEndTag());
    return html.join('');
}


/*
Ҫ�ڿͻ��˳��� HTML ���ݵ������   ֮ǰ
*/
ianPager.prototype.RenderBeginTag = function()
{
    var href = window.location.href;
    this.currentUrl = window.location.search!=""?href.substr(0, href.indexOf(window.location.search)):href;
    var params =  window.location.search.substring(1).split("&");

    
    for(var i=0;i<params.length;i++)
    {    
        var item = params[i];
        this.urlParams[item.split("=")[0]] = item.split("=")[1]
    }
    var index = 1;
    if(this.urlParams[this.UrlPageIndexName()]!=null){ index = parseInt(this.urlParams[this.UrlPageIndexName()]);};
    
    
    var showPager=(parseInt(this.PageCount())>1||(parseInt(this.PageCount())<=1&&this.AlwaysShow()));
    
    var html = [];
    html.push("<!--\r\n");
    html.push(this.Format("                           ianPager Start Version:{0}\r\n", this.Version()));
    html.push(" Copyright:2003-2010 Lion (lion.net@163.com , idoall.org , www.lionsky.net)\r\n");
    html.push("-->");
    
    if((this.ShowCustomInfoSection()=="Left"||this.ShowCustomInfoSection()=="Right")&&showPager)
    {       
        html.push("<table boder=\"0\" cellpadding=\"0\" cellspacing=\"0\" "+ ((this.Width()=="")?"":"width=\""+ this.Width() +"\" ") +""+ ((this.CssClass()=="")?"":"class=\""+ this.CssClass() +"\" ") +""+ ((this.Height()=="")?"":"width=\""+ this.Height() +"\" ") +">");
        html.push("<tr>");
        html.push("<td");
        html.push(this.WriteCellAttributes(true));
        html.push(">");
    }    
    return html.join("");
}

/*
Ҫ�ڿͻ��˳��� HTML ���ݵ������   ֮��
*/
ianPager.prototype.RenderEndTag = function()
{
    var html = [];
    if(this.ShowCustomInfoSection()=="Left"||this.ShowCustomInfoSection()=="Right")
    {     
        html.push("</td>");
        html.push("</tr>");
        html.push("</table>");
    }
    html.push("\r\n<!--\r\n");
    html.push(this.Format("                           ianPager End Version:{0}\r\n", this.Version()));    
    html.push("-->");
    return html.join("");
}

/*
Ϊ�û��Զ�����Ϣ����ҳ������ť����td������ԡ�
*/
ianPager.prototype.WriteCellAttributes = function(leftCell)
{
    var customUnit = this.CustomInfoSectionWidth();
    var html = [];
    if (this.ShowCustomInfoSection() == "Left" && leftCell || this.ShowCustomInfoSection() == "Right" && !leftCell)
    {
        html.push((this.CustomInfoClass()=="")?"":" class=\""+ this.CustomInfoClass() +"\"");
        html.push((this.CustomInfoStyle()=="")?"":" style=\""+ this.CustomInfoStyle() +"\"");
        html.push(" width=\""+ this.CustomInfoSectionWidth() +"\"");
        html.push(" align=\""+ this.CustomInfoTextAlign() +"\"");
    }   
    else
    {
        var width = this.CustomInfoSectionWidth();
        if(width.indexOf("%")!=-1)
        {
            var customUnit = 100 - parseInt(width.substr(0, width.indexOf("%")))
            html.push(" width=\""+ customUnit +"%\"");
        }
        html.push(" valign=\"bottom\"");
        html.push(" align=\"right\"");
    }   
    html.push(" nowrap=\"nowrap\"");
    return html.join('');  
}