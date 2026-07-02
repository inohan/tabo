
# Institution


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`region` | string
`venueConstraints` | [Array&lt;VenueConstraint&gt;](VenueConstraint.md)
`name` | string
`code` | string

## Example

```typescript
import type { Institution } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "region": null,
  "venueConstraints": null,
  "name": null,
  "code": null,
} satisfies Institution

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Institution
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


