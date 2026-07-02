
# ScoreCriterion


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`name` | string
`seq` | number
`weight` | number
`minScore` | number
`maxScore` | number
`step` | number
`required` | boolean

## Example

```typescript
import type { ScoreCriterion } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "name": null,
  "seq": null,
  "weight": null,
  "minScore": null,
  "maxScore": null,
  "step": null,
  "required": null,
} satisfies ScoreCriterion

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreCriterion
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


