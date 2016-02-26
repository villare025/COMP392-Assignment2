/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        function Control() {
        }
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        //Switch camera to view planet3
        Control.prototype.viewPlanet2 = function () {
            plnt2.add(camera);
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
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
