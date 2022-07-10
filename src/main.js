// 测试 find() style() each()
const div = dom.find('#demo>.red')[0]
dom.style(div, 'color', 'red')
const divList = dom.find('.red')
dom.each(divList, n => { console.log(n) })

// other
const div1 = dom.create('<div>newDiv</div>')
    // console.log(div1);

dom.after(test, div1)

const div2 = dom.create('<div id="parent"></div>')
dom.wrap(test, div2)

dom.remove(remove)

dom.empty(empty) // (5) [text, div, text, div, text]

dom.attr(test, 'data-x', 'hot')