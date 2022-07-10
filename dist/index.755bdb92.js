window.dom = {
    create (string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        // template 里的元素需要通过 .content获取到
        return container.content.firstChild;
    },
    before (referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode);
    },
    after (referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    append (parent, newNode) {
        parent.appendChild(newNode);
    },
    wrap (son, newNode) {
        dom.before(son, newNode);
        dom.append(newNode, son);
    },
    remove (node) {
        node.parentNode.removeChild(node);
        return node;
    },
    empty (node) {
        const array = [];
        let x = node.firstChild;
        while(x){
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },
    // 重载：函数或者方法有相同的名称，但是参数列表不相同
    attr (node, name, value) {
        if (arguments.length === 3) node.setAttribute(name, value);
        else if (arguments.length === 2) return node.getAttribute(name);
    },
    //适配
    text (node, string) {
        if (arguments.length === 2) {
            if ("innerText" in node) node.innerHTML = string;
            else node.textContent = string;
        } else if (arguments.length === 1) {
            if ("innerText" in node) return node.innerHTML;
            else return node.textContent;
        }
    },
    html (node, string) {
        if (arguments.length === 2) node.innerHTML = string;
        else if (arguments.length === 1) return node.innerHTML;
    },
    style (node, name, value) {
        if (arguments.length === 3) node.style[name] = value;
        else if (arguments.length === 2) {
            if (typeof name === "string") return node.style[name];
            else if (name instanceof Object) for(let key in name)node.style[key] = name[key];
        }
    },
    class: {
        add (node, className) {
            node.classList.add(className);
        },
        remove (node, className) {
            node.classList.remove(className);
        },
        has (node, className) {
            // contains()方法检查元素的class属性是否包含特定的类名
            return node.classList.contains(className);
        }
    },
    on (node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off (node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },
    //注意这里返回的是一个数组 
    find (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent (node) {
        return node.parentNode;
    },
    children (node) {
        return node.children;
    },
    siblings (node) {
        // Array.from()将一个类数组对象或者可遍历对象转换成一个真正的数组。
        return Array.from(node.parentNode.children).filter((n)=>n !== node);
    },
    next (node) {
        let x = node.nextSibling;
        // nodeType === 3 为 text
        while(x && x.nodeType === 3)x = x.nextSibling;
        return x;
    },
    previous (node) {
        let x = node.previousSibling;
        while(x && x.nodeType === 3)x = x.previousSibling;
        return x;
    },
    each (nodeList, fn) {
        for(let i = 0; i < nodeList.length; i++)fn.call(null, nodeList[i]);
    },
    index (node) {
        const list = dom.children(node.parentNode);
        let i;
        for(let i1 = 0; i1 < list.length; i1++){
            if (list[i1] === node) break;
        }
        return i;
    }
};

//# sourceMappingURL=index.755bdb92.js.map
