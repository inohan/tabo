
# DebateTeam


## Properties

Name | Type
------------ | -------------
`team` | string
`side` | [DebateTeamSide](DebateTeamSide.md)
`flags` | [Array&lt;FlagsEnum&gt;](FlagsEnum.md)

## Example

```typescript
import type { DebateTeam } from ''

// TODO: Update the object below with actual values
const example = {
  "team": null,
  "side": null,
  "flags": null,
} satisfies DebateTeam

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DebateTeam
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


