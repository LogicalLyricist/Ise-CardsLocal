var ctx = document.getElementById("ctx").getContext("2d");

    ctx.font = '30px Arial';
    ctx.fillStyle="#000000";

    var x = 0;
    var spdX = 30;
    var y = 0;
    var spdY = 5;

    setInterval(update,100)

    function update()
        x += spdX;
        y += spdY;
        ctx.fillText('Test',x,y)
        console.log('hello',x)
        if(x > 1500)
            console.log('Out of Bounds')