function lgout() {
    window.location.assign("/client/tank.html");
    firebase.auth().signOut();
    //console.log("hello");
}


//generate random number using function
var terrain = [];
function initialize_terrain(){

terrain[0] = 450;
for (index = 1; index < 1300; index++) {
    var myArray = (3*(Math.random()) * 0.9);
    terrain[699] = 350;
    if (index <= 500 ) {
        terrain[index] = terrain[index - 1] - (index/450)*myArray;
    }
    else if (index < 699 && index > 500) {
        terrain[index] = terrain[index - 1] + myArray-(0.1)*Math.random();
    }
    else if (index < 900 && index > 699) {
        terrain[index] = terrain[index - 1] - (index/2000)*myArray;
    }
    else if (index < 1000 && index > 899) {
        terrain[index] = terrain[index - 1] + myArray-Math.random();
    }
    else if (index < 1200 && index > 999) {
        terrain[index] = terrain[index - 1] - (0.7)*myArray+(2)*Math.random();
    }
    else if (index < 1300 && index > 1199) {
        terrain[index] = terrain[index - 1]-0.25 ;
    }
}
}
var line, line1, rec_1, c, stage, img, img1, img_bomb, velocity, velocity_1, velocity_2, img_b, rec_2;
var weapon, t;
var dest_x, dest_y, dest_r, dest_bool, xi, yi, ai, fire_control_bool, first_fire;
var tank1_x, tank1_y, tank1_regX, tank1_regY, tank1n_x, tank1n_y, tank1_regX, tank1n_y, tank1n_rotation;
var tank2_x, tank2_y, tank2_regX, tank2_regY, tank2n_x, tank2n_y, tank2_regX, tank2n_y, tank2n_rotation;
var weapon_list = [];
var dest_r_list = [];
var select_weapon;
var slider_1, slider_2, slider_3, slider_4, slider_1i, slider_2i;
var s1;
var s2;
var score1= document.getElementById("score1");
var score2= document.getElementById("score2");
var single_palyer;
var start_image, end_image;
var total_move1, total_move2;
var total_step1, total_step2;
function init() {
    initialize_terrain()
    c = document.getElementById("demoCanvas");
    stage = new createjs.Stage(c);
    /*var ctx = c.getContext("2d");*/  
    slider_1 = document.getElementById("angle_1");
    slider_1.oninput = function(){
        if(slider_1i < slider_1.value)
        {
            while( line1.rotation < slider_1.value)
            {
                aim_1();
            }
        }
        else
        {
            while( line1.rotation > slider_1.value)
            {
                aim_1a();
            }
        }
        slider_1i = slider_1.value;
    }
    slider_2 = document.getElementById("angle_2");
    slider_2.oninput = function(){
        if(single_palyer == 0)
        {   if(slider_2i < slider_2.value)
            {
                while( line2.rotation < slider_2.value-40)
                {
                    aim_2a();
                }
            }
            else
            {
                while( line2.rotation > slider_2.value-40)
                {
                    aim_2();
                }
            }
            slider_2i = slider_2.value;
        }
    }
    slider_3 = document.getElementById("Power_1");
    slider_3.oninput = function(){
        velocity_1 = 1.5*slider_3.value;
    }
    slider_4 = document.getElementById("Power_2");
    slider_4.oninput = function(){
        if(single_palyer == 0)
        velocity_2 = 1.5*slider_4.value;
    }
    weapon_selec = document.getElementById("weapon_selector");
    weapon_selec.oninput = function(){
        while(select_weapon != weapon_selec.value-1)
        {
            select_weapon_fun();
        }
    }
    img = new Image();
    img.src = "/client/img/1.png";
    img1 = new Image();
    img1.src = "/client/img/terrainImage.jpg";
    img_b = new Image();
    img_b.src = "/client/img/mountain.jpeg";
    img_b.onload = background();
    img.onload = make_terrain();
    img.onload = init1();
    velocity_1 = slider_3.value;
    velocity_2 = slider_4.value;
    total_move1 = 10;
    total_move2 = 10;
    total_step1 = 3;
    total_step2 = 3;
    //img.onload = set_tank();
    //single_palyer = 0;
    

    function init1(){
            //console.log(c);
            //img1.onload = init2();
            tank1_regX = 40;
            tank1_regY = 15;
            tank1_x = 200;
            tank1_y = 135;
            tank1n_rotation = 45;
            tank1n_regX = 50;
            tank1n_regY = 50;
            tank1n_x = 200;
            tank1n_y = 125;
            tank2_regX = 40;
            tank2_regY = 15;
            tank2_x = 1200;
            tank2_y = 125;
            tank2n_rotation = 45;
            tank2n_regX = 50;
            tank2n_regY = 50;
            tank2n_x = 1200;
            tank2n_y = 125;
            fire_control_bool = 1;
            first_fire = 0;
            select_weapon = 0;
            slider_1i = slider_1.value;
            slider_2i = slider_2.value;
            s1 = 0;
            s2 = 0;
            document.getElementById('score1').innerHTML = "Player1: " + s1;
            document.getElementById('score2').innerHTML = "Player2: " + s2;
            //draw rectangle
            make_tank1();
            set_tank_1();
            make_tank2();
            set_tank_2();
            intialise_weapon_list();
            //rec2.addEventListener("click", move_right);
            //createjs.Ticker.addEventListener("tick", handleTick);
            stage.update();
            

            //background();
    }
    

}
function background(){
    //var image = event.target;
    var bitmap = new createjs.Bitmap(img_b);
    bitmap.scaleX = 0.5;
    bitmap.scaleY = 0.4;
    stage.addChild(bitmap);
    stage.update();
} 
function make_tank1(){
            rec_1 = new createjs.Shape();
            rec_1.graphics.setStrokeStyle(0.01, "round").beginStroke("black");
            rec_1.graphics.beginBitmapFill(img).drawRect(0, 0, 80, 30);
            rec_1.regX = tank1_regX;
            rec_1.regY = tank1_regY;
            rec_1.x = tank1_x;
            rec_1.y = tank1_y;
            stage.addChild(rec_1);
            make_nozzl1();
            stage.update();
            if(total_move1 == 0 && total_move2 == 0)
            {
                winner();
            }
}
function make_nozzl1(){
            line1 = new createjs.Shape();
            line1.graphics.setStrokeStyle(4, "round").beginStroke("black").moveTo(0,0).lineTo(50, 50);
            line1.rotation = tank1n_rotation;
            line1.regX = tank1n_regX;
            line1.regY = tank1n_regY;
            line1.x = tank1n_x;
            line1.y = tank1n_y;
            stage.addChild(line1);
            stage.update();
            set_tank_1();
}

function make_tank2(){
            rec_2 = new createjs.Shape();
            rec_2.graphics.setStrokeStyle(0.01, "round").beginStroke("black");
            rec_2.graphics.beginBitmapFill(img).drawRect(0, 0, 80, 30);
            rec_2.regX = tank2_regX;
            rec_2.regY = tank2_regY;
            rec_2.x = tank2_x;
            rec_2.y = tank2_y;
            stage.addChild(rec_2);
            make_nozzl2();
            stage.update();
}
function make_nozzl2(){
            line2 = new createjs.Shape();
            line2.graphics.setStrokeStyle(4, "round").beginStroke("black").moveTo(0,0).lineTo(50, 50);
            line2.rotation = tank2n_rotation;
            line2.regX = tank2n_regX;
            line2.regY = tank2n_regY;
            line2.x = tank2n_x;
            line2.y = tank2n_y;
            stage.addChild(line2);
            stage.update();
            set_tank_2();
}
function handleTick_1() {
	if(total_step1 >= 0)
	{   rec_1.x += 25;
	    line1.x+=25;
	    total_step1--;
	    set_tank_1();
	    //line.regX=0;
	//line.regY=20;
	    //line1.rotation+=5;
	    //set_tank();
	    stage.update();
	}
}
function handleTick_11() {
	if(total_step1 >= 0)
	{   rec_1.x -= 25;
	    line1.x-= 25;
	    total_step1--;
	    set_tank_1();
	    //line.regX=0;
	//line.regY=20;
	    //line1.rotation+=5;
	    //set_tank();
	    stage.update();
	}
}
function aim_1(){
    line1.rotation+=1;
    //console.log(line1.rotation);
    stage.update();
}
function aim_1a(){
    line1.rotation-=1;
    //console.log(line1.rotation);
    stage.update();
}
function handleTick_2() {
    if(total_step2 >= 0)
	{   rec_2.x -= 25;
	    line2.x-= 25;
	    total_step2--;
	    set_tank_2();
	    //line.regX=0;
	//line.regY=20;
	    //line1.rotation+=5;
	    //set_tank();
	    stage.update();
	}
}
function handleTick_21() {
    if(total_step2 >= 0)
	{   rec_2.x += 25;
	    line2.x += 25;
	    total_step2--;
	    set_tank_2();
	    //line.regX=0;
	//line.regY=20;
	    //line1.rotation+=5;
	    //set_tank();
	    stage.update();
	}
}

function aim_2(){
    line2.rotation-=1;
    //console.log(line1.rotation);
    stage.update();
}
function aim_2a(){
    line2.rotation+=1;
    //console.log(line1.rotation);
    stage.update();
}
function make_terrain(){

        line = new createjs.Shape();
        stage.addChild(line);

        //line.graphics.setStrokeStyle(1,"round");
        line.graphics.moveTo(0, 550);
        line.graphics.setStrokeStyle(1, "round").beginStroke("black");
        line.graphics.beginBitmapFill(img1);
        for (index = 0; index < 1300; index+=1) {
            
            line.graphics.lineTo(index, terrain[index]);
            //line.graphics.moveTo(index+1,700);
        }
        line.graphics.lineTo(1300,500);
        line.graphics.lineTo(0,500);
        //line.graphics.lineTo(0,549);
        line.graphics.endStroke();
        stage.update();
}
function set_tank_1(){
    var y1 = terrain[rec_1.x - 15];
    var y2 = terrain[rec_1.x + 15];
    //console.log("y1");
    //console.log(y1);
    //console.log(y2);
    var angle;
    
    {
        angle = (Math.atan((y2-y1)/(30))*180)/Math.PI;
        rec_1.rotation = angle;
    }
    //console.log("ksk");
    
    
    rec_1.y = ((y1+y2)/2) - 15*Math.cos(Math.atan((y2-y1)/(30))) ;
    //line1.x = 240;
    //console.log(line1.y);
    line1.y = (y1+y2)/2 - 30*Math.cos(Math.atan((y2-y1)/(30)));
    //console.log(line1.y);
    //console.log(line1);
    stage.update();
    
}
function set_tank_2(){
    var y1 = terrain[rec_2.x + 15];
    var y2 = terrain[rec_2.x - 15];
    //console.log("y1");
    //console.log(y1);
    //console.log(y2);
    var angle;
   
    
    {
        angle = Math.atan((y1-y2)/(30));
        if(((Math.atan((y1-y2)/(30))*180)/Math.PI)<180)
            {   rec_2.rotation = (Math.atan((y1-y2)/(30))*180)/Math.PI;
                //console.log("kebd");
            }
        else
            {   rec_2.rotation = (Math.atan((y1-y2)/(30))*180)/Math.PI + 180;
                //console.log("kebd");
            }
    }
    //console.log("ksk");
    
    
    rec_2.y = ((y1+y2)/2) - 15*Math.cos(angle) ;
    //line1.x = 240;
    //console.log(line1.y);
    line2.y = (y1+y2)/2 - 30*Math.cos(angle);
    //console.log(line1.y);
    //console.log(line1);
    stage.update();
    
}
function replace_tank_1(){
    tank1_regX = rec_1.regX;
    tank1_regY = rec_1.regY;
    tank1_x = rec_1.x;
    tank1_y = rec_1.y;
    tank1n_rotation = line1.rotation;
    tank1n_regX = line1.regX;
    tank1n_regY = line1.regY;
    tank1n_x = line1.x;
    tank1n_y = line1.y;
}
function replace_tank_2(){
    tank2_regX = rec_2.regX;
    tank2_regY = rec_2.regY;
    tank2_x = rec_2.x;
    tank2_y = rec_2.y;
    tank2n_rotation = line2.rotation;
    tank2n_regX = line2.regX;
    tank2n_regY = line2.regY;
    tank2n_x = line2.x;
    tank2n_y = line2.y;
}
function fire_1(){
    stage.removeChild(weapon);
    weapon = weapon_list[select_weapon];
    dest_r = dest_r_list[select_weapon];
    weapon.x = line1.x;
    weapon.y = line1.y;
    velocity = velocity_1;
    stage.addChild(weapon);
    stage.update();
    xi = weapon.x;
    yi = weapon.y;
    ai = line1.rotation;
    dest_bool = 1;
    t = 0;
    total_move1--;
    //rec4.addEventListener("click", end_weapon);
    //console.log(135-line1.rotation);
    if(first_fire == 0)
    {
        //console.log("kjhkdbasbmcds");
        createjs.Ticker.on("tick", tick);
        createjs.Ticker.framerate = 80;
        first_fire = 1;
    }    
}
function fire_2(){
    stage.removeChild(weapon);
    weapon = weapon_list[select_weapon];
    dest_r = dest_r_list[select_weapon];
    weapon.x = line2.x;
    weapon.y = line2.y;
    if(single_palyer == 1)
    smart_cpu();
    velocity = velocity_2;
    stage.addChild(weapon);
    stage.update();
    xi = weapon.x;
    yi = weapon.y;
    ai = line2.rotation;
    dest_bool = 1;
    t = 0;
    total_move2--;
    //rec4.addEventListener("click", end_weapon);
    //console.log(135-line1.rotation);
}
function fire_control(){
        
        if(fire_control_bool == 1)
        {
            //fire_control_bool = 0;
            fire_1();
        }
        else
        {
            //fire_control_bool = 1;
            //smart_cpu();
            fire_2();
        }
}
function tick(){
    document.getElementById('score1').innerHTML = "Player1: " + s1;
    document.getElementById('score2').innerHTML = "Player2: " + s2;

    //console.log(slider_1.value);
    //console.log(createjs.Ticker.framerate);
    //console.log(terrain[Math.ceil(weapon.x)]);
    if(weapon.y < terrain[Math.ceil(weapon.x)])
    {   t+=0.1;
        //console.log(Math.cos(Math.PI*(135-line1.rotation)/180));
        weapon.x = xi + velocity*(Math.cos(Math.PI*(135-ai)/180))*(t);
        weapon.y = yi - (velocity*(Math.sin(Math.PI*(135-ai)/180))*(t)) +((0.5)*(9.8)*Math.pow(t, 2))
        stage.update();
    }
    else
    {
        
        
        if(dest_bool == 1){
            dest_x = weapon.x;
            dest_y = weapon.y;
            dest_bool = 0;
            //console.log("gkkjdc");
            stage.removeChild(weapon);
            stage.update();
            destruction();
        }
    }
}
function destruction(){
    var y_cord = [];
    var x_cord = [];
    //console.log("dest_x");
    //console.log(dest_y);
    for(index = 0; index <= 2*dest_r; index++ )
    {
        //console.log(index);
        x_cord[index] = Math.ceil(dest_x )- dest_r + index;
    }
    for(index = 0; index <= 2*dest_r; index++ )
    {
        //console.log(index);
        var d_angle = Math.acos((x_cord[index]-Math.ceil(dest_x ))/dest_r);
        //console.log(d_angle*180/Math.PI)
        {
            y_cord[index] = dest_y + dest_r*Math.sin(d_angle);
        }
    }
    for(index = 0; index <= 2*dest_r; index++)
    {
        //
        //console.log(y_cord[index]);
        if(terrain[x_cord[index]] < y_cord[index])
        {
            //console.log(terrain[index]);
            //console.log(index);
            //console.log("old");
            terrain[x_cord[index]] = y_cord[index];
            //console.log(terrain[index]);
            //console.log("new");
        }
    }
    score_generate();
    //stage.removeAllChildren();
    stage.removeChild(line);
    //stage.upadte();
    make_terrain();
    stage.removeChild(rec_1);
    stage.removeChild(line1);
    stage.removeChild(rec_2);
    stage.removeChild(line2);
    replace_tank_1();
    replace_tank_2();
    make_tank1();
    make_tank2();
    //make_terrain();
}
function intialise_weapon_list(){

    weapon_list[0] = new createjs.Shape();
    weapon_list[0].graphics.beginFill("orange").drawRoundRectComplex(0, 0, 30, 20, 10, 2,10,2);
    dest_r_list[0] = 15;
    img_bomb = new Image();
    img_bomb.src = "/client/img/bomb1.jpg";
    img_bomb.onload = function(){
    weapon_list[1] = new createjs.Shape();
    weapon_list[1].graphics.beginBitmapFill(img_bomb).drawCircle(10,0,15);
    dest_r_list[1] = 25;}
    weapon_list[2] = new createjs.Shape();
    weapon_list[2].graphics.beginFill("orange").drawCircle(0,0,20);
    dest_r_list[2] = 35;
    weapon_list[3] = new createjs.Shape();
    weapon_list[3].graphics.beginFill("red").drawCircle(0,0,25);
    dest_r_list[3] = 45;
}
function select_weapon_fun(){
    if(select_weapon+1 > 3)
    {
        select_weapon = (select_weapon+1) % (4);
        //console.log(select_weapon);
    }
    else
    select_weapon++;
}

function score_generate(){
    if(fire_control_bool == 1)
    {
        if(Math.abs(dest_x - rec_2.x) < 40 + dest_r)
        {
            s1 += (dest_r/5)*Math.ceil(100/Math.ceil(Math.abs(dest_x - rec_2.x)));

        }
        //console.log(s1);
        fire_control_bool = 0;
    }
    else
    {
        if(Math.abs(dest_x - rec_1.x)< 40)
        {
            s2 += Math.ceil(100/Math.ceil(Math.abs(dest_x - rec_1.x)));
        }
        //console.log(s2);
        fire_control_bool = 1;
    }
}
var velocity_req, angle_req, check;
function smart_cpu(){
    get_data();
    check = 3;
    //console.log((Math.abs(rec_1.x - rec_2.x)*9.8)/Math.pow(velocity_req,2));
    function get_data(){
    velocity_req = 90 + (50)*(Math.random());
    while(((Math.abs(rec_1.x - rec_2.x)*9.8)/Math.pow(velocity_req,2)) > 1 && check > 0)
        {   velocity_req = 90 + (50)*(Math.random());
            check--;
        }
    if(((Math.abs(rec_1.x - rec_2.x)*9.8)/Math.pow(velocity_req,2)) <= 1)
        {   angle_req = ((0.5*(Math.asin((Math.abs(rec_1.x - rec_2.x)*9.8)/Math.pow(velocity_req,2))))*(180/Math.PI))-45;
        }
    else
        {   angle_req = 15;
            console.log("bug");
        }
    }
    console.log(velocity_req);
    console.log(angle_req);
    line2.rotation = angle_req;
    velocity_2 = velocity_req;
    slider_2.value = velocity_req;
    slider_4.value = angle_req + 45;
    //velocity_2 = slider_3.value;
    //line2.rotation = angle_req;
    //fire_2();
}
function singleplayer(){
    single.style.visibility= 'hidden';
    multi.style.visibility= 'hidden';
    move_1.style.visibility= 'visible';
    move_2.style.visibility= 'visible';
    fire.style.visibility= 'visible';
    Power_1.style.visibility= 'visible';
    Power_2.style.visibility= 'visible';
    angle_1.style.visibility= 'visible';
    angle_2.style.visibility= 'visible';
    score1.style.visibility= 'visible';
    move_11.style.visibility= 'visible';
    move_21.style.visibility= 'visible';
    score2.style.visibility= 'visible';
    cont.style.visibility= 'hidden';
    win.style.visibility= 'hidden';
    submit.style.visibility= 'hidden';
    weapon_selector.style.visibility= 'visible';
    single_palyer = 1;
    stage.removeAllChildren();
    init();
}
function multiplayer(){
    single.style.visibility= 'hidden';
    multi.style.visibility= 'hidden';
    move_1.style.visibility= 'visible';
    move_2.style.visibility= 'visible';
    fire.style.visibility= 'visible';
    Power_1.style.visibility= 'visible';
    Power_2.style.visibility= 'visible';
    angle_1.style.visibility= 'visible';
    angle_2.style.visibility= 'visible';
    score1.style.visibility= 'visible';
    score2.style.visibility= 'visible';
    move_11.style.visibility= 'visible';
    move_21.style.visibility= 'visible';
    weapon_selector.style.visibility= 'visible';
    cont.style.visibility= 'hidden';
    win.style.visibility= 'hidden';
    submit.style.visibility= 'hidden';
    single_palyer = 0;
    stage.removeAllChildren();
    init();
}
function the_start(){
    move_1.style.visibility= 'hidden';
    move_2.style.visibility= 'hidden';
    fire.style.visibility= 'hidden';
    Power_1.style.visibility= 'hidden';
    Power_2.style.visibility= 'hidden';
    angle_1.style.visibility= 'hidden';
    angle_2.style.visibility= 'hidden';
    score1.style.visibility= 'hidden';
    score2.style.visibility= 'hidden';
    submit.style.visibility= 'hidden';
    move_11.style.visibility= 'hidden';
    move_21.style.visibility= 'hidden';
    weapon_selector.style.visibility= 'hidden';
    cont.style.visibility= 'hidden';
    win.style.visibility= 'hidden';
    c = document.getElementById("demoCanvas");
    stage = new createjs.Stage(c);
    start_image = new Image();
    start_image.src = "/client/img/start.jpg"; 
    var bitmap = new createjs.Bitmap(start_image);
    bitmap.scaleX = 1.3;
    bitmap.scaleY = 1;
    stage.addChild(bitmap);
    stage.update();
}
function winner(){
        stage.removeAllChildren();
        total_move1 = 10;
        total_move2 = 10;
        total_step1 = 3;
        total_step2 = 3;
        the_end();
}
function the_end()
{
    submit.style.visibility= 'visible';
    move_1.style.visibility= 'hidden';
    move_2.style.visibility= 'hidden';
	move_11.style.visibility= 'hidden';
    move_21.style.visibility= 'hidden';   
    fire.style.visibility= 'hidden';
    Power_1.style.visibility= 'hidden';
    Power_2.style.visibility= 'hidden';
    angle_1.style.visibility= 'hidden';
    angle_2.style.visibility= 'hidden';
    score1.style.visibility= 'hidden';
    score2.style.visibility= 'hidden';
    weapon_selector.style.visibility= 'hidden';
    cont.style.visibility= 'visible';
    win.style.visibility= 'visible';
    c = document.getElementById("demoCanvas");
    stage = new createjs.Stage(c);
    end_image = new Image();
    end_image.src = "/client/img/end_img.jpg";
    var bitmap = new createjs.Bitmap(end_image);
    bitmap.scaleX = 1;
    bitmap.scaleY = 1;
    stage.addChild(bitmap);
    if(s1 > s2)
        document.getElementById('win').innerHTML = "Player1 You Won";
    else if(s1 < s2)
        document.getElementById('win').innerHTML = "Player2 You Won";
    else
        document.getElementById('win').innerHTML = "O O Match Drawn";
    stage.update();
}
function lets_start_again(){
    single.style.visibility= 'visible';
    multi.style.visibility= 'visible';
    submit.style.visibility= 'hidden';
    move_11.style.visibility= 'hidden';
    move_21.style.visibility= 'hidden';
    the_start();
}

function submit() {
    var firebaseRef = firebase.database().ref();
    if(single_palyer==0)
    {
        firebaseRef.child("player1").set(s1);
        firebaseRef.child("player2").set(s2);
    }
    else
    {
        firebaseRef.child("player1").set(s1);
        firebaseRef.child("CPU").set(s2);
    }
}
