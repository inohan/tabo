
# Team


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`institution` | string
`breakCategories` | Array&lt;string&gt;
`institutionConflicts` | Array&lt;string&gt;
`venueConstraints` | [Array&lt;VenueConstraint&gt;](VenueConstraint.md)
`answers` | [Array&lt;Answer&gt;](Answer.md)
`reference` | string
`shortReference` | string
`codeName` | string
`shortName` | string
`longName` | string
`useInstitutionPrefix` | boolean
`seed` | number
`emoji` | string
`speakers` | [Array&lt;TeamSpeaker&gt;](TeamSpeaker.md)

## Example

```typescript
import type { Team } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "institution": null,
  "breakCategories": null,
  "institutionConflicts": null,
  "venueConstraints": null,
  "answers": null,
  "reference": null,
  "shortReference": null,
  "codeName": null,
  "shortName": null,
  "longName": null,
  "useInstitutionPrefix": null,
  "seed": null,
  "emoji": null,
  "speakers": null,
} satisfies Team

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Team
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


