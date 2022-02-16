
function deerClick1(e){
    //e is now the x3dom pick event object
    //this is the element with the listener, only for nonuse wrapper

    var line = e.viewarea.calcViewRay(e.layerX, e.layerY);
    var doesIntersectBox = this._x3domNode.doIntersect(line);

    if (!doesIntersectBox) { return; }  // early return

    //line.enter is distance to this bbox
    //if line.enter is larger than clicked distance then something closer was clicked

    var vp_pos = rt.viewMatrix().inverse().e3(); //maybe there is an easier way.
    var hit_pos = new x3dom.fields.SFVec3f(e.worldX, e.worldY, e.worldZ);

    if (line.enter > vp_pos.subtract(hit_pos).length()) {return ;}

    //still possible that other USE object wrapper was clicked that is closer

    //find all parents of all USE nodes with same name
    //not sure how

    // good enough

    //but lets go through all drawables with same shape
    var hitDEFShape = e.target._x3domNode;
    var candidateDrawables = e.viewarea._scene.drawableCollection.collection.filter(
        function(drawable) { return drawable.shape == hitDEFShape; });
    //and check distances
    //if there is one closer than line.enter, this is the one clicked, so ignore
    var candidateLine = new x3dom.fields.Ray(line.pos, line.dir);//e.viewarea.calcViewRay(e.layerX, e.layerY);
    if (candidateDrawables.some(function(drawable) {
        drawable.localVolume.transform(drawable.transform);
        var isect = candidateLine.intersect(drawable.localVolume.min, drawable.localVolume.max);
        if (!isect) {return false;} // nothing intersects, something not working
        return (candidateLine.enter < line.enter);
    })) { return ; } // some shape bbox was closer

    var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    $("#click-output").text("The event for the deer (id=" + this.id + ") fired at " + myDate);
    var selected = $(e);
    console.log("deer clicked - "+this._x3domNode._DEF);
}