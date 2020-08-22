/*
    AUTHOR:VEYSEL BOYBAY
    FILE NAME: GAMES.TS
    STUDENT ID: 301115376
    DATE: AUGUST 21,2020
    
*/
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let assets: createjs.LoadQueue;

    let welcomeLabel: UIObjects.Label;
    let startButton:UIObjects.Button;   
    let leftDie:Core.GameObject;
    let rightDie:Core.GameObject;
    let rightLabel:createjs.Text;
    let leftLabel:createjs.Text;

    let assetManifest = 
    [
        {id:"1", src:"./Assets/images/die1.jpg"},
        {id:"2", src:"./Assets/images/die2.jpg"},
        {id:"3", src:"./Assets/images/die3.jpg"},
        {id:"4", src:"./Assets/images/die4.jpg"},
        {id:"5", src:"./Assets/images/die5.jpg"},
        {id:"6", src:"./Assets/images/die6.jpg"},
        {id:"backButton", src:"./Assets/images/startButton.png"},
        {id:"background", src:"./Assets/images/background.png"},
        {id:"blank", src:"./Assets/images/blank.png"},
        {id:"button", src:"./Assets/images/button.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"rollButton", src:"./Assets/images/rollButton.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"startOverButton", src:"./Assets/images/startOverButton.png"}
    ];

    function Preload():void
    {
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
    function Start():void
    {
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
    function Update():void
    {
        stage.update();
    }

    /**
     * DIE PICS ARE ADDED.
     * RANDOM NUMBERS ARE CREATED AND MATCHED WITH THE PICS
     * DISPLAYS DICE REGARDING TO RANDOM NUMBERS
     *
     */
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

        welcomeLabel = new UIObjects.Label("Welcome to the Rolling Game!!!", "35px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y-200, true);
        stage.addChild(welcomeLabel);

        rightLabel=new UIObjects.Label("4","25px","monospace","blue",Config.Game.CENTER_X+100,Config.Game.CENTER_Y+30,true);
        stage.addChild(rightLabel);

        leftLabel=new UIObjects.Label("1","25px","monospace","blue",Config.Game.CENTER_X-100,Config.Game.CENTER_Y+30,true);
        stage.addChild(leftLabel);

        startButton = new UIObjects.Button("button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(startButton);

        leftDie=new Core.GameObject("1",Config.Game.CENTER_X-100,Config.Game.CENTER_Y-50,true);
        stage.addChild(leftDie);

        rightDie=new Core.GameObject("4",Config.Game.CENTER_X+100,Config.Game.CENTER_Y-50,true);
        stage.addChild(rightDie);

       


        startButton.on("click", ()=>{
            
            let rollRight=Util.Mathf.RandomRange(1,6);
            rollRight=Math.round(rollRight);
            if(rollRight>6)
            {
                rollRight=6;
            }
            rightDie.image=assets.getResult(rollRight) as HTMLImageElement;
            rightLabel.text=rollRight.toString();

            let rollLeft=Util.Mathf.RandomRange(1,6);
            rollLeft=Math.round(rollLeft);
            if(rollLeft>6)
            {
                rollLeft=6;
            }
            leftDie.image=assets.getResult(rollLeft) as HTMLImageElement;
            leftLabel.text=rollLeft.toString();

            console.log(`left:`+Math.round(rollLeft));
            console.log(`Right:`+Math.round(rollRight))
            
        });
    }

    window.addEventListener('load', Preload);


})();