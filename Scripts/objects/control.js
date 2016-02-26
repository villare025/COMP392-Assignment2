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
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
