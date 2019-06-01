function simplify_resource(resdata) {
    let resource = {};
    resource.props = {};
    for (const prop in resdata) {
        switch (prop) {
            case '@id': resource.iri = resdata[prop]; break;
            case '@type': resource.type = resdata[prop]; break;
            case 'knora-api:attachedToProject': break;
            case 'knora-api:attachedToUser': break;
            case 'knora-api:hasPermissions': break;
            case 'knora-api:creationDate': break;
            case 'knora-api:versionArkUrl': break;
            case 'knora-api:arkUrl': resource.ark = resdata[prop]['@value']; break;
            case 'rdfs:label': resource.label = resdata[prop]; break;
            default: resource.props[prop] = simplify_property(resdata[prop]);
        }
    }


    return resource;
}

function simplify_property(propdata) {
    let property = {};
    for (const propfield in propdata) {
        switch(propfield) {
            case '@id': property.id = propdata[propfield]; break;
            case '@type': property.type = propdata[propfield]; break;
            case 'knora-api:attachedToUser': break;
            case 'knora-api:hasPermissions': break;
            case 'knora-api:valueAsString': property.strval = propdata[propfield]; break;
            case 'knora-api:listValueAsListNodeLabel': property.strval = propdata[propfield]; break;
            case 'knora-api:attachedToUser': break;
            case 'knora-api:valueCreationDate': break;
            default: ;
        }
    }
    return property;
}

function simplify(data) {
    let resources = [];
    for (const res of data['@graph']) {
        resources.push(simplify_resource(res));
    }
    return resources;
}
