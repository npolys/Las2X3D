function viewpointInfo(event) {
    let viewpoint = event.viewarea._scene.getViewpoint();
    let mat_view = event.viewarea.getViewMatrix().inverse();

    let rotation = new x3dom.fields.Quaternion(0, 0, 1, 0);
    rotation.setValue(mat_view);
    let rot = rotation.toAxisAngle();
    let translation = mat_view.e3();
    let center = viewpoint.getCenterOfRotation();

    console.log('\n&lt;Viewpoint position="' + translation.x.toFixed(5) + ' '
        + translation.y.toFixed(5) + ' ' + translation.z.toFixed(5) + '" ' +
        'orientation="' + rot[0].x.toFixed(5) + ' ' + rot[0].y.toFixed(5) + ' '
        + rot[0].z.toFixed(5) + ' ' + rot[1].toFixed(5) + '" \n\t' +
        'zNear="' + viewpoint.getNear().toFixed(5) + '" ' +
        'zFar="' + viewpoint.getFar().toFixed(5) + '" ' +
        'centerOfRotation="' + center.x.toFixed(5) + ' ' + center.y.toFixed(5) +  ' ' + center.z.toFixed(5) + '" ' +
        'fieldOfView="' + viewpoint.getFieldOfView().toFixed(5) + '" ' +
        'description="' + viewpoint._vf.description + '"&gt;' +
        '&lt;/Viewpoint&gt;');
}