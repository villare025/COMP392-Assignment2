/// <reference path="../../typings/tsd.d.ts"/>

/*
Author:                Elaine Mae Villarino (villare025)
Last Modified By:      Elaine Mae Villarino (villare025) 
Last Modified Date:    Friday, February 26th, 2016
Program Description:   Control files contain the classes that will allow GUI Controls (as per user/overseer's inputs) to:
                         >> focus on a planet.
                         >> focus on the solar system.
Revision History:      https://github.com/villare025/COMP392-Assignment2/commits/master
Last Modification:     Added View Alala
*/

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++

        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        //Switch camera to view Sun 
        public viewSun(): void {
            sun.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet1 - Styx
        public viewStyx(): void {
            styx.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet2 - Nike
        public viewNike(): void {
            nike.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet3 - Kratos
        public viewKratos(): void {
            kratos.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet4 - Zelos
        public viewZelos(): void {
            zelos.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet5 - Bia
        public viewBia(): void {
            bia.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        }
        //Switch camera to view planet6 - Alala
        public viewAlala(): void {
            alala.add(camera);
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
