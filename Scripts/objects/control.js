/// <reference path="../../typings/tsd.d.ts"/>
/*
Author:                Elaine Mae Villarino (villare025)
Last Modified By:      Elaine Mae Villarino (villare025)
Last Modified Date:    Friday, February 26th, 2016
Program Description:   Control files contain the classes that will allow GUI Controls (as per user/overseer's inputs) to:
                         >> focus on a planet.
                         >> focus on the solar system.
Revision History:      https://github.com/villare025/COMP392-Assignment2/commits/master
Last Modification:     Added Program Header
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        function Control() {
        }
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        //Switch camera to view Sun 
        Control.prototype.viewSun = function () {
            sun.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        };
        //Switch camera to view planet1 - Styx
        Control.prototype.viewStyx = function () {
            styx.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        };
        //Switch camera to view planet2 - Nike
        Control.prototype.viewNike = function () {
            nike.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        };
        //Switch camera to view planet3 - Kratos
        Control.prototype.viewKratos = function () {
            kratos.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        };
        //Switch camera to view planet4 - Zelos
        Control.prototype.viewZelos = function () {
            zelos.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        };
        //Switch camera to view planet5 - Bia
        Control.prototype.viewBia = function () {
            bia.add(camera);
            camera.fov = 75 * 0.1;
            camera.updateProjectionMatrix();
        };
        //Switch camera to view system
        Control.prototype.viewSolarSystem = function () {
            sun.add(camera);
            camera.position.x = -1100;
            camera.position.y = 1000;
            camera.position.z = 1100;
            camera.lookAt(new Vector3(0, 0, 0));
            camera.fov = 45;
            camera.updateProjectionMatrix();
        };
        //Switch camera to view system
        Control.prototype.viewFarther = function () {
            sun.add(camera);
            camera.position.x = -2100;
            camera.position.y = 2000;
            camera.position.z = 2100;
            camera.lookAt(new Vector3(0, 0, 0));
            camera.fov = 45;
            camera.updateProjectionMatrix();
        };
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
