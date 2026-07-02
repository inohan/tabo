
# Tournament


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`currentRounds` | Array&lt;string&gt;
`links` | [TournamentLinks](TournamentLinks.md)
`name` | string
`shortName` | string
`seq` | number
`slug` | string
`active` | boolean

## Example

```typescript
import type { Tournament } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "currentRounds": null,
  "links": null,
  "name": null,
  "shortName": null,
  "seq": null,
  "slug": null,
  "active": null,
} satisfies Tournament

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Tournament
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


