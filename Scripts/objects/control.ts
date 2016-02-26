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
        //Switch camera to view system
        public viewSolarSystem(): void {
            sun.add(camera);
            camera.position.x = -1100;
            camera.position.y = 1000;
            camera.position.z = 1100;
            camera.lookAt(new Vector3(0, 0, 0));
            camera.fov = 45;
            camera.updateProjectionMatrix();
        }
    }
}
