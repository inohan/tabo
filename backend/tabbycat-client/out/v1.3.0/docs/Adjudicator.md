
# Adjudicator


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`name` | string
`institution` | string
`institutionConflicts` | Array&lt;string&gt;
`teamConflicts` | Array&lt;string&gt;
`adjudicatorConflicts` | Array&lt;string&gt;
`venueConstraints` | [Array&lt;VenueConstraint&gt;](VenueConstraint.md)
`links` | [AdjudicatorLinks](AdjudicatorLinks.md)
`barcode` | string
`answers` | [Array&lt;Answer&gt;](Answer.md)
`lastName` | string
`email` | string
`phone` | string
`anonymous` | boolean
`codeName` | string
`urlKey` | string
`gender` | string
`pronoun` | string
`baseScore` | number
`trainee` | boolean
`breaking` | boolean
`independent` | boolean
`adjCore` | boolean

## Example

```typescript
import type { Adjudicator } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "name": null,
  "institution": null,
  "institutionConflicts": null,
  "teamConflicts": null,
  "adjudicatorConflicts": null,
  "venueConstraints": null,
  "links": null,
  "barcode": null,
  "answers": null,
  "lastName": null,
  "email": null,
  "phone": null,
  "anonymous": null,
  "codeName": null,
  "urlKey": null,
  "gender": null,
  "pronoun": null,
  "baseScore": null,
  "trainee": null,
  "breaking": null,
  "independent": null,
  "adjCore": null,
} satisfies Adjudicator

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Adjudicator
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


