
// point properties parameter setting
$(function() {
    $( "#sliderMin" ).slider({
        min: 0.0, max: 10.0, step: 1.0, value: 1.0,
        slide: function( event, ui ) {
            changeShaderParamValue('minPointField', ui.value);
        }
    });
});

$(function() {
    $( "#sliderMax" ).slider({
        min: 0.0, max: 50.0, step: 1.0, value: 10.0,
        slide: function( event, ui ) {
            changeShaderParamValue('maxPointField', ui.value);
        }
    });
});
$(function() {
    $( "#sliderScale" ).slider({
        min: 0.0, max: 50.0, step: 1.0, value: 10.0,
        slide: function( event, ui ) {
            changeShaderParamValue('scaleField', ui.value);
        }
    });
});
//// Attenuation Parameters
$(function() {
    $( "#sliderAttA" ).slider({
        min: 0.0, max: 10.0, step: 0.01, value: 1.0,
        slide: function( event, ui ) {
            let att = document.getElementById('attField').getAttribute('value').match(/\d+(?:\.\d+)?/g).map(Number);
            changeShaderParamValue('attField', [ui.value, att[1], att[2]]);
        }
    });
});
$(function() {
    $( "#sliderAttB" ).slider({
        min: 0.0, max: 10.0, step: 0.01, value: 0.0,
        slide: function( event, ui ) {
            const att = document.getElementById('attField').getAttribute('value').match(/\d+(?:\.\d+)?/g).map(Number);
            changeShaderParamValue('attField', [att[0], ui.value, att[2]]);
        }
    });
});
$(function() {
    $( "#sliderAttC" ).slider({
        min: 0.0, max: 10.0, step: 0.01, value: 0.0,
        slide: function( event, ui ) {
            const att = document.getElementById('attField').getAttribute('value').match(/\d+(?:\.\d+)?/g).map(Number);
            changeShaderParamValue('attField', [att[0], att[1], ui.value]);
        }
    });
});

function setParamValues(scale, minPoint, maxPoint, a, b, c) {
    document.getElementById( "sliderMax" ).setAttribute('value', maxPoint);
    document.getElementById( "sliderMin" ).setAttribute('value', minPoint);
    document.getElementById( "sliderScale" ).setAttribute('value', scale);
    document.getElementById( "sliderAttA" ).setAttribute('value', a);
    document.getElementById( "sliderAttB" ).setAttribute('value', b);
    document.getElementById( "sliderAttC" ).setAttribute('value', c);
    changeShaderParamValue('maxPointField', maxPoint);
    changeShaderParamValue('minPointField', minPoint);
    changeShaderParamValue('scaleField', scale);
    changeShaderParamValue('attField', [a, b, c]);
}

function getParamValues() {
    const maxPoint = document.getElementById('maxPointField').getAttribute('value');
    const minPoint = document.getElementById('minPointField').getAttribute('value');
    const scale = document.getElementById('scaleField').getAttribute('value');
    const att = document.getElementById('attField').getAttribute('value').match(/\d+(?:\.\d+)?/g).map(Number);
    const a = att[0], b=att[1], c=att[2];
    return maxPoint, minPoint, scale, a, b, c
}

function changeLabel(fieldElementName, value)
{
    const labelElement = document.getElementById(fieldElementName + "Label");

    if (labelElement)
    {
        labelElement.innerHTML = value;
    }
}

function changeShaderParamValue(fieldElementName, value)
{
    const fieldDOMElement = document.getElementById(fieldElementName);

    if (fieldDOMElement)
    {
        if (fieldElementName == 'attField') {
            fieldDOMElement.setAttribute("value", value.toString());
            ['attAField', 'attBField', 'attCField'].forEach(function (v, i) {
                changeLabel(v, value[i])
            })
        } else {
            fieldDOMElement.setAttribute("value", parseFloat(value));
            changeLabel(fieldElementName, value);
        }
    }
}
