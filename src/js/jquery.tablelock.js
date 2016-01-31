;(function($) {

    // 插件全局变量，此处全局this指向当前调用此插件的DOM的jquery对象，
    var thisTable;

    function _TableLock(options){
        this.options = $.extend({}, $.fn.TableLock.defaults, options);
    }

    _TableLock.prototype.load = function(){

        thisTable.wrap('<div class="lock-table-box clearfix"></div>');
        $('.lock-table-box').css({
            'width': this.options.width,
            'height': this.options.height
        });

        this.lockRow();
        this.lockCol();

        this.addEvents();
    };

    // 锁定行
    _TableLock.prototype.lockRow = function(){

        var tr;
        // 锁定行tr,tr包括thead和tbody下的所有tr
        for(var row = 0; row < this.options.lockRowNum; row++) {
            tr = thisTable.find('tr:eq(' + row + ')');
            tr.find('th, td').addClass('lock-row').css('backgroundColor', this.options.backgroundColor);
            // 锁定行列交叉处，若锁定的列数也大于0，则行列交叉处进行再次锁定
            for(var col = 0; col < this.options.lockColNum; col++ ){
                if(tr){
                    tr.find('th:eq( ' + col + ' ), td:eq(' + col + ')').addClass('lock-col lock-cross');
                }
            }
        }
    };

    // 锁定列
    _TableLock.prototype.lockCol = function(){

        var that = this;

        // 遍历所有行tr,tr下既包括th也包括td
        thisTable.find('tr').each(function(index, val){
            // 锁定列
            for(var col = 0; col < that.options.lockColNum; col++) {
                $(this).find('th:eq( ' + col + ' ), td:eq(' + col + ')').addClass('lock-col')
                    .css('backgroundColor', that.options.backgroundColor);
            }
        });
    };

    // 添加事件
    _TableLock.prototype.addEvents = function(){

        $('.lock-table-box').scroll(function(){
            $('.lock-row').css('top', $(this).scrollTop());
            $('.lock-col').css('left', $(this).scrollLeft());
        });
    };

    var methods = {
        init: function (options) {

            return this.each(function(){
                var TableLock = new _TableLock(options);
                TableLock.load();
            })
        }
    };

    $.fn.TableLock = function(method) {
        thisTable = this;
        // 方法调用
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods['init'].apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.TableLock');
        }
    };

    //定义默认参数
    $.fn.TableLock.defaults = {
        lockRowNum:1,   //锁定的行数，默认1行
        lockColNum:1,   //锁定的列数，默认1列
        width: '100%',     //表格宽度，默认为400px
        height: '100%',     //表格高度，默认为200px
        backgroundColor: '#fff'
    };

}(jQuery));
