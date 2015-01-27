// Works some of the time.
{
    init: function(elevators, floors) {
        var BOTTOM_FLOOR = 0;
        var TOP_FLOOR = floors.length - 1;
        var QUEUE = [];
    
        for (f in floors){
            var floor = floors[f];

            floor.on("up_button_pressed", function() {
                QUEUE.push({
                    "floorNum": this.floorNum(),
                    "direction": "up"
                });
            });

            floor.on("up_button_pressed", function() {
                QUEUE.push({
                    "floorNum": this.floorNum(),
                    "direction": "down"
                });
            });
        }

        for (e in elevators) {
            var elevator = elevators[e];
            
            var getRandomFloorNum = function(currentFloor) {
                //this.min = 0;
                //this.max = TOP_FLOOR;
                //return Math.floor(Math.random() * (max - min)) + min;
                
                if (currentFloor === BOTTOM_FLOOR) {
                    return BOTTOM_FLOOR + 1;
                }
                else if (currentFloor === TOP_FLOOR) {
                    return TOP_FLOOR - 1;
                }
                else {
                    return Math.floor(Math.random * 100 % 2 === 0) ? -1 : 1;
                }
            };
            
            elevator.on("idle", function() {
                this.nextInQueue = QUEUE.shift();
                if (this.nextInQueue) {
                    this.goToFloor(this.nextInQueue.floorNum);
                }
                else {
                    this.goToFloor(getRandomFloorNum(this.currentFloor()));
                }
            });

            elevator.on("stopped_at_floor", function(floorNum) {
                var nextFloor = this.destinationQueue[0];
                if (nextFloor) {
                    this.goingUpIndicator(floorNum < nextFloor);
                    this.goingDownIndicator(floorNum > nextFloor);
                }
                else {
                    this.goingUpIndicator(true);
                    this.goingDownIndicator(true);
                }
            });
            
            elevator.on("floor_button_pressed", function(floorNum) {
                this.goToFloor(floorNum);
            });
        }
    },
    update: function(dt, elevators, floors) {
    }
}