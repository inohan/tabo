
# TeamResult


## Properties

Name | Type
------------ | -------------
`side` | [DebateTeamSide](DebateTeamSide.md)
`points` | number
`win` | boolean
`score` | number
`team` | string
`speeches` | [Array&lt;Speech&gt;](Speech.md)

## Example

```typescript
import type { TeamResult } from ''

// TODO: Update the object below with actual values
const example = {
  "side": null,
  "points": null,
  "win": null,
  "score": null,
  "team": null,
  "speeches": null,
} satisfies TeamResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TeamResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


