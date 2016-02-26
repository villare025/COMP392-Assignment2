/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++

        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        //Switch camera to view planet3
        public viewPlanet2(): void {
            plnt2.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
    }
}
