// Kahtiajako: Toinen hoitaa ALAS liikenteen, toinen hoitaa YLÖS.
// Sekä yksi kerros kerrallaan ylös alas kulkeva hissi.
{
    init: function(elevators, floors) {
        var TOP_FLOOR = floors.length - 1;
        
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
            this.goToFloor(TOP_FLOOR);
        });
        two.on("floor_button_pressed", function(floorNum) {
            two.goToFloor(floorNum);
        });
        
        var three = elevators[2];
        three.on("idle", function() {
            for (i = 0; i < floors.length; i++){
                this.goToFloor(i);
            }
            for (i = floors.length - 1; i >= 0; i--){
                this.goToFloor(i);
            }
        });
        three.on("stopped_at_floor", function(floorNum) {
            if (floorNum === 0) {
                this.goingUpIndicator(true);
                this.goingDownIndicator(false);
            }
            else if (floorNum === TOP_FLOOR) {
                this.goingUpIndicator(false);
                this.goingDownIndicator(true);
            }
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