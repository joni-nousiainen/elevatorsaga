// Kahtiajako: Toinen hoitaa ALAS liikenteen, toinen hoitaa YLÖS.
{
    init: function(elevators, floors) {  
        var one = elevators[0];
        one.goingDownIndicator(false);
        one.on("idle", function() {
            this.goToFloor(0);
        });
        one.on("floor_button_pressed", function(floorNum) {
            one.goToFloor(floorNum);
        });

        var two = elevators[1];
        two.goingUpIndicator(false);
        two.on("idle", function() {
            this.goToFloor(5);
        });
        two.on("floor_button_pressed", function(floorNum) {
            two.goToFloor(floorNum);
        });

        for (i = 0; i < floors.length; i++){
            var floor = floors[i];
            
            floor.on("up_button_pressed", function() {
                one.goToFloor(this.floorNum());
            });

            floor.on("down_button_pressed", function() {
                two.goToFloor(this.floorNum());
            });
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}