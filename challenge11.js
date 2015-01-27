{
    init: function(elevators, floors) {
        var TOP_FLOOR = floors.length - 1;
        
        var getElevator = function(floorNum) {
            var lightestElevators = getLightestElevators();

            if (lightestElevators.length === 1) {
                return lightestElevators[0];
            }
            else {
                var closest;
                var diff = 100;
                var newDiff = 0;
                for (i = 0; i < lightestElevators.length; i++){
                    newDiff = Math.abs(floorNum - lightestElevators[i].currentFloor());
                    if (newDiff < diff) {
                        closest = lightestElevators[i];
                        diff = newDiff;
                    }
                }
                return closest;
            }
        };
        
        var getLightestElevators = function() {
            var lowestLoadFactor = 100;
            for (i = 0; i < elevators.length; i++){
                var elevator = elevators[i];
                if (elevator.loadFactor() < lowestLoadFactor) {
                    lowestLoadFactor = elevator.loadFactor();
                }
            }

            var lightestElevators = [];
            for (j = 0; j < elevators.length; j++){
                var elevator = elevators[j];
                if (elevator.loadFactor() === lowestLoadFactor) {
                    lightestElevators.push(elevator);
                }
            }
            
            return lightestElevators;
        };
        
        for (i = 0; i < elevators.length; i++){
            var elevator = elevators[i];
            elevator.on("idle", function() {
            });
            elevator.on("floor_button_pressed", function(floorNum) {
                this.goToFloor(floorNum);
            });
            elevator.on("stopped_at_floor", function(floorNum) {
                var nextFloor = this.destinationQueue[0];
                if (nextFloor) {
                    this.goingUpIndicator(floorNum < nextFloor);
                    this.goingDownIndicator(floorNum > nextFloor);

                    if (floors[floorNum].up && this.goingUpIndicator()) {
                        floors[floorNum].up = false;
                    }
                    if (floors[floorNum].down && this.goingDownIndicator()) {
                        floors[floorNum].down = false;
                    }
                }
                else {
                    this.goingUpIndicator(true);
                    this.goingDownIndicator(true);
                }
            });
            elevator.on("passing_floor", function(floorNum, direction) {
                if (floors[floorNum].up && "direction" === "up") {
                    this.goToFloor(floorNum, true);
                }
                else if (floors[floorNum].down && "direction" === "down") {
                    this.goToFloor(floorNum, true);
                }
            });
        }

        for (i = 0; i < floors.length; i++){
            var floor = floors[i];
            
            floor.on("up_button_pressed", function() {
                this.up = true;
                var elevator = getElevator(this.floorNum());
                elevator.goToFloor(this.floorNum());
            });

            floor.on("down_button_pressed", function() {
                this.down = true;
                var elevator = getElevator(this.floorNum());
                elevator.goToFloor(this.floorNum());
            });
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}