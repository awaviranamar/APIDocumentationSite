/**
 * Formatter function to clean and update a JSON string.
 * Author: Aviran Amar
 * Date: May 21, 2025
 * You can reach out to me for mor info to: amaraviran91@gmail.com I have no probalme to help in this matter :)
 */
function formatter(str) {
  let newStr = str;
  // Proceed only if the string is not null or empty 
  // Do Not Change the Order of the commands here is very importent!!!!
  if (newStr != null && newStr !== "") {
	newStr = AddingResponseToGetIfItHavePost(newStr) ; 
    newStr = removeDeprecatedFromJsonString(newStr);
    newStr = updateNullableInJsonString(newStr);
  }
  return newStr;
}

/**
 * Removes deprecated fields from a JSON string.
 * Skips any object that has a `deprecated: true` flag.
 */
function removeDeprecatedFromJsonString(jsonStr) {
  let obj;

  try {
    obj = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Invalid JSON string:", e);
    return null;
  }

  function clean(obj) {
    if (Array.isArray(obj)) {
      return obj.map(clean);
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj = {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          // Skip deprecated objects
          if (typeof value === 'object' && value !== null && value.deprecated === true) {
            continue;
          }

          newObj[key] = clean(value);
        }
      }

      return newObj;
    }

    return obj;
  }

  const cleanedObj = clean(obj);
  return JSON.stringify(cleanedObj, null, 2); // Pretty-print the result
}

/**
 * Updates nullable fields in a JSON string.
 * If a property is listed in `required` and marked as `nullable: true`, it sets `nullable` to false.
 * Also handles merging of `allOf` schemas.
 */
function updateNullableInJsonString(jsonStr) {
  let obj;

  try {
    obj = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Invalid JSON string:", e);
    return null;
  }

  function mergeAllOf(allOfArray) {
    return allOfArray.reduce((acc, schema) => {
      const updated = update(schema); // recursively update each schema
      return {
        ...acc,
        ...updated,
        properties: {
          ...(acc.properties || {}),
          ...(updated.properties || {})
        },
        required: [...new Set([...(acc.required || []), ...(updated.required || [])])]
      };
    }, {});
  }

  function update(obj) {
    if (Array.isArray(obj)) {
      return obj.map(update);
    } else if (typeof obj === 'object' && obj !== null) {
      // Handle allOf by merging schemas
      if (obj.allOf && Array.isArray(obj.allOf)) {
        const merged = mergeAllOf(obj.allOf);
        const rest = { ...obj };
        delete rest.allOf;
        return update({ ...merged, ...rest });
      }

      const newObj = {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = update(obj[key]);
        }
      }

      // Fix nullable fields if required is true
      if (Array.isArray(newObj.required) && newObj.properties) {
        for (const reqKey of newObj.required) {
          if (
            newObj.properties[reqKey] &&
            newObj.properties[reqKey].nullable === true
          ) {
            newObj.properties[reqKey].nullable = false;
          }
        }
      }
	    if (newObj.required === true && newObj.schema && newObj.schema.nullable === true) {
        newObj.schema.nullable = false;
      }

      if (newObj.required === true && newObj.nullable === true) {
			 
        newObj.nullable = false;
		   
		 
      }

      return newObj;
    }

    return obj;
  }

  const updatedObj = update(obj);
  return JSON.stringify(updatedObj, null, 2); // Pretty-print the result
}

/**
 * Updates nullable fields in a JSON string.
 * Fixing GET requests and adding the expected body as response
**/

function AddingResponseToGetIfItHavePost(text) {
  const spec = JSON.parse(text);
  
  Object.keys(spec.paths).forEach(path => {
    const pathObj = spec.paths[path];
    
    if (pathObj.get) {
     
      const postBody = pathObj.post?.requestBody;
      const putBody = pathObj.put?.requestBody;
      const sourceBody = postBody || putBody;
      
      if (sourceBody) {
        
        if (!pathObj.get.responses) pathObj.get.responses = {};
        pathObj.get.responses['200'] = {
          description: "Success",
          content: sourceBody.content
        };
      } else if (pathObj.post) {
        // Check for schema with SaveBodyOf reference
        const postSchema = pathObj.post.requestBody?.content?.['application/json']?.schema;
        if (postSchema?.$ref && postSchema.$ref.includes('SaveBodyOf')) {
          const newRef = postSchema.$ref.replace('SaveBodyOf', '');
          
          if (!pathObj.get.responses) pathObj.get.responses = {};
          pathObj.get.responses['200'] = {
            description: "Success",
            content: {
              'application/json': {
                schema: {
                  $ref: newRef
                }
              }
            }
          };
        }
      }
    }
  });
  
  return JSON.stringify(spec);
}


