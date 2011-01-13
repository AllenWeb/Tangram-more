% baidu.more.URLParameter
% yanjunyi
 
  
## baidu.more.URLParameter
yanjunyi: yanjunyi@baidu.com
 
  
### ���ܽ��ܣ�URLParameter���Ը��
 
URLParameter���ṩ�˶�URL�еĲ������ֹ���Ĺ��ܣ�ʹ�ø����͵�ʵ�����Է���Ĺ���һ���������еĸ������֣�������Ҫʱת��Ϊ�ַ�����ת�������еĲ���ֵ�����ṩ�˽ӿڣ���ʹ������ı��뺯����Ĭ�ϲ����롣

���ԣ����ò����Ķ��ַ�����ͬ�������֧�֣�����/����ӿ�֧�֣���ʽ����

### ʵ��ԭ��URLParameter��ôʵ�ֵģ�

��������һ��ʵ�������ڽ���һ��Object����Ų����ĸ���key�����ǵ�ͬ������������������checkbox��ֵ����ÿ��key��Ӧһ�����飬�����д�Ų�����ֵ��
  
### �ӿڣ�

#### ��̬������
URLParameter.parseJSON(param [, decoder]) ��һ�����硰a=1&b=2&c=c1&c=c2�����ַ���������JSON���ͣ����в�����������key-[value1,value2,...,valuen]��ʽ��������������Ϊ��{'a': [1], 'b': [2], 'c': ['c1', 'c2']}��JSON��ʽ��decoderΪ�Ǳ�ѡ�����ʱ�Բ���Ĭ�ϲ����룬������룬���ڵ���ʱ������Ӧ��decoder��������URLParameter.parseJSON(param, decodeURIComponent)��

#### ʵ�������� 

initialize(p [, value]) ��ʼ��ʵ��������newһ������ʱ�Զ����á��ӿ���setParameter����ͬ�������ǵ���initʱ�����ԭ�в�����

set(p [, value]) ���ò������÷����ṩ�˶��ֲ����ĵ��÷�ʽ��֧������URLParameter����JSON�����ַ�����ֵ�ԡ��������һ����ֵ��null�����ڲ�����ɾ���ü���֧����ʽ���ã����ý���ʱ����ʵ������ϸʹ�÷�����ʾ����

get([key]) ��ȡ������ֵ��������������keyΪ��Ҫ��ȡ�Ĳ�����������������ڣ��򷵻ظ����µ�ֵ����

toString([encoder]) ��������ַ�����encoderΪ�Ǳ�ѡ�����ʱĬ�ϲ��Բ������б��룬������룬���ڵ���toStringʱ������Ӧ��encoder��������param.toString(encodeURIComponent)��
  
### ʾ��

//��������
var param = new URLParameter(); // {}

//���ò���
param.set('a', 1); // {'a': [1]}

//���ò���
param.set('b', ['b1', 'b2']); // {'a': [1], 'b': ['b1', 'b2']}

//��ʽ���ò���
param.set({'c': 3}).set({'a': null}); // {'c': [3], 'b': ['b1', 'b2']}

//��ȡ����
param.get('c'); // 3

//��ȡ����
param.get('b'); // ['b1', 'b2']

//��ȡ��������
param.get(); // {'c': [3], 'b': ['b1', 'b2']}

//ת��Ϊ�ַ���
param.toString(); // c=3&b=b1&b=b2

//���ú�ת��Ϊ�ַ���
param.initialize('d': '����').toString(encodeURIComponent) // d=%E4%B8%AD%E6%96%87

### ע��
 
������ṩURL�����������硰a=1&b=2&c=c1&c=c2���ַ����Ĵ�������������ַ������뱣֤���ϸø�ʽ�����಻�ṩ�����ʽ��顣

������¼��������¼���򣬽��������baidu.url����