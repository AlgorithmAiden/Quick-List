//setup the canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

/**make the canvas always fill the screen**/;
(function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    window.onresize = resize
})()

//for this code (as in code before this line), I almost always use the same stuff, so its going to stay here

//create the list
let list = [];
(() => {
    list.push({
        name: 'apple-pie',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'chocolate-cake',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'beef-stew',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'spaghetti-bolognese',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'fried-chicken',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'caesar-salad',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'shrimp-cocktail',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'chicken-parmesan',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'clam-chowder',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'lobster-bisque',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'sushi',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'ramen',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'tacos',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'burritos',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'steak',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'pulled-pork',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'potato-salad',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'croissants',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'pancakes',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'waffles',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'donuts',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'bagels',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'muffins',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'churros',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
    list.push({
        name: 'gelato',
        time: Date.now() - Math.random() * Math.pow(10, 9)
    })
})()

//set the offset
let offset = 0

//add scrolling
document.addEventListener('wheel', e => {
    const direction = e.deltaY > 0 ? -1 : 1
    offset += canvas.height / 25 * direction
    //cap the offset
    offset = Math.min(offset, 0)
    offset = Math.max(offset, -(list.length * rowHeight - canvas.height))

})

//reset an items time when its clicked
document.addEventListener('click', e =>
    list[Math.floor((e.y - offset) / rowHeight)].time = Date.now()
)

//find out how many days ago it was
function getDays(time) {
    return Math.floor((Date.now() - time) / 1000 / 60 / 60 / 24)
}

//some temp vars
let rowHeight = canvas.height / 10
let padding = rowHeight * .1

    //the render loop
    ;
(function render() {
    //clear the screen
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    //sort the list
    list.sort((a, b) => b.time - a.time)

    //loop over each item in the list
    for (let index = 0; index < list.length; index++) {
        const item = list[index]
        ctx.fillStyle = 'rgb(0,100,0)'
        ctx.fillRect(0, rowHeight * index + padding + offset, canvas.width, rowHeight - padding * 2)

        //render the text
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.font = `${(rowHeight - padding * 2) / 2}px arial`
        ctx.fillStyle = 'rgb(0,255,0)'
        ctx.fillText(item.name, 0, rowHeight * index + padding + offset)

        //render the last time the food was eaten
        ctx.textBaseline = 'bottom'
        ctx.font = `${(rowHeight - padding * 2) / 2}px arial`
        let days = getDays(item.time)
        let text
        if (days == 0) text = 'eaten today'
        if (days == 1) text = 'eaten 1 day ago'
        if (days > 1) text = `eaten ${days} days ago`
        ctx.fillText(text, 0, rowHeight * index + rowHeight - padding + offset)

        //render the foods index
        ctx.textAlign = 'right'
        ctx.textBaseline = 'top'
        ctx.font = `${(rowHeight - padding * 2) / 2}px arial`
        ctx.fillStyle = 'rgb(0,255,0)'
        ctx.fillText(`#${(index + 1)}`, canvas.width, rowHeight * index + padding + offset)
    }
    requestAnimationFrame(render)
})()