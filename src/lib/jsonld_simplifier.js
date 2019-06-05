export function simplify_resource(resdata) {
  let resource = {};
  resource.props = {};
  for (const prop in resdata) {
    switch (prop) {
      case '@id':
        resource.iri = resdata[prop];
        break;
      case '@type':
        resource.type = resdata[prop];
        break;
      case 'knora-api:attachedToProject':
        break; // ignore
      case 'knora-api:attachedToUser':
        break; // ignore
      case 'knora-api:hasPermissions':
        break; // ignore
      case 'knora-api:creationDate':
        break; //ignore
      case 'knora-api:versionArkUrl':
        break; // ignore
      case '@context':
        break; // ignore
      case 'knora-api:arkUrl':
        resource.ark = resdata[prop]['@value'];
        break;
      case 'knora-api:hasIncomingLinkValue': {
        resource.incoming = simplify_resource(resdata[prop]['knora-api:linkValueHasSource']);
        break;
      }
      case 'rdfs:label':
        resource.label = resdata[prop];
        break;
      default: {
        if (resdata[prop] instanceof Array) { // we have a cardinality > 1
          resource.props[prop] = [];
          for (const tmpdata in resdata[prop]) {
            if (tmpdata['@type'] == 'knora-api:LinkValue') {
              if (tmpdata.hasOwnProperty('knora-api:linkValueHasSource')) {
                resource.props[prop].push(simplify_resource(tmpdata['knora-api:linkValueHasSource']));
              }
              else if (tmpdata.hasOwnProperty('knora-api:linkValueHasTarget')) {
                resource.props[prop].push(simplify_resource(tmpdata['knora-api:linkValueHasTarget']));
              } else if (tmpdata.hasOwnProperty('knora-api:linkValueHasTargetIri')) {
                resource.props[prop].push(tmpdata['knora-api:linkValueHasTargetIri']['@id']);
              }
              else {
                console.log("==->BIG BIG ERROR!!");
              }
            }
            else {
              resource.props[prop].push(simplify_property(tmpdata))
            }
          }
        }
        else {
          if (resdata[prop]['@type'] == 'knora-api:LinkValue') {
            if (resdata[prop].hasOwnProperty('knora-api:linkValueHasSource')) {
              resource.props[prop] = [simplify_resource(resdata[prop]['knora-api:linkValueHasSource'])];
            }
            else if (resdata[prop].hasOwnProperty('knora-api:linkValueHasTarget')) {
              resource.props[prop] = [simplify_resource(resdata[prop]['knora-api:linkValueHasTarget'])];
            } else if (resdata[prop].hasOwnProperty('knora-api:linkValueHasTargetIri')) {
              resource.props[prop] = [resdata[prop]['knora-api:linkValueHasTargetIri']['@id']];
            }
            else {
              console.log("==->BIG BIG ERROR!!");
            }
          }
          else {
            resource.props[prop] = [simplify_property(resdata[prop])];
          }
        }
      }
    }
  }

  return resource;
}

export function simplify_property(propdata) {
  let property = {};
  for (const propfield in propdata) {
    switch(propfield) {
      case '@id': property.id = propdata[propfield]; break;
      case '@type': property.type = propdata[propfield]; break;
      case 'knora-api:attachedToUser': break;
      case 'knora-api:hasPermissions': break;
      case 'knora-api:valueAsString': property.strval = propdata[propfield]; break;
      case 'knora-api:listValueAsListNodeLabel': property.strval = propdata[propfield]; break;
      case 'knora-api:linkValueHasSource': {
        if (propdata[propfield] instanceof Array) {
          resource.incoming = [];
          for (const tmpdata in propdata[propfield]) {
            property.incoming.push(simplify_resource(tmpdata))
          }
        }
        else {
          property.incoming = [simplify_resource(propdata[propfield])];
        }
      }
      case 'knora-api:valueCreationDate': break;
      default:
    }
  }
  return property;
}

export function simplify_hasIncomingLinkValue(propdata) {
  let property = {};
  for (const propfield in propdata) {
    switch(propfield) {
      case '@id':
    }
  }
}

export function simplify_data(data) {
  let resources = [];
  if (data.hasOwnProperty('@graph')) {
    for (const res of data['@graph']) {
      resources.push(simplify_resource(res));
    }
  }
  else {
    resources.push(simplify_resource(data));
  }
  return resources;
}
