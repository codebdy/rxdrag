// 我在Html Beautifier的一个简单尝试
export function HtmlBeautify(source, indent_value) {
    this.source = source;
    this.indent_value = indent_value;
    this.result = "";
    this.parse();
}
// 分析并产生输出到this.result
HtmlBeautify.prototype.parse = function() {
    var that = this;
    // 当前分析到哪个字符，当前标记值，标记类型，输出数组，缩进级别
    var pos = 0, token_value = "", token_type = "",
    output = [], indent_level = 0;
    // 把这些标签作为Single Tag
    var single_token = "br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed".split(',');
    // 输出当前标记（换行+缩进量+标记值）
    function outputToken() {
        output.push("\n");
        for (var i = 0; i < indent_level; i++) {
            output.push(that.indent_value);
        }
        output.push(token_value);
    }
    // 获取下一个标记（首先获取正文，如果正文为空则获取标签）
    function nextToken() {
        var token_value_array = [], val = "";
        // "<"之前的所有内容作为正文标签
        while ((val = that.source[pos]) !== "<") {
            if (pos >= that.source.length) {
                token_type = "END";
                return;
            }
            token_value_array.push(val);
            pos++;
        }
        token_value = token_value_array.join("").trim();
        if (token_value === "") {
            // 如果正文标记为空，则获取标签标记
            nextTokenTag();
        } else {
            token_type = "CONTENT";
        }
    }
    function nextTokenTag() {
        var token_value_array = [], val = "", tagName = "";
        // 获取标签标记，直到遇到">"
        do {
            val = that.source[pos];
            token_value_array.push(val);
            pos++;
        } while (val !== ">");
        token_value = token_value_array.join("").trim();
        // 当前标签的名称（小写）
        tagName = getTagName();
        if (token_value[1] === "/") {
            // token_value以"</"开始，则认为是结束标签
            token_type = "END_TAG";
        } else if (contains(tagName, single_token) || token_value[token_value.length - 2] === "/") {
            // 如果标签在single_token或者token_value以"/>"结尾，则认为是独立标签
            // 这种判断没有考虑这种情况："<br></br>"
            token_type = "SINGLE_TAG";
        } else {
            token_type = "START_TAG";
        }
    }
    function getTagName() {
        var tagName = token_value.substr(1, token_value.length - 2);
        var spaceIndex = tagName.indexOf(" ");
        if (spaceIndex > 0) {
            tagName = tagName.substr(0, spaceIndex);
        }
        return tagName.toLowerCase();
    }
    function contains(val, array) {
        for (var i = 0; i < array.length; i++) {
            if (val === array[i]) {
                return true;
            }
        }
        return false;
    }

    // parse的主体函数，循环获取下一个Token
    while (true) {
        nextToken();
        
        // 当前Token为结束标记
        if (token_type === "END") {
            break;
        }
        switch (token_type) {
            case "START_TAG":
                // 我们对缩进的控制非常简单，开始标签后缩进一个单位
                outputToken();
                indent_level++;
                break;
            case "END_TAG":
                // 结束标签前减少一个单位缩进
                indent_level--;
                outputToken();
                break;
            case "SINGLE_TAG":
            case "CONTENT":
                outputToken();
                break;
        }
    }
    // 去除最前面的"\n"
    this.result = output.join("").substr(1);
};
