
# PerTournamentInstitution


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`region` | string
`venueConstraints` | [Array&lt;VenueConstraint&gt;](VenueConstraint.md)
`teams` | Array&lt;string&gt;
`adjudicators` | Array&lt;string&gt;
`answers` | [Array&lt;Answer&gt;](Answer.md)
`coaches` | [Array&lt;Coach&gt;](Coach.md)
`teamsRequested` | number
`teamsAllocated` | number
`adjudicatorsRequested` | number
`adjudicatorsAllocated` | number
`name` | string
`code` | string

## Example

```typescript
import type { PerTournamentInstitution } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "region": null,
  "venueConstraints": null,
  "teams": null,
  "adjudicators": null,
  "answers": null,
  "coaches": null,
  "teamsRequested": null,
  "teamsAllocated": null,
  "adjudicatorsRequested": null,
  "adjudicatorsAllocated": null,
  "name": null,
  "code": null,
} satisfies PerTournamentInstitution

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PerTournamentInstitution
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


