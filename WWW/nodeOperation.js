function addLine(start, end)
{
    // <LineSet vertexCount='19' containerField='geometry'>
    // <Coordinate DEF='TurnPoints' point='0.0 -7.0 -1.0 -1.75 -7.0 -0.5 -4.0 -7.0 0.5 -5.0 -6.5 1.5 -5.5 -6.25 0.75 -5.25 -5.5 -2.25 -4.25 -5.0 -3.25 -2.75 -4.5 -3.75 -1.5 -4.5 -4.0 -0.5 -4.25 -4.5 1.5 -3.75 -4.75 3.0 -3.75 -4.5 5.75 -4.5 -4.5 8.75 -4.5 -4.0 9.25 -4.5 -2.25 7.5 -5.5 0.0 4.0 -6.5 -0.25 2.25 -7.0 -0.25 0.0 -7.0 -1.0'/>
    // </LineSet>
    x1 = start.x;
    y1 = start.y;
    z1 = start.z;

    x2 = end.x;
    y2 = end.y;
    z2 = end.z;

    var t = document.createElement('Transform');
    t.setAttribute("translation", x + " " + y + " " + z );
    t.setAttribute("scale", s0 + " " + s1 + " " + s2 );
    var s = document.createElement('Shape');

    // Appearance Node
    var app = document.createElement('Appearance');

    // Material Node
    var mat = document.createElement('Material');

    app.appendChild(mat);

    s.appendChild(app);

    t.appendChild(s);
    var b = document.createElement('Box');
    s.appendChild(b);

    var ot = document.getElementById('root');
    ot.appendChild(t);

    return false;
};

function removeNode()
{
    var ot = document.getElementById('root');
    for (var i = 0; i < ot.childNodes.length; i++) {
        // check if we have a real X3DOM Node; not just e.g. a Text-tag
        if (ot.childNodes[i].nodeType === Node.ELEMENT_NODE) {
            ot.removeChild(ot.childNodes[i]);
            break;
        }
    }

    return false;
};