
setKeyPoint = (x3dom, runtime, timestamp, vpPos, vpOrient) => {
    let viewpoint = runtime.viewpoint();
    let mat_view = runtime.viewMatrix().inverse();
    let rotation = new x3dom.fields.Quaternion(0, 0, 1, 0);
    rotation.setValue(mat_view);
    let vpRot = rotation;//.toAxisAngle();
    let vpTrans = mat_view.e3();
    let vpCenter = viewpoint.getCenterOfRotation();
    // console.log(mat_view);

    let vpPosVec = new x3dom.fields.SFVec3f(parseFloat(vpPos[0]),
        parseFloat(vpPos[1]), parseFloat(vpPos[2]));
    let vpOrientVec = new x3dom.fields.Quaternion(parseFloat(vpOrient[0]),
        parseFloat(vpOrient[1]), parseFloat(vpOrient[2]), parseFloat(vpOrient[3]));
    let vpOrientVecInv = vpOrientVec.inverse();
    let vpTrans1 = vpTrans.subtract(vpPosVec);
    let vpRot1 = vpRot.multiply(vpOrientVecInv);


    // TODO: duplicate timestamp, add/delete record to/from table
    routeArr.push({"timestamp": timestamp, "trans": vpTrans1, "rot": vpRot1});
    console.log(vpTrans1, vpRot1, vpCenter);

};

finishSetRoute = (duration, trans, rot, routeArr) => {
    console.log(duration.value, routeArr);
    let routeKey = "";
    let routeKeyValueTrans = "";
    let routeKeyValueRot = "";
    // TODO: timestamp > 1
    routeArr.sort(function(a, b) {
        return a["timestamp"] - b["timestamp"];
    });
    for(let step in routeArr) {
        let tm = routeArr[step]["timestamp"];
        let tr = routeArr[step]["trans"];
        let ro = routeArr[step]["rot"];
        routeKey += "  "+tm;
        routeKeyValueTrans += "  "+tr.x+" "+tr.y+" "+tr.z;
        routeKeyValueRot += "  "+ro.x+" "+ro.y+" "+ro.z+" "+ro.w;
        console.log(step, routeKey, routeKeyValueTrans, routeKeyValueRot);
    }

    console.log(routeKey, routeKeyValueTrans, routeKeyValueRot);
    time.setAttribute("cycleInterval", duration.value);
    trans.setAttribute("key", routeKey);
    trans.setAttribute("keyValue", routeKeyValueTrans);
    rot.setAttribute("keyValue", routeKeyValueRot);

    routeArr = [];
};
