
# PreformedPanel


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`adjudicators` | [DebateAdjudicator](DebateAdjudicator.md)
`importance` | [PreformedPanelImportanceEnum](PreformedPanelImportanceEnum.md)
`bracketMin` | number
`bracketMax` | number
`roomRank` | number
`liveness` | number

## Example

```typescript
import type { PreformedPanel } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "adjudicators": null,
  "importance": null,
  "bracketMin": null,
  "bracketMax": null,
  "roomRank": null,
  "liveness": null,
} satisfies PreformedPanel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PreformedPanel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


