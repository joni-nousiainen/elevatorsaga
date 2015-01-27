{
    init: function(elevators, floors) {
        var TOP_FLOOR = floors.length - 1;
        var freeElevators = [];
        var getElevator = function(floorNum) {
            if (freeElevators.length > 0) {
                return freeElevators.pop();
            }
            else {
                return getLightestElevator();
                //return getClosestElevator(floorNum);
            }
        };
        /*
        var getClosestElevator = function(floorNum) {
            var elevator;
            var diff = 100;
            var newDiff = 0;

            for (i = 0; i < elevators.length; i++){
                newDiff = Math.abs(floorNum - elevators[i].currentFloor());
                if (newDiff < diff) {
                    elevator = elevators[i];
                    diff = newDiff;
                }
            }

            return elevator;
        };
        */
        var getLightestElevator = function() {
            var elevator;
            var lowestLoadFactor = 100;
            
            for (i = 0; i < elevators.length; i++){
                if (elevators[i].loadFactor() < lowestLoadFactor) {
                    elevator = elevators[i];
                    lowestLoadFactor = elevators[i].loadFactor();
                }
            }
            
            return elevator;
        };
        
        for (i = 0; i < elevators.length; i++){
            var elevator = elevators[i];
            elevator.on("idle", function() {
                freeElevators.push(this);
            });
            elevator.on("floor_button_pressed", function(floorNum) {
                this.goToFloor(floorNum);
            });
            elevator.on("stopped_at_floor", function(floorNum) {
            });
        }

        for (i = 0; i < floors.length; i++){
            var floor = floors[i];
            
            floor.on("up_button_pressed", function() {
                var elevator = getElevator(this.floorNum());
                elevator.goToFloor(this.floorNum());
            });

            floor.on("down_button_pressed", function() {
                var elevator = getElevator(this.floorNum());
                elevator.goToFloor(this.floorNum());
            });
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}