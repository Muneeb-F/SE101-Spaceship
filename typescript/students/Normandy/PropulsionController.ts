import { angleDiff, Vector2, withinPiRange } from '../helpers.js'
import { ThrusterName } from '../types.js'
import PropulsionController from '../../src/subsystems/propulsionController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourSensorsController from './SensorsController.js'
export default class YourPropulsionController extends PropulsionController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	navigation: YourNavigationController

	//Add additional attributes here
	propulsionUpdate(setThruster: (thruster: ThrusterName, power: number) => Error | null) {
        if(!this.sensors.target) return
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading)
        const force = Math.min(Math.abs(1000 * headingDiff), 100)
        if(Math.abs(headingDiff) < 0.05) {
            setThruster('clockwise', 0);
            setThruster('counterClockwise', 0);
        }
        if(headingDiff < 0) {
            setThruster('clockwise', 2);
            setThruster('counterClockwise', 0);
        }
        else if(headingDiff > 0){
            setThruster('clockwise', 0);
            setThruster('counterClockwise', 2);
        }

        if(Math.abs(headingDiff) < 0.05) {
            setThruster('main', 100);
        } else {
            setThruster('main', 0);
        }
        console.log(headingDiff);
    }
}


        // var kD=0.5, kP=0.7, kI=0.4, E=0, prevE=0, I=0, D=0, P, Pwr=0, Dst=headingDiff;

        // if (headingDiff < 0){
        //     do {
        //         E = Dst - angleDiff(this.navigation.angle, this.sensors.target.heading)
        //         I += E;
        //         if(E == 0 || Math.abs(E) > Math.abs(Dst)) {
        //             I = 0;
        //         }
        //         D = E - prevE;
        //         prevE = E;
        //         Pwr = E*kP + I*kI + D*kD;
        //         setThruster('clockwise', Pwr);
        //         setThruster('counterClockwise', 0);
        //     } while(Math.abs(E)>=0.05);
        // } else {
        //     do {
        //         E = Dst - angleDiff(this.navigation.angle, this.sensors.target.heading)
        //         I += E;
        //         if(E == 0 || Math.abs(E) > Math.abs(Dst)) {
        //             I = 0;
        //         }
        //         D = E - prevE;
        //         prevE = E;
        //         Pwr = E*kP + I*kI + D*kD;
        //         setThruster('clockwise', 0);
        //         setThruster('counterClockwise', Pwr);
        //     } while(Math.abs(E)>=0.05);
        // }
        // // setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0)