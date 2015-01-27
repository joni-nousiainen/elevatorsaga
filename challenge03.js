{
    init: function(elevators, floors) {
        for (i in elevators) {
            var elevator = elevators[i];
            elevator.on("idle", function() {
                this.goToFloor(0);
                this.goToFloor(1);
                this.goToFloor(2);
                this.goToFloor(3);
                this.goToFloor(4);
            });
        }
    },
    update: function(dt, elevators, floors) {
    }
}