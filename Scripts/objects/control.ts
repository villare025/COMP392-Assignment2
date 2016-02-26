/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++

        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        //Switch camera to view planet1
        public viewPlanet1(): void {
            plnt1.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet2
        public viewPlanet2(): void {
            plnt2.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet3
        public viewPlanet3(): void {
            plnt3.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet4
        public viewPlanet4(): void {
            plnt4.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet5
        public viewPlanet5(): void {
            plnt5.add(camera);
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
        //Switch camera to view system
        public viewFarther(): void {
            sun.add(camera);
            camera.position.x = -2100;
            camera.position.y = 2000;
            camera.position.z = 2100;
            camera.lookAt(new Vector3(0, 0, 0));
            camera.fov = 45;
            camera.updateProjectionMatrix();
        }
    }
}
