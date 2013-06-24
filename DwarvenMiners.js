//set main namespace
goog.provide('DwarvenMiners');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');


// entrypoint
DwarvenMiners.start = function(){
    var grid = {
        x: 10,
        y: 15,
        size: 36,
        getSpriteSize: function() { return this.size },
        getWidth: function() { return this.x },
        getHeight: function() { return this.y },
        getSceneWidth: function() { return (this.x * this.size) },
        getSceneHeight: function() { return (this.y * this.size) }
    };

    var MINE_DEPTH = 200;

	var director = new lime.Director(document.getElementById("game"), grid.getSceneWidth(), grid.getSceneHeight()),
	    mineScene = new lime.Scene(),
        mineBgLayer = new lime.Layer().setPosition(0, 0),
        mineFloorLayer = new lime.Layer().setPosition(0, 0);

    mineBgLayer.appendChild(
        new lime.Sprite().setAnchorPoint(0, 0)
            .setSize(grid.getSceneWidth(), grid.getSceneHeight())
            .setFill("#817760")
    );
    mineBgLayer.appendChild(
        new lime.Sprite().setAnchorPoint(0, 0)
            .setSize(grid.getSceneWidth(), grid.getSpriteSize() * 2)
            .setFill("#9099BA")
    );
    mineBgLayer.appendChild(
        new lime.Sprite().setAnchorPoint(0, 0)
            .setSize(grid.getSceneWidth(), grid.getSpriteSize() / 8)
            .setPosition(0, grid.getSpriteSize() * 2)
            .setFill("#000")
            .setOpacity(.5)
    )

    for (var i = 0; i <= MINE_DEPTH; i++)
    {
        var minY = grid.getSpriteSize() * 3;
        var minX = grid.getSpriteSize();

        var xPos = minX + Math.random() * (grid.getSceneWidth() - grid.getSpriteSize() * 2);
        var yPos = minY + i * (grid.getSpriteSize() * 2);

        mineFloorLayer.appendChild(
            new lime.Circle().setSize(grid.getSpriteSize() * 1.5, grid.getSpriteSize() * 1.5)
                .setPosition(xPos, yPos)
                .setOpacity(.6)
                .setFill("#FFF")
                .appendChild(
                    new lime.Circle().setSize(grid.getSpriteSize() * 1, grid.getSpriteSize() * 1)
                        .setFill("#BBB")
                )
        );
    }

    //add target and title to the scene
    mineScene.appendChild(mineBgLayer);
    mineScene.appendChild(mineFloorLayer);

	//director.makeMobileWebAppCapable();

	// set current scene active
	director.replaceScene(mineScene);
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('DwarvenMiners.start', DwarvenMiners.start);
