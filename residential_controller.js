// const { flowRight, floor } = require("lodash")
let elevatorID= 1
// let floorRequestButton = 1
let callButtonID = 1


class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this.ID = _id
        this.amountOfFloors = _amountOfFloors
        this.amountOfElevators = _amountOfElevators
        this.status = "status"
        this.elevatorList = []
        this.callButtonList= []
        this.createElevators(_amountOfFloors, _amountOfElevators)
        this.createCallButtons(_amountOfFloors)
    };

    createCallButtons (_amountOfFloors){
        let buttonFloor = 1
        for (let i = 0; i < _amountOfFloors; i++) {                     
            if (buttonFloor < _amountOfFloors){                       //If it's not the last floor
                let callButton = new CallButton(callButtonID, buttonFloor, "up")
                this.callButtonList.push(callButton) 
                callButtonID++
            }
            if (buttonFloor > 1){                                      //If it's not the first floor
                let callButton = new CallButton(callButtonID, buttonFloor, "down")
                this.callButtonList.push(callButton)
                callButtonID++
            }
            buttonFloor++
        }

        }



    createElevators (_amountOfFloors, _amountOfElevators){
        for (let i = 0; i < _amountOfElevators; i++){
            let elevator = new Elevator(elevatorID, _amountOfFloors, 1)
            this.elevatorList.push(elevator)
            elevatorID++
        }
    }



    requestElevator (floor, direction){
        // Elevator.findElevator.call (floor, direction)  
        //     return bestElevator   
        let elevator = this.findElevator(floor, direction) 
            // return bestElevator
        elevator.floorRequestList.push(floor)
        elevator.move()
        return elevator

    }


    findElevator (requestedFloor, requestedDirection){
        // let bestElevator
        // let bestScore = 5
        // let referenceGap = 10000000
        let bestElevatorInformations ={
            bestElevator: null, 
            bestScore: 5,
            referenceGap: 10000000
        }
        // for (let elevator of this.elevatorList){
            // for (let i = 0; i < this.elevatorList.length; i++){
        this.elevatorList.forEach((elevator) => {
            if (requestedFloor == elevator.currentFloor && elevator.status == "stopped" && requestedDirection == elevator.direction){
                bestElevatorInformations = this.checkIfElevatorIsBetter(1, elevator, bestElevatorInformations, requestedFloor)
            }
            else if (requestedFloor > elevator.currentFloor && elevator.direction == "up" && requestedDirection == elevator.direction){
                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor)
            }
            else if (requestedFloor < elevator.currentFloor && elevator.direction == "down" && requestedDirection == elevator.direction){
                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor)
            }
            else if (elevator.status= "idle"){
                bestElevatorInformations = this.checkIfElevatorIsBetter(3, elevator, bestElevatorInformations, requestedFloor)
            }
        // bestScore = bestElevatorInformations && bestScore
        // referenceGap = bestElevatorInformations && referenceGap
        // console.log('************************************************')
        // console.log(bestElevatorInformations.bestElevator)
    })
    return bestElevatorInformations.bestElevator 
    }


    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestElevatorInformations, floor){
        if (scoreToCheck < bestElevatorInformations.bestScore){
            bestElevatorInformations.bestScore = scoreToCheck
            bestElevatorInformations.bestElevator = newElevator
            bestElevatorInformations.referenceGap = Math.abs(newElevator.currentFloor - floor)
        }
        else if (bestElevatorInformations.bestScore = scoreToCheck){
            let gap = Math.abs(newElevator.currentFloor - floor)
            if (bestElevatorInformations.referenceGap > gap){
                bestElevatorInformations.bestElevator = newElevator
                bestElevatorInformations.referenceGap = gap
            }
        }
            return bestElevatorInformations
        } 

    }


class Elevator {
    constructor(_id, _amountOfFloors, _currentFloor) {
        this.ID = _id
        this.status = "status"
        this.currentFloor = _currentFloor
        this.direction = null
        this.door = new Door(_id)
        this.floorRequestButtonList =[]
        this.floorRequestList = []

        // let buttonFloor = 1
        // let floorRequestButtonID = 1
        // for (let i = 0; i < _amountOfFloors; i++){
        //     this.floorRequestList.push(new FloorRequestButton(floorRequestButtonID, buttonFloor))
        //     buttonFloor++
        //     floorRequestButtonID++
        // }
        this.floorRequestsButtons(_amountOfFloors)
    };


    floorRequestsButtons(_amountOfFloors){
        let buttonFloor = 1
        let floorRequestButtonID = 1
        for (let i = 0; i < _amountOfFloors; i++) {
            let floorRequestButton = new FloorRequestButton(floorRequestButtonID, buttonFloor)
            this.floorRequestButtonList.push(floorRequestButton)
            buttonFloor++
            floorRequestButtonID++
        }
                
    }

    requestFloor(floor){
        floor = 1
        this.move()
        // call(this.operateDoors)
    }  
 

    move() {
        while (this.floorRequestList.length != 0) {
            let destination = this.floorRequestList[0];
            this.status = "moving"
            if (this.currentFloor < destination){
                this.direction = "up"
                this.sortFloorList()
                while(this.currentFloor < destination){
                    this.currentFloor++
                    this.screenDisplay = this.currentFloor
                }
            }
            else if (this.currentFloor > destination){
                this.direction = "down"
                this.sortFloorList()
                while(this.currentFloor > destination){
                    this.currentFloor--
                    this.screenDisplay = this.currentFloor
                }
            
            }
            this.status = "stopped"
            this.floorRequestList.shift()
        }
        this.status = "idle"
    }

    
    sortFloorList() {
        if (this.direction = "up") {
            this.floorRequestList.sort(function( a, b){return a-b})
        }
        else if (this.direction = "down") {
            this.floorRequestList.sort(function( a, b){return b-a})
        }
    }


};



class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id
        // this.status = "status"
        this.floor = _floor
        this.direction = _direction
    }
}

class FloorRequestButton {
    constructor(_id, _floor) {
        this.ID = _id
        this.status = "status"
        this.floor = _floor
    }
}

class Door {
    constructor(_id) {
        this.ID = _id
        this.status = "status"
}
}
module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }


