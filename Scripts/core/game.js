"use strict";
let Game = (function () {
    // variable declarations
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let welcomeLabel;
    let startButton;
    let leftDie;
    let rightDie;
    let assetManifest = [
        { id: "1", src: "./Assets/images/die1.jpg" },
        { id: "2", src: "./Assets/images/die2.jpg" },
        { id: "3", src: "./Assets/images/die3.jpg" },
        { id: "4", src: "./Assets/images/die4.jpg" },
        { id: "5", src: "./Assets/images/die5.jpg" },
        { id: "6", src: "./Assets/images/die6.jpg" },
        { id: "backButton", src: "./Assets/images/startButton.png" },
        { id: "background", src: "./Assets/images/background.png" },
        { id: "blank", src: "./Assets/images/blank.png" },
        { id: "button", src: "./Assets/images/button.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "rollButton", src: "./Assets/images/rollButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "startOverButton", src: "./Assets/images/startOverButton.png" }
    ];
    function Preload() {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config
        Main();
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        welcomeLabel = new UIObjects.Label("Welcome to the Rolling Game!!!", "35px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y - 200, true);
        stage.addChild(welcomeLabel);
        startButton = new UIObjects.Button("button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(startButton);
        leftDie = new Core.GameObject("1", Config.Game.CENTER_X - 100, Config.Game.CENTER_Y - 50, true);
        stage.addChild(leftDie);
        rightDie = new Core.GameObject("4", Config.Game.CENTER_X + 100, Config.Game.CENTER_Y - 50, true);
        stage.addChild(rightDie);
        startButton.on("click", () => {
            console.log("example button clicked");
        });
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map